import { useState } from "react";
import {Link, useOutletContext} from "react-router";
import type { PollGameEntry, PollType } from "../types/PollTypes.tsx";
import { usePolls } from "../hooks/usePolls.ts";
import { voteForEntry } from "../loaders/PollsLoader.ts";
import MediaPlayer from "../../../common/components/MediaPlayer.tsx";
import type {OutletContextData} from "../types/GameTypes.ts";

// Used when a poll has no title / hint set in the admin
const DEFAULT_TITLE = "Which game should we release first?";
const DEFAULT_HINT = "Vote below and tell us which games you want released first.";

interface PollEntryProps {
    entry: PollGameEntry;
    handleVote: (entry_id: string) => void;
    disabled: boolean;
}

export const PollEntry = ({ entry, handleVote, disabled }: PollEntryProps) => {
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
                    disabled={disabled}
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
    handlePollClosed: () => void;
}

export const Poll = ({ handlePollClosed, pollData }: PollProps) => {
    const [submitting, setSubmitting] = useState(false);
    const [voteError, setVoteError] = useState(false);

    const handleVote = async (entryId: string) => {
        setSubmitting(true);
        setVoteError(false);
        try {
            await voteForEntry(entryId);
            handlePollClosed();
        } catch {
            setVoteError(true);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <p className="mx-auto max-w-prose text-sm leading-relaxed">
                {pollData.hint ?? DEFAULT_HINT}
            </p>

            {/* Was a fixed two-column grid inside an inline-flex with gap-10 —
                it overflowed on phones. */}
            <div className="mt-8 grid w-full gap-6 sm:grid-cols-2">
                {pollData?.choices.map((choice) => (
                    <PollEntry
                        key={choice.entryId}
                        entry={choice}
                        handleVote={handleVote}
                        disabled={submitting}
                    />
                ))}
            </div>

            <p role="status" aria-live="polite" className="caption mt-4 min-h-[1.125rem] text-red-bright">
                {voteError && "Your vote didn't go through. Give it another try in a moment."}
            </p>
        </>
    );
};

interface PollProgressProps {
    current: number;
    total: number;
}

/** Arcade-style "1/2" counter with one pixel block per poll. */
const PollProgress = ({ current, total }: PollProgressProps) => {
    return (
        <div
            className="flex shrink-0 items-center gap-3"
            aria-label={`Poll ${current} of ${total}`}
        >
            <div className="hidden gap-1 sm:flex" aria-hidden="true">
                {Array.from({ length: total }, (_, i) => (
                    <span
                        key={i}
                        className={`block h-2.5 w-2.5 border-2 border-ink ${
                            i < current ? "bg-on-red" : "bg-red-deep"
                        }`}
                    />
                ))}
            </div>
            <span className="font-display text-d4 tabular-nums" aria-hidden="true">
                {current}/{total}
            </span>
        </div>
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
        if (index >= polls.length - 1) {
            setPollCompleted(true);
        } else {
            setIndex(index + 1);
        }
    };

    if (loading || !polls || polls.length === 0 || error) {
        return <></>;
    }

    const currentPoll = polls[index];

    return (
        <section className="border-t-2 border-line py-14">
            <div className="shell shell-mid">
                {/* Replaces the fuchsia-to-rose gradient banner. */}
                <div className="marquee flex items-center justify-between gap-4">
                    <h2 className="text-d3 text-left">
                        {currentPoll.title ?? DEFAULT_TITLE}
                    </h2>
                    {!pollCompleted && (
                        <PollProgress current={index + 1} total={polls.length} />
                    )}
                </div>

                <div className="mt-8 flex flex-col items-center text-center">
                    {!pollCompleted ? (
                        <Poll
                            key={currentPoll.pollid}
                            pollData={currentPoll}
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
