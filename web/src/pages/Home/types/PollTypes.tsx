export type MediaType= "image" | "video" | "youtube"

export type PollGameEntry = {
    entryId: string,
    gameId: string
    trailerLink: string | null
    trailerType: MediaType | null
    trailerTitle: string
    gameTitle: string
}

export type PollType = {
    pollid: string
    title: string | null
    hint: string | null
    choices: PollGameEntry[]
}
