import { Outlet } from "react-router";
import NavBar from "../components/NavBar.tsx";
import Footer from "../components/Footer.tsx";
import BootScreen from "../components/BootScreen.tsx";
import useGames from "../Hooks/UseGames.ts";
import useBootSequence from "../Hooks/useBootSequence.ts";
import ScrollToTop from "../Hooks/ScrollToTop.tsx";

function Layout() {
  const games_context = useGames(0, 100);
  const boot = useBootSequence(games_context.loading);

  return (
    <div className="flex min-h-screen flex-col bg-ink text-paper">
      {boot.visible && <BootScreen percent={boot.percent} />}

      <NavBar />
      <main className="flex-1">
          <ScrollToTop/>
        <Outlet context={games_context} />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
