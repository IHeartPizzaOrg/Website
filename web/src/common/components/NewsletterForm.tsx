import { useState, type FormEvent } from "react";
import { contactApi } from "../../constants/axiosClient.ts";
import HoneypotField from "./HoneypotField.tsx";
import { useHoneypot } from "../Hooks/useHoneypot.ts";

type Status = "idle" | "sending" | "joined" | "failed";

export interface NewsletterFormProps {
    /** Shown above the form. */
    heading: string;
    /** One line of context under the heading. */
    blurb: string;
    /** Tags attached to the contact record, so signups can be attributed. */
    tags?: string[];
    /** The home hero collects a name; the footer keeps it to one field. */
    showNameField?: boolean;
    align?: "center" | "start";
}

export default function NewsletterForm({
    heading,
    blurb,
    tags = [],
    showNameField = false,
    align = "center",
}: NewsletterFormProps) {
    const [status, setStatus] = useState<Status>("idle");
    const { getHeaders } = useHoneypot();

    async function handleSignUp(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setStatus("sending");

        try {
            await contactApi.post(
                "",
                {
                    name: formData.get("name") ?? "",
                    email: formData.get("email"),
                    subscribed: true,
                    shouldDelete: false,
                    tags,
                },
                { headers: getHeaders(formData) },
            );
            setStatus("joined");
        } catch (error) {
            console.error(error);
            setStatus("failed");
        }
    }

    const alignment = align === "center" ? "text-center" : "text-start";

    if (status === "joined") {
        return (
            <div className={alignment}>
                <h2 className="text-d3 text-red-bright">You&apos;re on the list</h2>
                <p className="caption mt-2">
                    Watch your inbox — pre-order news goes out there first.
                </p>
            </div>
        );
    }

    return (
        <div className={alignment}>
            <h2 className="text-d3 text-red-bright">{heading}</h2>
            <p className="mt-2 max-w-prose text-sm leading-relaxed">{blurb}</p>

            <form
                onSubmit={handleSignUp}
                className={`mt-5 flex flex-col gap-3 sm:flex-row sm:items-end ${
                    align === "center" ? "sm:justify-center" : ""
                }`}
            >
                {showNameField && (
                    <div className="text-start sm:w-40">
                        <label className="label" htmlFor="newsletter-name">
                            Name
                        </label>
                        <input
                            id="newsletter-name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            className="field"
                            placeholder="Alia"
                        />
                    </div>
                )}

                <div className="text-start sm:w-60">
                    <label className="label" htmlFor="newsletter-email">
                        Email
                    </label>
                    <input
                        id="newsletter-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="field"
                        placeholder="you@email.com"
                    />
                </div>

                <button
                    type="submit"
                    className="btn-arcade shrink-0"
                    disabled={status === "sending"}
                >
                    {status === "sending" ? "Sending" : "Join now"}
                </button>

                <HoneypotField />
            </form>

            {status === "failed" && (
                <p role="alert" className="mt-3 text-sm text-red-bright">
                    That didn&apos;t go through. Check the address and try again.
                </p>
            )}
        </div>
    );
}
