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

    useEffect(() => {
        let cancelled = false;

        if (!SITE_KEY) {
            console.warn(
                "VITE_TURNSTILE_SITE_KEY is not set; human verification is disabled.",
            );
            return;
        }

        loadTurnstileScript().then(() => {
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
                "error-callback": () => {
                    pending.current?.(null);
                    pending.current = null;
                },
                "expired-callback": () => {
                    pending.current?.(null);
                    pending.current = null;
                },
            });
        });

        return () => {
            cancelled = true;
            if (widgetId.current && window.turnstile) {
                window.turnstile.remove(widgetId.current);
            }
        };
    }, [containerId]);

    useImperativeHandle(ref, () => ({
        getToken: () =>
            new Promise<string | null>((resolve) => {
                if (!SITE_KEY || !widgetId.current || !window.turnstile) {
                    resolve(null);
                    return;
                }
                pending.current = resolve;
                window.turnstile.execute(widgetId.current);
            }),
    }));

    return <div id={containerId} />;
});

Turnstile.displayName = "Turnstile";

export default Turnstile;
