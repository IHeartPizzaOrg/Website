import { useEffect } from "react";
import { useLocation } from "react-router";

export function ScrollToHash() {
    const { hash } = useLocation();

    useEffect(() => {
        if (!hash) return;

        const id = hash.slice(1);

        requestAnimationFrame(() => {
            const element = document.getElementById(id);

            element?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        });
    }, [hash]);

    return null;
}