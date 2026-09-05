import {useOutletContext, useParams} from "react-router";
import type {OutletContextData} from "../Home/types/GameTypes.ts";


export default function GamesDetails(){
    const {games, loading, error} = useOutletContext<OutletContextData>()
    const {gameId} = useParams()
    const game = games.find((game) => game.id === gameId)
    console.log(game)
    if (!game) {
        return <h1>Games Details</h1>
    }



    return (
        <section>
            <h1>Games Details</h1>
            <h2>{game.title} !!</h2>
        </section>
    )
}