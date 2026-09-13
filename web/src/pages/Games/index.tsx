import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import { useOutletContext } from "react-router";
import type { OutletContextData } from "../Home/types/GameTypes.ts";
import { GameCard } from "../../common/components/GameCard.tsx";

const pageSize = 8;

export default function GamesPage() {
    const { games, loading, error } = useOutletContext<OutletContextData>();
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const onSearchChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    /* Previously the rendered cards were pushed into state, which meant the
       list was JSX-in-state and re-derived by effects. Deriving it here keeps
       one source of truth. */
    const visibleGames = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        if (query.length > 0) {
            return games.filter((game) =>
                game.title.toLowerCase().includes(query),
            );
        }

        return games.slice(0, pageSize * currentPage);
    }, [games, searchQuery, currentPage]);

    const hasMore = searchQuery.trim().length === 0 && visibleGames.length < games.length;

    // Infinite scroll. Guarded on hasMore so the page counter cannot run away
    // past the end of the catalog.
    useEffect(() => {
        if (!hasMore) return;

        const handleScroll = () => {
            const isNearBottom =
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 100;

            if (isNearBottom) {
                setCurrentPage((previous) => previous + 1);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasMore]);

    if (error) {
        return (
            <section className="shell py-16">
                <h1 className="section-title">Games catalog</h1>
                <p className="mt-6 max-w-prose text-sm">
                    The catalog didn&apos;t load. Reload the page to try again.
                </p>
            </section>
        );
    }

    if (loading) {
        return (
            <section className="shell py-16">
                <p className="text-d4 font-display text-paper-dim">Loading…</p>
            </section>
        );
    }

    return (
        <section className="shell py-12">
            <div className="flex flex-col gap-4 border-b-2 border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
                <h1 className="section-title border-b-0 pb-0">Games catalog</h1>

                <div className="sm:w-64">
                    <label className="label" htmlFor="search">
                        Search
                    </label>
                    <input
                        id="search"
                        type="search"
                        className="field"
                        placeholder="Game title"
                        value={searchQuery}
                        onChange={onSearchChanged}
                    />
                </div>
            </div>

            {visibleGames.length === 0 ? (
                <div className="py-20 text-center">
                    <h2 className="text-d3">No games match that</h2>
                    <p className="caption mt-3">
                        Try a shorter search, or clear it to see all {games.length}{" "}
                        games.
                    </p>
                </div>
            ) : (
                <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {visibleGames.map((game) => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            )}
        </section>
    );
}
