import { useState } from "react";
import {Link, useOutletContext} from "react-router";
import type { PollGameEntry, PollType } from "../types/PollTypes.tsx";
import { usePolls } from "../hooks/usePolls.ts";
import MediaPlayer from "../../../common/components/MediaPlayer.tsx";
import type {OutletContextData} from "../types/GameTypes.ts";

interface PollEntryProps {
    entry: PollGameEntry;
    handleVote: (entry_id: string) => void;
}

export const PollEntry = ({ entry, handleVote }: PollEntryProps) => {
    const { games, loading } = useOutletContext<OutletContextData>();
    const game = games.find((game) => game.id === entry.gameId);

    if(loading) {
        return (<></>)
    }

    if (!game){
        throw new Error("Game does not exist")
    }

    return (
        <article className="panel-flat flex flex-col p-4">
            <h3 className="text-d4">{entry.gameTitle}</h3>

            <div className="screen crt mt-3 aspect-[4/3]">
                <MediaPlayer
                    link={game.trailerLink}
                    title={game.trailerTitle}
                    type={game.trailerType}
                    style="w-full h-full object-cover pixel-img"
                    showCaption={false}
                />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                    type="button"
                    className="btn-arcade"
                    onClick={() => handleVote(entry.entryId)}
                >
                    Vote
                </button>
                <Link
                    to={`/game/${entry.gameId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-arcade text-d5 font-display"
                >
                    More info
                </Link>
            </div>
        </article>
    );
};

interface PollProps {
    pollData: PollType;
    handlePollClosed: (entry_id: string) => void;
}

export const Poll = ({ handlePollClosed, pollData }: PollProps) => {
    const handleVote = async () => {
        handlePollClosed(pollData.pollid);
    };

    return (
        <>
            <p className="mx-auto max-w-prose text-sm leading-relaxed">
                Vote below and tell us which games you want released first.
            </p>

            {/* Was a fixed two-column grid inside an inline-flex with gap-10 —
                it overflowed on phones. */}
            <div className="mt-8 grid w-full gap-6 sm:grid-cols-2">
                {pollData?.choices.map((choice) => (
                    <PollEntry
                        key={choice.entryId}
                        entry={choice}
                        handleVote={handleVote}
                    />
                ))}
            </div>
        </>
    );
};

const Confirmation = () => {
    return (
        <div>
            <h3 className="text-d3 text-red-bright">Thanks for voting</h3>
            <p className="caption mx-auto mt-2 max-w-prose">
                Your pick is in. It genuinely shapes what we build next.
            </p>
        </div>
    );
};

function PollSection() {
    const [index, setIndex] = useState(0);
    const [pollCompleted, setPollCompleted] = useState(false);
    const { polls, loading, error } = usePolls();


    const handlePollClosed = () => {
        setIndex(index + 1);
        if (index >= polls.length - 1) {
            setPollCompleted(true);
        }
    };

    if (loading || !polls || polls.length === 0 || error) {
        return <></>;
    }

    return (
        <section className="border-t-2 border-line py-14">
            <div className="shell shell-mid">
                {/* Replaces the fuchsia-to-rose gradient banner. */}
                <div className="marquee">
                    <h2 className="text-d3 text-center">Which game should we release first?</h2>
                </div>

                <div className="mt-8 flex flex-col items-center text-center">
                    {polls && !pollCompleted ? (
                        <Poll
                            pollData={polls[index]}
                            handlePollClosed={handlePollClosed}
                        />
                    ) : (
                        <Confirmation />
                    )}
                </div>
            </div>
        </section>
    );
}

export default PollSection;
