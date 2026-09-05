import {useOutletContext} from "react-router";
import type {OutletContextData} from "../Home/types/GameTypes.ts";
import React, {useEffect, useState} from "react";
import {GameCard} from "../../common/components/GameCard.tsx";


export default function GamesPage(){
    const {games, loading, error} = useOutletContext<OutletContextData>()
    const [searchQuery, setSearchQuery] = useState("")
    const [catalog, setCatalog] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [gameFound, setGameFound] = useState(false)
    const pageSize = 8;


    const onSearchChanged = (e: React.ChangeEvent<HTMLInputElement>)=>{
        console.log("changed:", e.target.value);
        setSearchQuery(e.target.value)
    }

    function  UpdateCatalog  (){
        if(searchQuery.trim().length < 1){
            console.log("Nothing selected")
            const content = games?.slice(0,pageSize * currentPage).map((game)=> {
                return <GameCard game={game} style="border"/>
            })
            setCatalog(content)
            return;
        }
        let content = games.filter((game)=> {
            return game.title.toLowerCase().includes(searchQuery.toLowerCase())
        }).map((game)=> <GameCard game={game} style="border"/>)

        if (content.length < 1){
            content = <h1>No Games Found</h1>
        }
        setCatalog(content)
    }
    
    // On Search
    useEffect(()=>{
        const Update = () => {
            UpdateCatalog();
        }



        Update();


    },[searchQuery])

    // On Games Loaded
    useEffect(() => {
        const content = games?.slice(0, pageSize * currentPage).map((game)=> {
            return <GameCard game={game} style="border"/>
        })
        setCatalog(content)
    }, [games, currentPage]);

    // On Render
    useEffect(() => {
        const handleScroll = () => {
            const isNearBottom =
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 100;

            if (isNearBottom){

                setCurrentPage(prevState => prevState+1)

            }
        };


        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

    }, []);

    if(error){

        console.log(`Error: ${error}`)
        return <></>;
    }

    if(loading ){
        return <div>Loading...</div>;
    }
    if (!games){
        console.log("No games found")
        console.log(games)
    }


    return (
        <section className="w-full mx-auto text-center ">
            <div className="flex gap-2 w-4/5  mx-auto px-2 py-4 border-b-1 ">
                <h1 className=" text-lg font-bold ">Our Games Catalog</h1>
                <input id="search" type="text"
                       className="px-2 rounded-full block w-50 bg-layer h-6 border-layer-line
                           sm:text-sm text-foreground placeholder:text-muted-foreground-1 focus:border-primary-focus
                           focus:ring-primary-focus disabled:opacity-50
                           ml-auto text-gray-600
                           "
                       placeholder="Search"

                       value={searchQuery}
                onChange={onSearchChanged}
                />
            </div>
            <div className="grid grid-cols-4 gap-4 gap-y-10 w-4/5 mx-auto mt-10 mb-10">
                {catalog}
            </div>
        </section>
    )
}