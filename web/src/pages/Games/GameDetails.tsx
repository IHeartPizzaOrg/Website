import {useOutletContext, useParams} from "react-router";
import type {OutletContextData} from "../Home/types/GameTypes.ts";
import DOMPurify from 'dompurify';
import React from "react";
import MediaPlayer from "../../common/components/MediaPlayer.tsx";

export default function GamesDetails(){
    const {games, loading, error} = useOutletContext<OutletContextData>()
    const {gameId} = useParams()
    const game = games.find((game) => game.id === gameId)
    console.log(game)
    if (!game) {
        return <h1>Games Details</h1>
    }

    const RenderContent = ()=>{
        const cleanHtml = DOMPurify.sanitize(game.details);

        return (
            <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
        );
    }
    const Media = game.media?.map((m) =>{
        return <MediaPlayer link={m.link} title={m.title} type={m.mediaType} style="
         inline-flex justify-center items-center h-40 w-60 border text-foreground
        " />
    })

    return (
        <section  className="w-full mx-auto  ">
            <div className="flex gap-2 w-3/5  mx-auto px-2 py-4 border-b-1 ">
                <h1 className=" text-lg font-bold ">{game.title}</h1>
                <h4 className="text-xs font-light mt-2 ml-auto">Developed by {game?.developer}</h4>
            </div>
            <div className="flex flex-col w-full mx-auto mt-1 mb-10">
                <MediaPlayer link={game.trailerLink} title={game.trailerTitle} type={game.trailerType}
                             style=" w-3/5 h-100 bg-cover mx-auto rounded-lg " />
                <p className="mt-2 text-center text-sm text-justify w-3/5 mx-auto">
                    {game.summary}
                </p>

                <div className="grid grid-cols-2 gap-8 w-3/5 mx-auto mt-15">
                    <div className="flex flex-col gap-8">
                        {Media}
                    </div>
                    <div id="gameDetails" className="">
                        {RenderContent()}
                    </div>
                </div>

            </div>
        </section>
    )
}