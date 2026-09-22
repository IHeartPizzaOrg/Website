import {createBrowserRouter} from "react-router";
import HomePage from "../pages/Home";
import Layout from "../common/layouts/Layout.tsx";
import AboutPage from "../pages/About";
import ValuesPage from "../pages/Values";
import GamesPage from "../pages/Games";
import ContactPage from "../pages/Contact";
import GamesDetails from "../pages/Games/GameDetails.tsx";
import IHPErrorBoundary from "../common/components/IHPErrorBoundery.tsx";
import UnsubscribePage from "../pages/Unsubscribe";
import UnsubscribeConfirmPage from "../pages/Unsubscribe/Confirm.tsx";
import LegalPage from "../pages/Legal";





const router = createBrowserRouter([
    {
        element: <Layout/>,
        errorElement: <IHPErrorBoundary />,
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
            },
            {
                path: "/unsubscribe",
                element: <UnsubscribePage/>
            },
            {
                path: "/unsubscribe/confirm",
                element: <UnsubscribeConfirmPage/>
            },
            {
                path: "/legal",
                element: <LegalPage/>
            }
        ]
    }
]);



export default router