import { forwardRef, useEffect, useId, useImperativeHandle, useRef } from "react";

declare global {
    interface Window {
        turnstile?: {
            render: (
                container: string | HTMLElement,
                options: Record<string, unknown>,
            ) => string;
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

// How long getToken() will wait for the widget to hand back a token before
// giving up (covers both slow init and a slow managed-mode check).
const TOKEN_TIMEOUT_MS = 15000;

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

function createDeferred<T>() {
    let resolve!: (value: T) => void;
    const promise = new Promise<T>((res) => {
        resolve = res;
    });
    return { promise, resolve };
}

export interface TurnstileHandle {
    /** Resolves with the widget's current token, waiting for one if needed. */
    getToken: () => Promise<string | null>;
}

/**
 * Human-verification widget (Cloudflare Turnstile), running in Managed
 * mode: it renders and solves itself automatically, silently, for the vast
 * majority of visitors. Cloudflare only falls back to a visible checkbox
 * for traffic its risk engine can't otherwise clear — unlike Invisible
 * mode, which has no such fallback and fails outright on any uncertainty.
 */
const Turnstile = forwardRef<TurnstileHandle>((_props, ref) => {
    const containerId = `turnstile-${useId().replace(/:/g, "")}`;
    const widgetId = useRef<string | null>(null);
    const tokenRef = useRef<string | null>(null);
    const deferredRef = useRef(createDeferred<string | null>());

    useEffect(() => {
        let cancelled = false;

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
                    size: "flexible",
                    appearance: "interaction-only",
                    retry: "auto",
                    callback: (token: string) => {
                        tokenRef.current = token;
                        deferredRef.current.resolve(token);
                    },
                    "error-callback": (code: string) => {
                        console.error("Turnstile error-callback fired, code:", code);
                        tokenRef.current = null;
                        deferredRef.current.resolve(null);
                    },
                    "expired-callback": () => {
                        console.warn("Turnstile token expired; widget will retry");
                        tokenRef.current = null;
                        deferredRef.current = createDeferred();
                    },
                });
            })
            .catch((error) => {
                console.error("Turnstile: failed to load or render widget:", error);
                deferredRef.current.resolve(null);
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

            if (tokenRef.current) return tokenRef.current;

            return withTimeout(deferredRef.current.promise, TOKEN_TIMEOUT_MS, () => {
                console.error(
                    `Turnstile getToken(): no token available after ${TOKEN_TIMEOUT_MS}ms`,
                );
                return null;
            });
        },
    }));

    return <div id={containerId} />;
});

Turnstile.displayName = "Turnstile";

export default Turnstile;
