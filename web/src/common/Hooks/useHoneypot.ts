import { useState } from "react";
import { HONEYPOT_FIELD_NAME } from "../components/HoneypotField.tsx";

/**
 * Pairs with <HoneypotField/>: tracks how long the form has been on screen
 * and reads the honeypot value at submit time, both sent as headers so the
 * backend can reject bots without either check touching the real payload.
 */
export function useHoneypot() {
    const [startedAt] = useState(() => Date.now());

    function getHeaders(formData: FormData) {
        return {
            "x-hp-field": (formData.get(HONEYPOT_FIELD_NAME) as string) ?? "",
            "x-form-started-at": String(startedAt),
        };
    }

    return { getHeaders };
}
