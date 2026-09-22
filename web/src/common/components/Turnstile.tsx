import { forwardRef, useEffect, useId, useImperativeHandle, useRef } from "react";

declare global {
    interface Window {
        turnstile?: {
            render: (
                container: string | HTMLElement,
                options: Record<string, unknown>,
            ) => string;
            execute: (widgetId: string) => void;
            remove: (widgetId: string) => void;
        };
    }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";

// Cloudflare's published "always passes, no interactive challenge" test
// key. Public by design, safe to commit. Used automatically in dev so
// nobody has to juggle real keys (and their domain allowlist) locally.
const DEV_SITE_KEY = "1x00000000000000000000BB";

const SITE_KEY = import.meta.env.DEV
    ? DEV_SITE_KEY
    : import.meta.env.VITE_TURNSTILE_SITE_KEY;

// How long getToken() will wait for a still-initializing widget, or for
// Cloudflare to call back after execute(), before giving up.
const READY_TIMEOUT_MS = 4000;
const EXECUTE_TIMEOUT_MS = 15000;

let scriptPromise: Promise<void> | null = null;

function loadTurnstileScript(): Promise<void> {
    if (window.turnstile) return Promise.resolve();
    if (!scriptPromise) {
        scriptPromise = new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = SCRIPT_SRC;
            script.async = true;
            script.defer = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error("Failed to load Turnstile"));
            document.head.appendChild(script);
        });
    }
    return scriptPromise;
}

function withTimeout<T>(promise: Promise<T>, ms: number, onTimeout: () => T): Promise<T> {
    return new Promise((resolve) => {
        const timer = setTimeout(() => resolve(onTimeout()), ms);
        promise.then((value) => {
            clearTimeout(timer);
            resolve(value);
        });
    });
}

export interface TurnstileHandle {
    /** Runs the invisible challenge and resolves with a one-time token. */
    getToken: () => Promise<string | null>;
}

/**
 * Invisible human-verification widget (Cloudflare Turnstile). Renders no
 * visible UI — Cloudflare only surfaces a challenge for traffic it can't
 * otherwise clear on its own.
 */
const Turnstile = forwardRef<TurnstileHandle>((_props, ref) => {
    const containerId = `turnstile-${useId().replace(/:/g, "")}`;
    const widgetId = useRef<string | null>(null);
    const pending = useRef<((token: string | null) => void) | null>(null);
    // Resolves once render() has returned a widget id, so getToken() calls
    // that race ahead of initialization can wait instead of failing silently.
    const readyPromise = useRef<Promise<void> | null>(null);

    useEffect(() => {
        let cancelled = false;
        let resolveReady: () => void;
        readyPromise.current = new Promise((resolve) => {
            resolveReady = resolve;
        });

        if (!SITE_KEY) {
            console.warn(
                "Turnstile: no site key configured, human verification is disabled.",
            );
            return;
        }

        loadTurnstileScript()
            .then(() => {
                if (cancelled || !window.turnstile) return;
                widgetId.current = window.turnstile.render(`#${containerId}`, {
                    sitekey: SITE_KEY,
                    size: "invisible",
                    execution: "execute",
                    retry: "auto",
                    callback: (token: string) => {
                        pending.current?.(token);
                        pending.current = null;
                    },
                    "error-callback": (code: string) => {
                        console.error("Turnstile error-callback fired, code:", code);
                        pending.current?.(null);
                        pending.current = null;
                    },
                    "expired-callback": () => {
                        console.warn("Turnstile token expired before it was used");
                        pending.current?.(null);
                        pending.current = null;
                    },
                });
                resolveReady();
            })
            .catch((error) => {
                console.error("Turnstile: failed to load or render widget:", error);
                resolveReady();
            });

        return () => {
            cancelled = true;
            if (widgetId.current && window.turnstile) {
                window.turnstile.remove(widgetId.current);
            }
        };
    }, [containerId]);

    useImperativeHandle(ref, () => ({
        getToken: async () => {
            if (!SITE_KEY) {
                console.warn("Turnstile getToken(): no site key configured");
                return null;
            }

            // The form may submit before render() has resolved (fast users,
            // slow networks). Give it a moment to finish instead of
            // silently sending an empty token.
            if (!widgetId.current && readyPromise.current) {
                await withTimeout(readyPromise.current, READY_TIMEOUT_MS, () => {
                    console.error(
                        "Turnstile getToken(): widget still not ready after " +
                            READY_TIMEOUT_MS +
                            "ms, submitting without a token",
                    );
                });
            }

            if (!widgetId.current || !window.turnstile) {
                console.error("Turnstile getToken(): no widget available, giving up");
                return null;
            }

            const execution = new Promise<string | null>((resolve) => {
                pending.current = resolve;
                window.turnstile!.execute(widgetId.current!);
            });

            return withTimeout(execution, EXECUTE_TIMEOUT_MS, () => {
                console.error(
                    "Turnstile getToken(): execute() never called back within " +
                        EXECUTE_TIMEOUT_MS +
                        "ms",
                );
                pending.current = null;
                return null;
            });
        },
    }));

    return <div id={containerId} />;
});

Turnstile.displayName = "Turnstile";

export default Turnstile;
