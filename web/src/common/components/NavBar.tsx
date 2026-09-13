import { useState } from "react";
import { Link, NavLink } from "react-router";

/** Left of the logo on desktop. */
const primaryLinks = [
    { to: "/", label: "Home", end: true },
    { to: "/games", label: "Games", end: false },
];

/** Right of the logo on desktop. "Values" was previously buried in a
 *  hover-only dropdown that touch and keyboard users could not open. */
const secondaryLinks = [
    { to: "/about", label: "About", end: false },
    { to: "/values", label: "Values", end: false },
    { to: "/contact", label: "Contact", end: false },
];

const allLinks = [...primaryLinks, ...secondaryLinks];

function MenuIcon({ open }: { open: boolean }) {
    return (
        <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            className="size-5"
            fill="currentColor"
            shapeRendering="crispEdges"
        >
            {open ? (
                <>
                    <rect x="2" y="2" width="2" height="2" />
                    <rect x="4" y="4" width="2" height="2" />
                    <rect x="6" y="6" width="2" height="2" />
                    <rect x="8" y="8" width="2" height="2" />
                    <rect x="10" y="10" width="2" height="2" />
                    <rect x="12" y="12" width="2" height="2" />
                    <rect x="12" y="2" width="2" height="2" />
                    <rect x="10" y="4" width="2" height="2" />
                    <rect x="8" y="6" width="2" height="2" />
                    <rect x="6" y="8" width="2" height="2" />
                    <rect x="4" y="10" width="2" height="2" />
                    <rect x="2" y="12" width="2" height="2" />
                </>
            ) : (
                <>
                    <rect x="1" y="3" width="14" height="2" />
                    <rect x="1" y="7" width="14" height="2" />
                    <rect x="1" y="11" width="14" height="2" />
                </>
            )}
        </svg>
    );
}

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-40 w-full border-b-[3px] border-red bg-ink">
            <nav className="shell" aria-label="Main">
                {/* Three columns keep the logo optically centred no matter how
                    many links sit on either side. */}
                <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-4">
                    <div className="hidden items-center gap-6 sm:flex">
                        {primaryLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                end={link.end}
                                className="nav-link"
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* Mobile: hamburger takes the first column so the logo
                        stays centred rather than jumping. */}
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="panel-flat flex size-9 items-center justify-center text-paper sm:hidden hover:border-red hover:text-red-bright"
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu"
                    >
                        <MenuIcon open={isOpen} />
                    </button>

                    <Link
                        to="/"
                        className="justify-self-center"
                        aria-label="I Heart Pizza — home"
                    >
                        <img
                            src="/ihp_logo.png"
                            alt="I Heart Pizza"
                            className="pixel-img h-9 w-auto sm:h-11"
                        />
                    </Link>

                    <div className="hidden items-center justify-end gap-6 sm:flex">
                        {secondaryLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                end={link.end}
                                className="nav-link"
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>
                </div>

                {/* Mobile menu. Stacks vertically — the old version was a
                    horizontal flex row that wrapped into a jumble. */}
                <div
                    id="mobile-menu"
                    hidden={!isOpen}
                    className="border-t-2 border-line pb-4 sm:hidden"
                >
                    <ul className="flex flex-col">
                        {allLinks.map((link) => (
                            <li key={link.to}>
                                <NavLink
                                    to={link.to}
                                    end={link.end}
                                    onClick={() => setIsOpen(false)}
                                    className="nav-link-mobile"
                                >
                                    {link.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </header>
    );
}
