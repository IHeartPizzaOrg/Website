import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router";
import router from "./routes/Router.tsx";
import React from "react";

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
