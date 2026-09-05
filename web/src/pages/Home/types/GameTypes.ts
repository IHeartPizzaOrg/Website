import type {MediaType} from "./PollTypes.tsx";
export type Media = {
    id: string,
    title: string,
    link: string,
    mediaType: MediaType
    gameId: string,

}

export type GameType ={
    id: string,
    title: string,
    developer: string,
    feature: boolean,
    trailerLink: string | null
    trailerType: MediaType | null
    trailerTitle: string
    summary: string,
    details: string,
    media: Media[] | null
}

export interface OutletContextData {
    games: GameType[]
    loading: boolean
    error: Error | undefined
    limit: number
    handlePageLimit: () => void
}