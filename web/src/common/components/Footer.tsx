import { Link } from "react-router";
import GoForIt from "../../assets/media/go_for_it.png";
import NewsletterForm from "./NewsletterForm.tsx";

const footerLinks = [
    { to: "/games", label: "Games" },
    { to: "/about", label: "About" },
    { to: "/values", label: "Values" },
    { to: "/contact", label: "Contact" },
];

const socialLinks = [
    {
        href: "https://www.youtube.com/@iheartpizzaofficial",
        label: "YouTube",
        icon: YouTubeIcon,
    },
    {
        href: "https://x.com/iheartpizzallc",
        label: "X",
        icon: XIcon,
    },
    {
        href: "https://www.instagram.com/iheartpizzallc/?hl=en",
        label: "Instagram",
        icon: InstagramIcon,
    },
    {
        href: "https://www.facebook.com/iheartpizzallc/",
        label: "Facebook",
        icon: FacebookIcon,
    },
    {
        href: "https://www.threads.com/@iheartpizzallc",
        label: "Threads",
        icon: ThreadsIcon,
    },
    {
        href: "https://bsky.app/profile/iheartpizzallc.bsky.social",
        label: "Bluesky",
        icon: BlueskyIcon,
    },
];

export default function Footer() {
    return (
        <footer id="footer" className="mt-16 border-t-[3px] border-red">
            <div className="shell py-10">
                <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-start md:gap-14">
                    <div className="screen crt w-28 shrink-0 sm:w-32">
                        <img
                            src={GoForIt}
                            alt="Go For It! title screen"
                            className="pixel-img block w-full"
                        />
                    </div>

                    <NewsletterForm
                        heading="Sign up for our newsletter"
                        blurb="Get the news first, and hear from us the moment pre-orders go live."
                        align="start"
                    />
                </div>

                <div className="mt-10 flex flex-col gap-6 border-t-2 border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <nav aria-label="Footer">
                        <ul className="flex flex-wrap gap-x-6 gap-y-3">
                            {footerLinks.map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-d5 font-display text-paper-dim hover:text-red-bright"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <nav aria-label="Social media">
                        <ul className="flex items-center gap-4">
                            {socialLinks.map(({ href, label, icon: Icon }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="group block text-paper-dim transition-colors hover:text-red-bright"
                                    >
                                        <Icon className="h-5 w-5" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>

            <div className="bg-red">
                <div className="shell flex flex-col gap-3 py-6 text-white sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-d4 font-display">I Heart Pizza LLC</p>

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
                        <p className="text-sm">Fort Wayne, Indiana. &copy; 2026</p>

                        <nav aria-label="Legal" className="flex gap-4">
                            <Link to="/legal" className="text-sm underline hover:text-ink">
                                Legal
                            </Link>
                            <Link to="/unsubscribe" className="text-sm underline hover:text-ink">
                                Unsubscribe
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function InstagramIcon({ className = "" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={className}
            aria-hidden="true"
        >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
    );
}

// function LinkedInIcon({ className = "" }: { className?: string }) {
//     return (
//         <svg
//             viewBox="0 0 24 24"
//             fill="currentColor"
//             className={className}
//             aria-hidden="true"
//         >
//             <path d="M5.2 3.5A2.2 2.2 0 1 1 5.2 7.9a2.2 2.2 0 0 1 0-4.4ZM3.3 9h3.8v11.7H3.3V9Zm6.1 0h3.6v1.6h.1c.5-.9 1.7-2 3.6-2 3.8 0 4.5 2.5 4.5 5.8v6.3h-3.8v-5.6c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9v5.7H9.4V9Z" />
//         </svg>
//     );
// }

function XIcon({ className = "" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            aria-hidden="true"
        >
            <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.4l-5-6.5L6.1 22H3l7.3-8.4L2.8 2h6.5l4.5 5.9L18.9 2Zm-1.1 17.7h1.7L8.3 4.2H6.5l11.3 15.5Z" />
        </svg>
    );
}


function YouTubeIcon({ className = "" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            aria-hidden="true"
        >
            <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.9V8.1l6.5 3.9-6.5 3.9Z" />
        </svg>
    );
}

function FacebookIcon({ className = "" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            aria-hidden="true"
        >
            <path d="M14 8h3V4.1c-.5-.1-1.8-.2-3.4-.2-3.4 0-5.7 2.1-5.7 5.9V13H4v4.3h3.9V24h4.8v-6.7h4l.6-4.3h-4.6V10c0-1.2.3-2 1.3-2Z" />
        </svg>
    );
}

function ThreadsIcon({ className = "" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            aria-hidden="true"
        >
            <path d="M12.1 2C6.1 2 2.2 5.8 2.2 12s3.9 10 9.9 10c5.8 0 9.7-3.6 9.7-9.1 0-5.5-3.4-8.8-8.7-8.8-4.6 0-7.3 2.4-7.3 6.1h3.2c.1-1.8 1.5-3.1 4-3.1 2.7 0 4.5 1.5 4.9 4.1-1-.4-2.2-.6-3.6-.6-3.7 0-6 1.8-6 4.6 0 2.5 2.1 4.2 5 4.2 3.2 0 5.2-1.9 5.5-5.2 1.1.6 1.7 1.5 1.7 2.8 0 3.5-2.5 5.8-6.4 5.8-4.5 0-7.1-2.8-7.1-7.7 0-4.8 2.7-7.6 7.2-7.6 3.4 0 5.5 1.5 6.2 4.3h-3.1c-.6-1.5-1.8-2.2-3.5-2.2-2.1 0-3.4 1-3.4 2.7 0 1.4 1.2 2.3 3 2.3 1.4 0 2.6-.3 3.5-.8v-.2c0-5.7-2.9-8.6-8.4-8.6Z" />
        </svg>
    );
}

function BlueskyIcon({ className = "" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            aria-hidden="true"
        >
            <path d="M12 10.6C10.9 8.5 7.9 4.4 4.5 2.7 1.2 1.1 0 1.8 0 4.1c0 .5.3 4.1.5 4.7.7 2.4 3.2 3.2 5.4 2.9-3.2.5-6.1 1.7-2.3 6 4.1 4.6 7.2-1 8.4-3.7 1.2 2.7 4.3 8.3 8.4 3.7 3.8-4.3.9-5.5-2.3-6 2.2.3 4.7-.5 5.4-2.9.2-.6.5-4.2.5-4.7 0-2.3-1.2-3-4.5-1.4-3.4 1.7-6.4 5.8-7.5 7.9Z" />
        </svg>
    );
}