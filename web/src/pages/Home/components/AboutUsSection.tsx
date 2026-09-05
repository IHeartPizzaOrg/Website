import MediaPlayer from "../../../common/components/MediaPlayer.tsx";
import React from "react";
import {Link} from "react-router";

export default function AboutUsSection() {
    return (
        <section className="w-full">
            <div className=" lg:w-4/6 justify-center content-center items-center mx-auto">
                <h1 className="text-4xl font-bold">About Us</h1>

                <div className="flex  gap-40 mb-5">
                    <img src="/john.png" alt="Picture of John Springer founder of I Heart Pizza" className="
                    inline-flex justify-center items-center size-85 text-foreground
                    rounded-3xl object-cover mt-5
                    "/>

                    <span className="flex flex-col">
                        <h2 className="text-yellow-500 font-bold text-xl mb-5">Meet John</h2>
                        <p className="text-[11px] font-light text-justify">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            <br/> <br/>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                            in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                            sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                            laborum.
                        </p>
                        <span className="flex mt-5">
                            <Link to={`/game/${"djsjs"}`}
                                  className=" inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border
                                border-transparent text-yellow-500 hover:bg-primary-100 hover:text-yellow-500/80 focus:outline-hidden
                                focus:bg-primary-100 focus:text-primary-800  disabled:opacity-50 disabled:pointer-events-none
                                dark:text-primary-500 dark:hover:bg-primary-500/20 dark:hover:text-primary-400
                                dark:focus:bg-primary-800/30 dark:focus:text-primary-400
                                mt-2  mb-5
                                ">
                                Read My Story
                            </Link>
                            <Link to={`/game/${"djsjs"}`}
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
