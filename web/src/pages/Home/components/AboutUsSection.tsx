import MediaPlayer from "../../../common/components/MediaPlayer.tsx";
import React from "react";
import {Link} from "react-router";

export default function AboutUsSection() {
    return (
        <section className="w-full">
            <div className=" lg:w-4/6 justify-center content-center items-center mx-auto">
                <h1 className="text-4xl font-bold">About Us</h1>

                <div className="flex  gap-40 mb-5">
                    <img src="/john.png" alt="Picture of John Springer founder of I Heart Pizza"
                         className="
                    inline-flex justify-center items-center size-100 text-foreground
                    rounded-lg object-cover mt-5
                    "/>

                    <span className="flex flex-col">
                        <h2 className="text-yellow-500 font-bold text-xl mb-5">Meet John</h2>
                        <p className="text-[11px] font-light text-justify">
                            Hi! I’m John, the owner and founder of i heart pizza.
                            <br/><br/>
                            My whole life, I’ve never fit in. Nobody came to my 3rd grade birthday party, but my mom and dad gifted me a Sega Master System.
                            <br/><br/>
                            It changed my life.
                            <br/><br/>
                            Years later, I was diagnosed with stage 4b cancer. I promised if I survived, I’d give my dream of opening a cozy little pizza place & retro game company everything I have.
                            <br/><br/>
                            I’ve worked for the last 18 years to bring that dream to life. It’s just pizza and games, but it’s my way of bringing people together to create happy memories.
                            <br/><br/>

                        </p>
                        <span className="flex mt-5">
                            <Link to={`/about`}
                                  className=" inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border
                                border-transparent text-yellow-500 hover:bg-primary-100 hover:text-yellow-500/80 focus:outline-hidden
                                focus:bg-primary-100 focus:text-primary-800  disabled:opacity-50 disabled:pointer-events-none
                                dark:text-primary-500 dark:hover:bg-primary-500/20 dark:hover:text-primary-400
                                dark:focus:bg-primary-800/30 dark:focus:text-primary-400
                                mt-2  mb-5
                                ">
                                Read My Story
                            </Link>
                            <Link to={`/values`}
                                  className=" inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border
                                border-transparent text-yellow-500 hover:bg-primary-100 hover:text-yellow-500/80 focus:outline-hidden
                                focus:bg-primary-100 focus:text-primary-800  disabled:opacity-50 disabled:pointer-events-none
                                dark:text-primary-500 dark:hover:bg-primary-500/20 dark:hover:text-primary-400
                                dark:focus:bg-primary-800/30 dark:focus:text-primary-400
                                mt-2 mx-auto mb-5
                                ">
                                Learn About Our Values
                            </Link>
                        </span>
                    </span>

                </div>
            </div>
        </section>
    )
}
