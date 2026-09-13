import { Link, useOutletContext, useParams } from "react-router";
import DOMPurify from "dompurify";
import type { OutletContextData } from "../Home/types/GameTypes.ts";
import MediaPlayer from "../../common/components/MediaPlayer.tsx";

export default function GamesDetails() {
    const { games, loading } = useOutletContext<OutletContextData>();
    const { gameId } = useParams();
    const game = games.find((game) => game.id === gameId);

    if (loading) {
        return (
            <section className="shell py-16">
                <p className="text-d4 font-display text-paper-dim">Loading…</p>
            </section>
        );
    }

    if (!game) {
        return (
            <section className="shell py-20 text-center">
                <h1 className="text-d2">We can&apos;t find that game</h1>
                <p className="caption mx-auto mt-3 max-w-prose">
                    The link may be out of date.
                </p>
                <Link to="/games" className="btn-arcade mt-8">
                    Browse the catalog
                </Link>
            </section>
        );
    }

    const cleanHtml = DOMPurify.sanitize(game.details);

    return (
        <section className="shell shell-mid py-12">
            <div className="flex flex-col gap-2 border-b-2 border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
                <h1 className="text-d2">{game.title}</h1>
                {game.developer && (
                    <p className="text-d5 font-display text-paper-dim">
                        Developed by {game.developer}
                    </p>
                )}
            </div>

            <div className="screen crt mt-8 aspect-video">
                <MediaPlayer
                    link={game.trailerLink}
                    title={game.trailerTitle}
                    type={game.trailerType}
                    style="w-full h-full object-cover pixel-img"
                    showCaption={false}
                />
            </div>

            <p className="mt-6 max-w-prose text-base leading-relaxed">
                {game.summary}
            </p>

            <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-12">
                {game.media && game.media.length > 0 && (
                    <div className="flex flex-col gap-4">
                        <h2 className="text-d4 text-paper-dim">Screens</h2>
                        {game.media.map((media) => (
                            <figure key={media.id} className="m-0">
                                <div className="screen aspect-video">
                                    <MediaPlayer
                                        link={media.link}
                                        title={media.title}
                                        type={media.mediaType}
                                        style="w-full h-full object-cover pixel-img"
                                        showCaption={false}
                                    />
                                </div>
                                <figcaption className="caption mt-2">
                                    {media.title}
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                )}

                <div id="gameDetails" dangerouslySetInnerHTML={{ __html: cleanHtml }} />
            </div>

            <div className="mt-14 border-t-2 border-line pt-8">
                <Link to="/games" className="btn-ghost">
                    Back to the catalog
                </Link>
            </div>
        </section>
    );
}
