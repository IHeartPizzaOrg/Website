import { Link, useNavigate, useOutletContext } from "react-router";
import type { OutletContextData } from "../types/GameTypes.ts";
import { GameCard } from "../../../common/components/GameCard.tsx";
import MediaPlayer from "../../../common/components/MediaPlayer.tsx";

export default function FeaturedGames() {
    const { games, loading } = useOutletContext<OutletContextData>();
    const navigate = useNavigate();

    const featuredGames = games.filter((game) => game.feature);

    if (loading || !games || featuredGames.length === 0) {
        return <></>;
    }

    const [lead, ...rest] = featuredGames;

    return (
        <section className="border-t-2 border-line py-14">
            <div className="shell shell-mid">
                <h2 className="section-title">Featured games</h2>

                <div className="mt-8">
                    <h3 className="text-d2">{lead.title}</h3>

                    <div className="screen crt mt-4 aspect-video">
                        <MediaPlayer
                            link={lead.trailerLink}
                            title={lead.trailerTitle}
                            type={lead.trailerType}
                            style="w-full h-full object-cover pixel-img"
                            showCaption={false}
                        />
                    </div>

                    <p className="mt-5 max-w-prose text-sm leading-relaxed">
                        {lead.summary}
                    </p>

                    <Link
                        to={`/game/${lead.id}`}
                        className="link-arcade text-d5 mt-4 inline-block font-display"
                    >
                        More about {lead.title}
                    </Link>
                </div>

                {rest.length > 0 && (
                    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {rest.map((game) => (
                            <GameCard key={game.id} game={game} />
                        ))}
                    </div>
                )}

                <div className="mt-12 flex justify-center">
                    <button
                        type="button"
                        className="btn-arcade"
                        onClick={() => navigate("/games")}
                    >
                        View the full catalog
                    </button>
                </div>
            </div>
        </section>
    );
}
