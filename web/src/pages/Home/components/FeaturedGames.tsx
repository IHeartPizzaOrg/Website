import MediaPlayer from "../../../common/components/MediaPlayer.tsx";
import {Link, useNavigate, useOutletContext} from "react-router";
import type {OutletContextData} from "../types/GameTypes.ts";
import {GameCard} from "../../../common/components/GameCard.tsx";



export default function FeaturedGames() {
    const {games, loading, error} = useOutletContext<OutletContextData>()
    const navigate = useNavigate()


    const featuredGames = games.filter((game)=> game.feature)

    if (loading || !games || featuredGames.length === 0) {
        return <></>
    }

    const content = featuredGames.slice(1).map((game)=> {
        return <GameCard game={game} />
    })


    return (
        <section
            className="w-full"
        >
            <div
                className=" lg:w-3/6 justify-center content-center items-center mx-auto"
            >
                <h1 className="text-4xl font-bold mb-5">OUR FEATURED GAMES</h1>
                <h2>{featuredGames[0].title}</h2>
                <div className="w-full aspect-video jus border border-border rounded-sm overflow-hidden mb-5">

                    <MediaPlayer
                        link={featuredGames[0].trailerLink}
                        title={featuredGames[0].trailerTitle}
                        type={featuredGames[0].trailerType}
                        style="w-full h-full object-cover"
                    />
                </div>
                <p className="text-sm font-light text-justify mb-5 ">
                    {featuredGames[0].summary}<br/>
                    <Link to={`/game/${"djsjs"}`}
                          className=" inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border
                                border-transparent text-blue-600 hover:bg-primary-100 hover:text-blue-600/80 focus:outline-hidden
                                focus:bg-primary-100 focus:text-primary-800  disabled:opacity-50 disabled:pointer-events-none
                                dark:text-primary-500 dark:hover:bg-primary-500/20 dark:hover:text-primary-400
                                dark:focus:bg-primary-800/30 dark:focus:text-primary-400
                                mt-2
                                ">
                        More Info
                    </Link>
                </p>
                <div className="grid grid-cols-3 gap-5 ">
                    {content}
                </div>
                <div className="flex justify-center mt-3 mb-5">
                    <button
                        type="button"
                        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-md
                        bg-red-500 border border-transparent text-foreground-inverse hover:bg-red-600
                        focus:outline-hidden focus:bg-red-600 disabled:opacity-50 disabled:pointer-events-none"
                          onClick={()=>navigate("/games")}
                    >
                        view Games Catalog
                    </button>
                </div>

            </div>
        </section>
    )
}
