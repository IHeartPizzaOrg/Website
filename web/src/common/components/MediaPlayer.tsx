import type { MediaType } from "../../pages/Home/types/PollTypes.tsx";

export interface MediaPlayerProps {
    link: string | null;
    title: string;
    type: MediaType | null;
    style?: string;
    onClick?: () => void;
}

export default function MediaPlayer({
                                        link,
                                        title,
                                        type,
                                        style = "",
                                        onClick
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
                <video
                    className={style}
                    controls
                    onClick={onClick}
                >
                    <source src={link} />
                    Your browser does not support the video element.
                </video>
            );

        case "image":
            return (
                <img
                    className={style}
                    src={link}
                    alt={title}
                    onClick={onClick}
                />
            );

        case "youtube":
            return (
                <iframe
                    className={style}
                    src={link}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onClick={onClick}
                />
            );

        default:
            return (
                <div className={style}>
                    <p>Unsupported media type.</p>
                </div>
            );
    }
}