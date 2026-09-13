import { Link } from "react-router";
import GoForIt from "../../assets/media/go_for_it.png";
import NewsletterForm from "./NewsletterForm.tsx";

const footerLinks = [
    { to: "/games", label: "Games" },
    { to: "/about", label: "About" },
    { to: "/values", label: "Values" },
    { to: "/contact", label: "Contact" },
];

export default function Footer() {
    return (
        <footer id="footer" className="mt-16 border-t-[3px] border-red">
            {/* Was inline-flex with a fixed h-35 and mr-25, which collided on
                any narrow screen. Now a stacking two-column grid. */}
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

                <nav aria-label="Footer" className="mt-10 border-t-2 border-line pt-6">
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
            </div>

            <div className="bg-red">
                <div className="shell flex flex-col gap-3 py-6 text-white sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-d4 font-display">I Heart Pizza LLC</p>
                    <p className="text-sm">Fort Wayne, Indiana. &copy; 2026</p>
                </div>
            </div>
        </footer>
    );
}
