import GoForIt from "../../../assets/media/go_for_it.png";
import {useEffect, useState} from "react";
import type {PollGameEntry, PollType} from "../types/PollTypes.tsx";

import {usePolls} from "../hooks/usePolls.ts";
import MediaPlayer from "../../../common/components/MediaPlayer.tsx";



interface PollEntryProps {
    entry: PollGameEntry
    handleVote: (entry_id: string) => void
}




export const PollEntry = ({entry, handleVote}:PollEntryProps) => {


    return (
        <div className="grid grid-cols-2 gap-5 ">
            <h2 className="items-center col-span-full mt-10 text-white">{entry.gameTitle}</h2>

            <MediaPlayer link={GoForIt} title={entry.trailerTitle} type={"image"}
             style="
                 inline-flex justify-center items-center size-50 border text-foreground
                 col-span-full
            "/>



            <a href={`/game/${entry.gameId}`} target={"_blank"}

                    className="py-3 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border
                    border-transparent text-blue-600 hover:bg-primary-100 hover:text-blue-600/80 focus:outline-hidden
                    focus:bg-primary-100 focus:text-primary-800  disabled:opacity-50 disabled:pointer-events-none
                    dark:text-primary-500 dark:hover:bg-primary-500/20 dark:hover:text-primary-400
                    dark:focus:bg-primary-800/30 dark:focus:text-primary-400

                    ">
                More Info
            </a>
            <button type="button"
                    className="py-0 px-2 w-15 h-8 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border
                    border-layer-line text-teal-500 hover:border-teal-500/60 hover:text-primary-hover
                    focus:outline-hidden focus:border-primary-focus focus:text-primary-focus  disabled:opacity-50
                    disabled:pointer-events-none mt-2
                    "
                    onClick={() => handleVote(entry.entryId)}
            >
                Vote
            </button>
        </div>
    )
}

interface PollProps {
    pollData: PollType
    handlePollClosed: (entry_id: string) => void

}

export const Poll = ({handlePollClosed, pollData}: PollProps) => {

    const handleVote = async (entry_id: string) => {
        console.log("Voted for ", entry_id)

        handlePollClosed(pollData.pollid)
    }

    const content = pollData.choices.map((p) => {
        return <PollEntry key={p.entryId} entry={p} handleVote={handleVote}/>
    })

    return (
        <div className="inline-flex gap-10  justify-center">
            {pollData && content}
        </div>
    )
}

const Confirmation = ()=>{
    return (
        <div className="mt-2 text-teal-500">
            <h1>Thanks For Voting!</h1>
        </div>
    )
}


function PollSection() {
    const [index, setIndex] = useState(0)
    const [pollCompleted, setPollCompleted] = useState(false)
    const { polls, loading, error } = usePolls();

    const [currentPoll, setCurrentPoll] = useState(null)
    console.log(`Current poll: ${currentPoll}`)
    const handlePollClosed = (entryId:string) => {
        console.log("Voted for ", entryId)
        setIndex(index + 1)
        if (index >= polls.length -1){
            setPollCompleted(true)
        }
        setCurrentPoll(polls.at(index))

    }




    useEffect(() => {
        if (!loading){
            setIndex(0)
        }

    }, [loading])

    if (loading || !polls || error)
        return (<></>)

    // if(polls == null)
    //     return (<></>)

    return (
        <section className="w-full ">
             <span className="lg:w-2/4 flex mt-10 mx-auto justify-center items-center px-2 py-6
             bg-gradient-to-r from-fuchsia-500 via-pink-[#AD1E64] to-rose-800">
                    <h1 className="text-xl font-bold text-white">
                        Feedback Needed! What Games Should We Release First?
                    </h1>
                </span>
            <div className="text-center lg:w-2/5 flex flex-col items-center mx-auto  p-5">



                <p className="text-sm  mt-1 w-120">
                    We’re looking for feedback, please! Please vote below, and let us know
                    what games you want to see released first! <br/> Thanks in advance!
                </p>

                {/* Poll */}
                {polls && !pollCompleted? <Poll pollData={polls[index]} handlePollClosed={handlePollClosed}/>: <Confirmation />}

            </div>
        </section>
    )
}

export default PollSection
