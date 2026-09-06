import React, {useState} from 'react'
import {useOutletContext} from "react-router";
import type {OutletContextData} from "../types/GameTypes.ts";
import {HighLight_ID} from "../../../constants/config.ts";
import MediaPlayer from "../../../common/components/MediaPlayer.tsx";


export default function GameHighLight() {
    const { games, loading, error } = useOutletContext<OutletContextData>();
    const game = games.find(game => game.id === HighLight_ID);
    const [openModal, setOpenModal] = useState(false);
    const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

    const HandleMediaClicked = (mediaIndex: number) => {
        setSelectedMediaIndex(mediaIndex);
        setOpenModal(true)
    }

    if (loading || !game) {
        return <></>;
    }

    return (
        <section className="w-full px-4 py-10">
            <div className="max-w-2xl mx-auto mt-5 " >

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 ">

                    {/* Trailer + Screenshots */}
                    <div className="flex flex-col">

                        {/* Trailer */}
                        <div className="w-full aspect-video border border-border rounded-sm overflow-hidden">
                            <MediaPlayer
                                link={game.trailerLink}
                                title={game.trailerTitle}
                                type={game.trailerType}
                                style="w-full h-full object-cover"
                            />
                        </div>

                        {/* Screenshots */}
                        <div className="grid grid-cols-4 gap-2 mt-2">
                            {game.media?.slice(0, 4).map((screenshot, index) => (
                                <div
                                    key={screenshot.id}
                                    className="aspect-video overflow-hidden rounded-md border border-border"
                                >
                                    <MediaPlayer
                                        title={screenshot.title}
                                        type={screenshot.mediaType}
                                        link={screenshot.link}
                                        style="w-full h-full object-cover"
                                        onClick={()=>HandleMediaClicked(index)}
                                    />
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* Game Info */}
                    <div className="flex flex-col justify-start ">
                        <h1 className="text-lg lg:text-xl font-bold text-foreground mb-2">
                            {game.title}
                        </h1>

                        <p className="text-sm text-light leading-relaxed text-justify w-65  text-foreground">
                            {game.summary.slice(0, 190) + "..."}
                        </p>
                        <span className="mt-2 flex flex-col justify-items-start ">
                            {game.developer && <h3 className="text-sm ">Made by: {game.developer}</h3>}
                            <a href={`/game/${game.id}`} target={"_blank"}
                               className=" inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border
                                border-transparent text-blue-600 hover:bg-primary-100 hover:text-blue-600/80 focus:outline-hidden
                                focus:bg-primary-100 focus:text-primary-800  disabled:opacity-50 disabled:pointer-events-none
                                dark:text-primary-500 dark:hover:bg-primary-500/20 dark:hover:text-primary-400
                                dark:focus:bg-primary-800/30 dark:focus:text-primary-400
                                mt-2

                                ">
                            More Info
                        </a>
                        </span>
                    </div>

                </div>

                {/* Modal */}
                {openModal && game.media && game.media.length > 0 && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                        onClick={() => setOpenModal(false)}
                    >
                        {/* Modal content */}
                        <div
                            className="relative w-[90vw] max-w-3xl bg-black rounded-lg p-6 shadow-xl"
                            onClick={(event) => event.stopPropagation()}
                        >
                            {/* Close */}
                            <button
                                type="button"
                                className="absolute top-2 right-3 text-white text-2xl z-10 hover:text-red-400"
                                onClick={() => setOpenModal(false)}
                            >
                                &times;
                            </button>

                            {/* Previous */}
                            <button
                                type="button"
                                className="absolute left-2 top-1/2 -translate-y-1/2
                           text-white text-3xl z-10 hover:text-gray-400"
                                onClick={() => {
                                    setSelectedMediaIndex((current) =>
                                        current === 0
                                            ? game.media!.length - 1
                                            : current - 1
                                    );
                                }}
                            >
                                &#10094;
                            </button>

                            {/* Media */}
                            <div className="w-full flex items-center justify-center">
                                <MediaPlayer
                                    title={game.media[selectedMediaIndex].title}
                                    type={game.media[selectedMediaIndex].mediaType}
                                    link={game.media[selectedMediaIndex].link}
                                    style="max-w-full max-h-[70vh] object-contain"
                                />
                            </div>

                            {/* Next */}
                            <button
                                type="button"
                                className="absolute right-2 top-1/2 -translate-y-1/2
                           text-white text-3xl z-10 hover:text-gray-400"
                                onClick={() => {
                                    setSelectedMediaIndex((current) =>
                                        current === game.media!.length - 1
                                            ? 0
                                            : current + 1
                                    );
                                }}
                            >
                                &#10095;
                            </button>
                        </div>
                    </div>
                )}


            </div>
        </section>
    );
}