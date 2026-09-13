import { useEffect, type ReactNode } from "react";
import { isRouteErrorResponse, Link, useRouteError } from "react-router";
import NavBar from "./NavBar.tsx";
import Footer from "./Footer.tsx";

interface ErrorScreenProps {
    code: string;
    title: string;
    body: string;
    children?: ReactNode;
}

/**
 * Errors on a retro game company's site get a game-over screen. The code sits
 * in the red field the way a score does on a title card.
 */
function ErrorScreen({ code, title, body, children }: ErrorScreenProps) {
    return (
        <div className="shell shell-narrow py-16 text-center">
            <div className="crt bg-red px-6 py-10">
                <p className="text-d1 font-display">{code}</p>
            </div>

            <h1 className="text-d2 mt-8">{title}</h1>
            <p className="mx-auto mt-4 max-w-prose text-sm leading-relaxed">{body}</p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
                {children ?? (
                    <Link to="/" className="btn-arcade">
                        Continue
                    </Link>
                )}
            </div>
        </div>
    );
}

export function ErrorBoundary() {
    const error = useRouteError();

    useEffect(() => {
        console.error("Error boundary caught:", error);
    }, [error]);

    if (isRouteErrorResponse(error)) {
        switch (error.status) {
            case 404:
                return (
                    <ErrorScreen
                        code="GAME OVER"
                        title="That page doesn't exist"
                        body="The link may be out of date, or we may have moved it. Everything else is still here."
                    />
                );

            case 401:
                return (
                    <ErrorScreen
                        code="LOCKED"
                        title="You need to sign in"
                        body="This page isn't public. Head back to the front page."
                    />
                );

            case 503:
                return (
                    <ErrorScreen
                        code="PAUSED"
                        title="We're having technical trouble"
                        body="Something on our end is down. Try again in a moment."
                    >
                        <button
                            type="button"
                            className="btn-arcade"
                            onClick={() => window.location.reload()}
                        >
                            Try again
                        </button>
                        <Link to="/" className="btn-ghost">
                            Go home
                        </Link>
                    </ErrorScreen>
                );

            default:
                return (
                    <ErrorScreen
                        code={String(error.status)}
                        title={error.statusText || "Something went wrong"}
                        body={
                            typeof error.data === "string" && error.data
                                ? error.data
                                : "We hit an unexpected problem loading this page."
                        }
                    />
                );
        }
    }

    if (error instanceof Error) {
        return (
            <ErrorScreen
                code="CRASH"
                title="The page failed to load"
                body="Something broke while rendering. Reloading usually clears it."
            >
                <button
                    type="button"
                    className="btn-arcade"
                    onClick={() => window.location.reload()}
                >
                    Reload
                </button>
                <Link to="/" className="btn-ghost">
                    Go home
                </Link>
                {/* Stack traces are for us, not for visitors. */}
                {import.meta.env.DEV && (
                    <details className="panel-flat mt-6 w-full p-4 text-start">
                        <summary className="text-d5 cursor-pointer font-display">
                            Stack trace
                        </summary>
                        <pre className="mt-3 overflow-x-auto text-xs text-paper-dim">
                            {error.stack}
                        </pre>
                    </details>
                )}
            </ErrorScreen>
        );
    }

    return (
        <ErrorScreen
            code="GAME OVER"
            title="Something went wrong"
            body="An unexpected error occurred. Try again, or head back to the front page."
        />
    );
}

export default function IHPErrorBoundery() {
    return (
        <div className="flex min-h-screen flex-col bg-ink text-paper">
            <NavBar />
            <main className="flex-1">
                <ErrorBoundary />
            </main>
            <Footer />
        </div>
    );
}
