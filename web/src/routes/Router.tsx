import {createBrowserRouter} from "react-router";
import HomePage from "../pages/Home";
import Layout from "../common/layouts/Layout.tsx";
import AboutPage from "../pages/About";
import ValuesPage from "../pages/Values";
import GamesPage from "../pages/Games";
import ContactPage from "../pages/Contact";
import GamesDetails from "../pages/Games/GameDetails.tsx";





const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <HomePage/>
            },
            {
                path: "/about",
                element: <AboutPage/>
            },
            {
                path: "/values",
                element: <ValuesPage/>
            },
            {
                path: "/games",
                element: <GamesPage/>,
            },
            {
                path: "/game/:gameId",
                element: <GamesDetails />
            },
            {
                path: "/contact",
                element: <ContactPage/>
            }
        ]
    }
]);



export default router