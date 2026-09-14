import {gamesApi} from "../../constants/axiosClient.ts";
import type {GameType} from "../../pages/Home/types/GameTypes.ts";
import type {MediaType} from "../../pages/Home/types/PollTypes.tsx";


/** Raw media as the IHP API returns it (snake_case). */
interface ApiMedia {
    id: string;
    title: string;
    link: string;
    media_type: MediaType;
}

/** Raw game as the IHP API returns it (snake_case). */
interface ApiGame {
    id: string;
    title: string;
    developer: string;
    feature: boolean;
    trailer_link: string;
    trailer_media_type: MediaType | null;
    trailer_title: string;
    summary: string;
    details: string;
    priority: boolean;
    media: ApiMedia[];
}

export default async function loadGames(offset: number=0, limit: number=100): Promise<GameType[]> {

    const response = await gamesApi.get("/", {
        params: {
            offset: offset,
            limit: limit,
        }
    })

    if(response.status !== 200){
        throw new Error(response.statusText);
    }

    return response.data.games.map((game: ApiGame): GameType => ({
        id: game.id,
        title: game.title,
        developer: game.developer,
        feature: game.feature,
        trailerLink: game.trailer_link,
        trailerType: game.trailer_media_type,
        trailerTitle: game.trailer_title,
        summary: game.summary,
        details: game.details,
        priority: game.priority,
        media: game.media.map((media: ApiMedia) => ({
            id: media.id,
            title: media.title,
            link: media.link,
            mediaType: media.media_type,
            gameId: game.id,
        })),
    }));

}