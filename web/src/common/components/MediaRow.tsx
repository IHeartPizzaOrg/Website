import type { MediaType } from "../../pages/Home/types/PollTypes.tsx";
import MediaPlayer from "./MediaPlayer.tsx";

export interface MediaRowItem {
    link: string;
    /** Doubles as alt text and visible caption, so write it for both. */
    title: string;
    type: MediaType;
    /** Sprites and screenshots get nearest-neighbour scaling. */
    pixel?: boolean;
    /** Scanline overlay — for in-game footage, not photographs. */
    scanlines?: boolean;
    ratio?: "video" | "square" | "portrait";
    /** Sprites are tiny; don't blow them up to fill a column. */
    small?: boolean;
    hideCaption?: boolean;
}

const ratioClass = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
} as const;

const columnClass: Record<number, string> = {
    1: "sm:grid-cols-1",
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-4",
};

/**
 * A responsive row of framed media with captions. Replaces the repeated
 * `.values-display` blocks, each of which hardcoded its own pixel dimensions
 * (h-45 w-150 and friends) and overflowed on anything narrow.
 */
export default function MediaRow({ items }: { items: MediaRowItem[] }) {
    const columns = columnClass[Math.min(items.length, 4)] ?? columnClass[3];

    return (
        <div className={`my-10 grid grid-cols-1 gap-6 ${columns}`}>
            {items.map((item) => (
                <figure key={item.link} className="m-0">
                    <div
                        className={`screen ${item.scanlines ? "crt" : ""} ${
                            ratioClass[item.ratio ?? "video"]
                        } ${item.small ? "mx-auto max-w-32" : ""}`}
                    >
                        <MediaPlayer
                            link={item.link}
                            title={item.title}
                            type={item.type}
                            showCaption={false}
                            style={`w-full h-full ${
                                item.small ? "object-contain p-2" : "object-cover"
                            } ${item.pixel ? "pixel-img" : ""}`}
                        />
                    </div>
                    {!item.hideCaption && (
                        <figcaption className="caption mt-2">{item.title}</figcaption>
                    )}
                </figure>
            ))}
        </div>
    );
}
