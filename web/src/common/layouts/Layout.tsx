import NavBar from "../components/NavBar.tsx";
import Footer from "../components/Footer.tsx";
import {Outlet} from "react-router";
import useGames from "../Hooks/UseGames.ts";
import {useState} from "react";

function Layout() {
    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(100)
    const games_context = useGames(offset, limit);

    const OnPageLimitReached = () => {
        console.log("onPageLimitReached");
        setOffset(limit)
        setLimit(prevState => prevState * 2)

    }
    return (
        <div className="min-h-screen bg-black text-white flex flex-col">

            <NavBar/>
            <main className=" flex-1 ">

                <Outlet context={games_context}  />

            </main>

            <Footer/>
        </div>

    )
}

export default Layout
