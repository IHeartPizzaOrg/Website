import type {GameType} from "../../pages/Home/types/GameTypes.ts";
import MediaPlayer from "./MediaPlayer.tsx";
import {Link} from "react-router";

export interface GameCardProps {
    game: GameType,
    style?: string
}

export const GameCard = ({game, style}: GameCardProps) => {

    return (
        <div className={"flex flex-col gap-2 "+style}>
            <MediaPlayer link={game.trailerLink} title={game.trailerTitle} type={game.trailerType}
            style="inline-flex justify-center items-center border text-foreground
                 "
            />
            <h1>{game.title}</h1>
            <p className="text-xs font-light  px-2 content-center justify-center">
                {game.summary.slice(0, 200)}

            </p>
            <Link to={`/game/${game.id}`}
                  className=" inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border
                                border-transparent text-yellow-500 hover:bg-primary-100 hover:text-yellow-500/80 focus:outline-hidden
                                focus:bg-primary-100 focus:text-primary-800  disabled:opacity-50 disabled:pointer-events-none
                                dark:text-primary-500 dark:hover:bg-primary-500/20 dark:hover:text-primary-400
                                dark:focus:bg-primary-800/30 dark:focus:text-primary-400
                                mt-2 mx-auto mb-5
                                ">
                Learn More
            </Link>
        </div>
    )
}
