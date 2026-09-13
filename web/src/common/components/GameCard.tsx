import { Link } from "react-router";
import type { GameType } from "../../pages/Home/types/GameTypes.ts";
import MediaPlayer from "./MediaPlayer.tsx";

export interface GameCardProps {
    game: GameType;
    style?: string;
}

export const GameCard = ({ game, style = "" }: GameCardProps) => {
    return (
        <article className={`flex flex-col ${style}`}>
            <div className="screen crt aspect-video">
                <MediaPlayer
                    link={game.trailerLink}
                    title={game.trailerTitle}
                    type={game.trailerType}
                    style="w-full h-full object-cover pixel-img"
                    showCaption={false}
                />
            </div>

            <h3 className="text-d4 mt-4">{game.title}</h3>

            <p className="mt-2 text-sm leading-relaxed text-paper-dim">
                {game.summary.slice(0, 140)}
                {game.summary.length > 140 && "…"}
            </p>

            <Link
                to={`/game/${game.id}`}
                className="link-arcade text-d5 mt-4 self-start font-display"
            >
                Learn more
            </Link>
        </article>
    );
};
