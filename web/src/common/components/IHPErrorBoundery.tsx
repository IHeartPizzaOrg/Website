import {
    useRouteError,
    isRouteErrorResponse, Link, Outlet,
} from 'react-router'
import {useEffect} from "react";
import Layout from "../layouts/Layout.tsx";
import NavBar from "./NavBar.tsx";
import Footer from "./Footer.tsx";

// 1. Comprehensive error boundary
export function ErrorBoundary() {
    const error = useRouteError()

    // Log error to service
    useEffect(() => {
        console.error("Error boundary caught:", error)
        // logErrorToService(error)
    }, [error])

    // Route error response (thrown Response)
    if (isRouteErrorResponse(error)) {
        switch (error.status) {
            case 404:
                return (
                    <div className="error-page">
                        <h1>404 - Page Not Found</h1>
                        <p>The page you're looking for doesn't exist.</p>
                        <Link to="/">Go Home</Link>
                    </div>
                )

            case 401:
                return (
                    <div className="error-page">
                        <h1>Unauthorized</h1>
                        <p>You need to log in to access this page.</p>
                        <Link to="/">Go Home</Link>
                    </div>
                )

            case 503:
                return (
                    <div className="error-page">
                        <h1>Service Unavailable</h1>
                        <p>We're experiencing technical difficulties. Please try again later.</p>
                        <button onClick={() => window.location.reload()}>
                            Retry
                        </button>
                    </div>
                )

            default:
                return (
                    <div className="error-page">
                        <h1>{error.status} - {error.statusText}</h1>
                        <p>{error.data}</p>
                    </div>
                )
        }
    }

    // JavaScript Error
    if (error instanceof Error) {
        return (
            <div className="error-page">
                <h1>Application Error</h1>
                <details>
                    <summary>Error Details</summary>
                    <pre>{error.stack}</pre>
                </details>
                <button onClick={() => window.location.href = "/"}>
                    Return Home
                </button>
            </div>
        )
    }

    // Unknown error
    return (
        <div className="error-page">
            <h1>Something went wrong</h1>
            <p>An unexpected error occurred.</p>
            <Link to="/">Go Home</Link>
        </div>
    )
}

export default function  IHPErrorBoundery (){



    return (
        <div className="min-h-screen bg-black text-white flex flex-col justify-center text-center">

            <NavBar/>
            <main className=" flex flex-col ">
                <div className="">
                    <img
                        src="/media/values/a_moment.jpg"
                        alt="Contact us"
                        className="w-190 h-80 object-cover rounded-lg mx-auto"
                    />
                </div>
               <ErrorBoundary/>

            </main>

            <Footer/>
        </div>
    )
}
