import { useCallback, useEffect, useRef, useState } from "react";

/** Long enough that a fast API doesn't flash the screen and look broken. */
const FLOOR_MS = 1200;
/** Nobody waits behind a hung request. */
const CEILING_MS = 6000;
/** Lets the bar visibly reach 100 before the screen clears. */
const SETTLE_MS = 320;

const SESSION_KEY = "ihp:booted";

/** sessionStorage throws outright in some privacy modes, so never assume it. */
function hasBooted(): boolean {
    try {
        return sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
        return false;
    }
}

function markBooted(): void {
    try {
        sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
        // Boot screen just shows again next load. Not worth failing over.
    }
}

/**
 * Drives the boot screen from the real games fetch.
 *
 * The bar tracks load *state*, not bytes: it climbs toward 90% while the
 * request is in flight and completes when it resolves. A single small JSON
 * call has no meaningful byte progress to report.
 */
export default function useBootSequence(loading: boolean) {
    // Decided once on mount so a re-render mid-boot can't flip it.
    const [visible, setVisible] = useState(() => !hasBooted());
    const [percent, setPercent] = useState(0);
    const [complete, setComplete] = useState(false);
    const startedAt = useRef(0);

    // Stamped in an effect rather than during render: Date.now() is impure,
    // and this effect runs before the ones that read it.
    useEffect(() => {
        startedAt.current = Date.now();
    }, []);

    const finish = useCallback(() => {
        setComplete(true);
        setPercent(100);
    }, []);

    // Climb toward 90%. The last 10% belongs to the fetch actually resolving,
    // so the bar never claims to be done early.
    useEffect(() => {
        if (!visible || complete) return;

        const id = setInterval(() => {
            setPercent((current) =>
                Math.min(90, current + Math.max(0.8, (90 - current) * 0.12)),
            );
        }, 90);

        return () => clearInterval(id);
    }, [visible, complete]);

    // Real completion, held back to the floor.
    useEffect(() => {
        if (!visible || loading || complete) return;

        const elapsed = Date.now() - startedAt.current;
        const id = setTimeout(finish, Math.max(0, FLOOR_MS - elapsed));

        return () => clearTimeout(id);
    }, [visible, loading, complete, finish]);

    // Ceiling.
    useEffect(() => {
        if (!visible) return;

        const id = setTimeout(finish, CEILING_MS);
        return () => clearTimeout(id);
    }, [visible, finish]);

    // Press any key to skip. Safe: every page handles its own loading state,
    // so there is nothing behind this that breaks if it clears early.
    useEffect(() => {
        if (!visible || complete) return;

        window.addEventListener("keydown", finish);
        window.addEventListener("pointerdown", finish);

        return () => {
            window.removeEventListener("keydown", finish);
            window.removeEventListener("pointerdown", finish);
        };
    }, [visible, complete, finish]);

    useEffect(() => {
        if (!complete) return;

        const id = setTimeout(() => {
            markBooted();
            setVisible(false);
        }, SETTLE_MS);

        return () => clearTimeout(id);
    }, [complete]);

    return { visible, percent: Math.min(100, Math.round(percent)) };
}
