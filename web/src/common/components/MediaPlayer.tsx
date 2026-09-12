import type { MediaType } from "../../pages/Home/types/PollTypes.tsx";
import {useState} from "react";

export interface MediaPlayerProps {
    link: string | null;
    title: string;
    type: MediaType | null;
    style?: string;
    onClick?: () => void;
    showCaption?: boolean;
}

export default function MediaPlayer({
                                        link,
                                        title,
                                        type,
                                        style = "",
                                        onClick, showCaption = true,
                                    }: MediaPlayerProps) {



    if (!link) {
        return (
            <div className={style}>
                <p>No media available.</p>
            </div>
        );
    }

    switch (type) {
        case "video":
            return (
               <>
                   <video
                       className={style}
                       controls
                       onClick={onClick}
                   >
                       <source src={link} />
                       Your browser does not support the video element.
                   </video>
                   {showCaption && (<p className="text-center font-light">{title}</p>)}
               </>
            );

        case "image":
            return (
                <>
                    <img
                        className={style}
                        src={link}
                        alt={title}
                        onClick={onClick}
                    />
                    {showCaption && (<p className="text-center font-light">{title}</p>)}
                </>
            );

        case "youtube":
            return (
                <>
                    <iframe
                        className={style}
                        src={link}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        onClick={onClick}
                    />
                    {showCaption && (<p className="text-center font-light">{title}</p>)}
                </>
            );

        default:
            return (
                <div className={style}>
                    <p>Unsupported media type.</p>
                </div>
            );
    }
}