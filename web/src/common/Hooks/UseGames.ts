import { useEffect, useState } from "react";
import type {GameType} from "../../pages/Home/types/GameTypes.ts";
import loadGames from "../Loaders/GamesLoader.ts";


function useGames(offset: number = 0, limit: number = 100) {
    const [games, setGames] = useState<GameType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        async function fetchPolls() {
            try {
                setLoading(true);

                const data = await loadGames(offset, limit);
                // console.log(data);
                setGames(data);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchPolls();
    }, [limit, offset]);

    return {
        games,
        loading,
        error,
    };
}

export default useGames