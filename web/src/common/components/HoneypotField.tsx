export const HONEYPOT_FIELD_NAME = "website";

/**
 * Invisible field real users never see or fill in. A bot that auto-fills
 * every input it finds in the DOM fills this one too, which flags the
 * submission as non-human. Kept off-screen rather than type="hidden" —
 * simple scrapers skip hidden inputs but still find this one.
 */
export default function HoneypotField() {
    return (
        <input
            type="text"
            name={HONEYPOT_FIELD_NAME}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hp-field"
        />
    );
}
