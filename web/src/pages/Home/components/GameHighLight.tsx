import { useState } from "react";
import { Link, useOutletContext } from "react-router";
import type { OutletContextData } from "../types/GameTypes.ts";
import { HighLight_ID } from "../../../constants/config.ts";
import MediaPlayer from "../../../common/components/MediaPlayer.tsx";
import MediaGalleryModal from "../../../common/components/MediaGalleryModal.tsx";

export default function GameHighLight() {
    const { games, loading } = useOutletContext<OutletContextData>();
    const game = games.find((game) => game.id === HighLight_ID);
    const [openModal, setOpenModal] = useState(false);
    const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

    const HandleMediaClicked = (mediaIndex: number) => {
        setSelectedMediaIndex(mediaIndex);
        setOpenModal(true);
    };

    if (loading || !game) {
        return <></>;
    }

    const screenshots =
        game.media?.filter((media) => media.mediaType === "image").slice(0, 4) ?? [];

    return (
        <section className="shell shell-mid py-14">
            <h2 className="section-title">In development</h2>

            <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-10">
                <div className="flex flex-col gap-3">
                    <div className="screen crt aspect-video">
                        <MediaPlayer
                            link={game.trailerLink}
                            title={game.trailerTitle}
                            type={game.trailerType}
                            style="w-full h-full object-cover pixel-img"
                            showCaption={false}
                        />
                    </div>

                    {screenshots.length > 0 && (
                        <div className="grid grid-cols-4 gap-2">
                            {screenshots.map((screenshot, index) => (
                                <button
                                    key={screenshot.id}
                                    type="button"
                                    onClick={() => HandleMediaClicked(index)}
                                    aria-label={`View ${screenshot.title}`}
                                    className="screen aspect-video"
                                >
                                    <MediaPlayer
                                        title={screenshot.title}
                                        type={screenshot.mediaType}
                                        link={screenshot.link}
                                        style="w-full h-full object-cover pixel-img"
                                        showCaption={false}
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex flex-col items-start">
                    <h3 className="text-d2">{game.title}</h3>

                    {game.developer && (
                        <p className="text-d5 mt-3 font-display text-paper-dim">
                            Made by {game.developer}
                        </p>
                    )}

                    <p className="mt-4 max-w-prose text-sm leading-relaxed">
                        {game.summary.slice(0, 260)}
                        {game.summary.length > 260 && "…"}
                    </p>

                    <Link
                        to={`/game/${game.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost mt-6"
                    >
                        See the game
                    </Link>
                </div>
            </div>


            <MediaGalleryModal
                game={game} open={openModal}
                selectedMediaIndex={selectedMediaIndex}
                onClose={()=>setOpenModal(false)}
                onMediaChange={setSelectedMediaIndex} />
        </section>
    );
}
