import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { contactApi } from "../../constants/axiosClient.ts";

type Status = "confirming" | "confirmed" | "failed";

export default function UnsubscribeConfirmPage() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [status, setStatus] = useState<Status>(token ? "confirming" : "failed");
    const ran = useRef(false);

    useEffect(() => {
        if (!token || ran.current) return;
        ran.current = true;

        contactApi
            .delete("/delete", { params: { token } })
            .then(() => setStatus("confirmed"))
            .catch((error) => {
                console.error(error);
                setStatus("failed");
            });
    }, [token]);

    const code =
        status === "confirmed" ? "ALL DONE" : status === "failed" ? "OOPS" : "ONE SEC";

    return (
        <div className="shell shell-narrow py-16 text-center">
            <div className="crt bg-red px-6 py-10">
                <p className="text-d1 font-display">{code}</p>
            </div>

            {status === "confirming" && (
                <>
                    <h1 className="text-d2 mt-8">Confirming&hellip;</h1>
                    <p className="mx-auto mt-4 max-w-prose text-sm leading-relaxed">
                        Hang tight while we take you off the list.
                    </p>
                </>
            )}

            {status === "confirmed" && (
                <>
                    <h1 className="text-d2 mt-8">You&apos;re unsubscribed</h1>
                    <p className="mx-auto mt-4 max-w-prose text-sm leading-relaxed">
                        You won&apos;t hear from our newsletter again. Wishing you all
                        the best!
                    </p>
                </>
            )}

            {status === "failed" && (
                <>
                    <h1 className="text-d2 mt-8">That link didn&apos;t work</h1>
                    <p className="mx-auto mt-4 max-w-prose text-sm leading-relaxed">
                        It may have expired or already been used. Head back and
                        request a fresh unsubscribe link.
                    </p>
                </>
            )}

            <div className="mt-8 flex flex-wrap justify-center gap-4">
                {status === "failed" && (
                    <Link to="/unsubscribe" className="btn-arcade">
                        Try again
                    </Link>
                )}
                <Link
                    to="/"
                    className={status === "failed" ? "btn-ghost" : "btn-arcade"}
                >
                    Go to home page
                </Link>
            </div>
        </div>
    );
}
