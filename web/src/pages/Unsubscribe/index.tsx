import { useRef, useState, type FormEvent } from "react";
import { Link } from "react-router";
import { isAxiosError } from "axios";
import { contactApi } from "../../constants/axiosClient.ts";
import Turnstile, {
    type TurnstileHandle,
} from "../../common/components/Turnstile.tsx";

type Status = "idle" | "sending" | "sent" | "failed";

export default function UnsubscribePage() {
    const [status, setStatus] = useState<Status>("idle");
    const turnstileRef = useRef<TurnstileHandle>(null);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setStatus("sending");

        try {
            const token = await turnstileRef.current?.getToken();
            await contactApi.post("/unsubscribe", null, {
                params: { contact_email: formData.get("email") },
                headers: { "cf-turnstile-token": token ?? "" },
            });
            setStatus("sent");
        } catch (error) {
            console.error(error);
            // A missing contact also 404s here; show the same message either
            // way so the page can't be used to check which emails are on the list.
            if (isAxiosError(error) && error.response?.status === 404) {
                setStatus("sent");
            } else {
                setStatus("failed");
            }
        }
    }

    return (
        <div className="shell shell-narrow py-16 text-center">
            <div className="crt bg-red px-6 py-10">
                <p className="text-d1 font-display">UNSUBSCRIBE</p>
            </div>

            {status === "sent" ? (
                <>
                    <h1 className="text-d2 mt-8">Check your inbox</h1>
                    <p className="mx-auto mt-4 max-w-prose text-sm leading-relaxed">
                        If that address is on our list, we&apos;ve sent a link to
                        confirm you want off it. Click it and you&apos;re all set.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link to="/" className="btn-arcade">
                            Go to home page
                        </Link>
                    </div>
                </>
            ) : (
                <>
                    <h1 className="text-d2 mt-8">Sorry to see you go</h1>
                    <p className="mx-auto mt-4 max-w-prose text-sm leading-relaxed">
                        Enter the email you signed up with and we&apos;ll send you a
                        link to confirm.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="mx-auto mt-6 flex max-w-sm flex-col gap-3 sm:flex-row sm:items-end"
                    >
                        <div className="flex-1 text-start">
                            <label className="label" htmlFor="unsub-email">
                                Email
                            </label>
                            <input
                                id="unsub-email"
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
                            {status === "sending" ? "Sending" : "Unsubscribe"}
                        </button>
                    </form>

                    {status === "failed" && (
                        <p role="alert" className="mt-3 text-sm text-red-bright">
                            That didn&apos;t go through. Check the address and try
                            again.
                        </p>
                    )}

                    <div className="mt-8">
                        <Link to="/" className="btn-ghost">
                            Go to home page
                        </Link>
                    </div>
                </>
            )}

            <Turnstile ref={turnstileRef} />
        </div>
    );
}
