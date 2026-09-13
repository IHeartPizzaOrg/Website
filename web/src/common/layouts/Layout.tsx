import { Outlet } from "react-router";
import NavBar from "../components/NavBar.tsx";
import Footer from "../components/Footer.tsx";
import useGames from "../Hooks/UseGames.ts";

function Layout() {
    const games_context = useGames(0, 100);

    return (
        <div className="flex min-h-screen flex-col bg-ink text-paper">
            <NavBar />
            <main className="flex-1">
                <Outlet context={games_context} />
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
