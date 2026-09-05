import { pollApi } from "../../../constants/axiosClient.ts";
import type { PollType } from "../types/PollTypes.tsx";

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

    return response.data.polls.map((poll): PollType => ({
        pollid: poll.id,
        choices: poll.poll_choices.map((choice) => ({
            entryId: choice.id,
            gameId: choice.game.id,
            trailerLink: choice.game.trailer_link,
            trailerTitle: choice.game.trailer_title,
            trailerType: choice.game.trailer_media_type,
            gameTitle: choice.game.title,
        })),
    }));
}