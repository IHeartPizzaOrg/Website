import { pollApi } from "../../../constants/axiosClient.ts";
import type { MediaType, PollType } from "../types/PollTypes.tsx";


/** Raw poll choice as the IHP API returns it (snake_case). */
interface ApiPollChoice {
    id: string;
    game: {
        id: string;
        title: string;
        trailer_link: string;
        trailer_title: string;
        trailer_media_type: MediaType | null;
    };
}

/** Raw poll as the IHP API returns it (snake_case). */
interface ApiPoll {
    id: string;
    poll_choices: ApiPollChoice[];
}

export async function getPolls(): Promise<PollType[]> {
    const response = await pollApi.get("", {
        params: {
            offset: 0,
            limit: 100,
        },
    });
    if (response.status !== 200) {
        throw new Error(
            `Something went wrong | Response: ${response.status}`
        );
    }
    if (response.data.polls.length === 0) {
        return [];
    }

    return response.data.polls?.map((poll: ApiPoll): PollType => ({
        pollid: poll.id,
        choices: poll.poll_choices.map((choice: ApiPollChoice) => ({
            entryId: choice.id,
            gameId: choice.game.id,
            trailerLink: choice.game.trailer_link,
            trailerTitle: choice.game.trailer_title,
            trailerType: choice.game.trailer_media_type,
            gameTitle: choice.game.title,
        })),
    }));
}