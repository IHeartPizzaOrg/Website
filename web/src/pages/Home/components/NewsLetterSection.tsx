import GoForIt from "../../../assets/media/go_for_it.png";
import NewsletterForm from "../../../common/components/NewsletterForm.tsx";
import {useOutletContext} from "react-router";
import type {OutletContextData} from "../types/GameTypes.ts";
import {HighLight_ID} from "../../../constants/config.ts";

/**
 * The hero. Everything else on the site stays deliberately quiet so this can
 * be loud: the Go For It! title screen presented as an actual CRT sitting on a
 * red field, with the signup directly beneath it.
 */
export default function NewsLetterSection() {
    const { games, loading } = useOutletContext<OutletContextData>();
    const game = games.find((game) => game.id === HighLight_ID);
    if (loading) {
        return <></>
    }
    return (
        <section className="border-b-2 border-line">
            {/* Red field, behind the cabinet only — a real block rather than an
                absolute overlay, so text can never land on it. */}
            <div className="bg-red pt-10 pb-14 sm:pt-14 sm:pb-20">
                <div className="shell">
                    <div className="mx-auto max-w-md">
                        <div className="screen crt border-[3px] border-ink shadow-[10px_10px_0_0_var(--color-red-deep)]">
                            <img
                                src={GoForIt}
                                alt="Go For It! title screen"
                                width={640}
                                height={480}
                                className="pixel-img block w-full"
                            />
                        </div>
                    </div>

                    {/* Sits on the red field at every width. Previously it fell
                        below the field on desktop and inside it on mobile,
                        depending on where the band happened to end. */}
                    <h1 className="text-d1 mx-auto mt-10 max-w-3xl text-center text-white">
                        A retro game company with the best pizza?!
                    </h1>
                </div>
            </div>

            <div className="shell shell-mid py-12">
                <div className="text-center">
                    <p className="mx-auto max-w-prose text-base leading-relaxed">
                        We&apos;re deep into development on our 2D fighting game{" "}
                        <span className="text-red-bright">Go For It!</span> — with 31
                        more games lined up behind it.
                    </p>
                </div>

                <div className="panel mx-auto mt-10 max-w-xl p-6 sm:p-8">
                    <NewsletterForm
                        heading="Be first to know"
                        blurb="Sign up for development news, and to hear the moment pre-orders open."
                        tags={["go for it"]}
                        showNameField
                        align="start"
                    />
                </div>
            </div>
        </section>
    );
}
