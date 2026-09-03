import {useState} from 'react'
import {Link} from "react-router";

export default function NavBar() {

    const [isOpen, setIsOpen] = useState(false);
    return (
        <header className="w-full bg-navbar  ">
            <nav className="max-w-340 w-full mx-auto px-4">

                {/* Top row */}
                <div className="relative  flex items-center justify-center h-16">

                    {/* Mobile hamburger */}
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="
                            sm:hidden
                            absolute right-4
                            size-9
                            flex items-center justify-center
                            rounded-lg
                            bg-layer
                            border border-layer-line
                            text-layer-foreground
                        "
                        aria-label="Toggle navigation"
                        aria-expanded={isOpen}
                    >
                        <img
                            className="w-full p-1"
                            src="/menu.png"
                            alt="Menu"
                        />
                    </button>

                    {/* Desktop navigation */}
                    <div className="hidden sm:flex items-center justify-center gap-8">

                        {/* Left */}
                        <div className="flex items-center gap-6">
                            <Link
                                className="text-sm font-medium text-primary-active"
                                to="/"
                            >
                                Home
                            </Link>

                            <Link
                                className="text-sm font-medium text-primary-active"
                                to="/games"
                            >
                                Games
                            </Link>
                        </div>

                        {/* Logo */}
                        <Link
                            to="/"
                            className="flex items-center gap-x-2 text-xl font-semibold text-foreground"
                        >
                            <img
                                className="w-50"
                                src="/ihp_logo.png"
                                alt="Logo"
                            />

                        </Link>

                        {/* Right */}
                        <div className="flex items-center gap-6">
                            {/* About Us Dropdown */}
                            <div className="relative group">
                                <Link
                                    className="text-sm font-medium text-primary-active"
                                    to="/about"
                                >
                                    About Us
                                </Link>

                                <div className="absolute left-1/2 mt-2 -translate-x-2/4 top-full pt-3 invisible bg-black opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
                                    <div className="min-w-22    border-t-0  border-layer-line shadow-lg p-2">
                                        <Link
                                            to="/values"
                                            className="   text-sm text-layer-foreground  "
                                        >
                                            Our Values
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <Link
                                className="text-sm font-medium text-primary-active"
                                to="/contact"
                            >
                                Contact
                            </Link>
                        </div>

                    </div>

                    {/* Mobile logo */}
                    <Link
                        to="/"
                        className="sm:hidden flex items-center gap-x-2 text-xl font-semibold text-foreground"
                    >
                        <img
                            className="w-50"
                            src="/ihp_logo.png"
                            alt="Logo"
                        />
                    </Link>

                </div>


                {/* Mobile menu */}
                <div
                    className={`
                        sm:hidden overflow-hidden transition-all duration-300
                        ${isOpen ? "max-h-80 pb-5" : "max-h-0"}
                    `}
                >
                    <div className="flex  items-start gap-5 pt-4">

                        <Link
                            className="text-sm font-medium text-primary-active"
                            to="/"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>

                        <Link
                            className="text-sm font-medium text-primary-active"
                            to="/games"
                            onClick={() => setIsOpen(false)}
                        >
                            Games
                        </Link>

                        <Link
                            className="text-sm font-medium text-primary-active"
                            to="/about"
                            onClick={() => setIsOpen(false)}
                        >
                            About Us
                        </Link>
                        <Link
                            className="text-sm font-medium text-primary-active"
                            to="/values"
                            onClick={() => setIsOpen(false)}
                        >
                            Our Values
                        </Link>

                        <Link
                            className="text-sm font-medium text-primary-active"
                            to="/games"
                            onClick={() => setIsOpen(false)}
                        >
                            Contact
                        </Link>

                    </div>
                </div>

            </nav>
        </header>


    )
}
