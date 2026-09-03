import NavBar from "../components/NavBar.tsx";
import Footer from "../components/Footer.tsx";
import {Outlet} from "react-router";

function Layout() {
    return (
        <main className="bg-black h-screen text-white">
            <NavBar/>
                <Outlet />
            <Footer/>
        </main>
    )
}

export default Layout
