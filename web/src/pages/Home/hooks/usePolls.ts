import { useEffect, useState } from "react";
import type { PollType } from "../types/PollTypes.tsx";
import {getPolls} from "../loaders/PollsLoader.ts";

export function usePolls() {
    const [polls, setPolls] = useState<PollType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        async function fetchPolls() {
            try {
                setLoading(true);

                const data = await getPolls();
                setPolls(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchPolls();
    }, []);

    return {
        polls,
        loading,
        error,
    };
}