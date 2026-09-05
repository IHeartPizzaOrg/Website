import {gamesApi} from "../../constants/axiosClient.ts";
import type {GameType, Media} from "../../pages/Home/types/GameTypes.ts";
import type {MediaType} from "../../pages/Home/types/PollTypes.tsx";


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

    return response.data.games.map((game) : GameType => ({
        id: game.id,
        title: game.title,
        developer: game.developer,
        feature: game.feature,
        trailerLink: game.trailer_link,
        trailerType: game.trailer_media_type,
        trailerTitle: game.trailer_title,
        summary: game.summary,
        details: game.details,
        media: game.media.map(media => ({
            id: media.id,
            title: media.title,
            link: media.link,
            mediaType: media.media_type,
            gameId: game.id,
        })),
    }));

}