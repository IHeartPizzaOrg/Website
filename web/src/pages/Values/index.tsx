import MediaPlayer from "../../common/components/MediaPlayer.tsx";


export default function ValuesPage(){


    return (
        <section id="values" className="w-5/9 mx-auto values">
            <h1>Our Mission & Value</h1>

            <p >
                There’s something magical about getting together with friends; sharing a pizza; and playing video games. That’s the inspiration for our company, i heart pizza LLC.
                <br/><br/>
                Our humble little retro video game company makes and rescues authentic 16-bit games. All 32 of our proprietary games are developed for use with authentic Sega Genesis and Mega Drive hardware. They are also playable on modern platforms via emulation.
                <br/><br/>
                But there’s more. We’re also opening a cozy little pizza place where people can play our games. Located in Fort Wayne, Indiana, our goal is to bring people together, and to create happy memories. Friends, families, and individuals will be able to enjoy classic cozy couch retro gaming with restaurant quality pizza and a wholly unique curated experience.
                <br/><br/>
                Founded in 2008 during chemotherapy and radiation treatments for stage 4b cancer, i heart pizza is the vision of owner John Springer. It’s his life’s work, and is the positive change he believes our community needs.
            </p>

            <div className="flex gap-2 justify-center">
               <div className="values-display">
                   <MediaPlayer link="/media/values/recovery.jpg"
                                title="Picture of John (Founder) during cancer recovery" type="image"
                                style="justify-center items-center size-60 mx-auto   border  text-foreground
                                mt-10"
                   />
               </div>
                <div className="values-display">
                    <MediaPlayer link="/media/values/drawing.jpg"
                                 title="The drawing that inspired i heart pizza. Doodle by John's wife Alia while he was undergoing chemotherapy" type="image"
                                 style="justify-center items-center size-60 mx-auto   border  text-foreground
                                mt-10"
                    />
                </div>
            </div>
            <p>
                In 2012, i heart pizza completed its first homemade Sega Genesis game. Summit City Showdown features our hometown of Fort Wayne, and includes a lot of local references and charm. While the project remains unreleased, it opened up doors beyond our wildest imagination.
            </p>
            <div className="flex gap-2 justify-center">
                <div className="values-display">
                    <MediaPlayer link="/media/values/FortWayneandSummitCityShowdownprototypecartridge.jpg"
                                 title="Picture of Fort Wayne and Summit City Showdown prototype cartridge" type="image"
                                 style="justify-center items-center size-60 w-80 mx-auto     text-foreground
                                mt-10"
                    />
                </div>

            </div>
            <p>
                In 2018, we purchased a building for our future pizza place. It is a house zoned for commercial retail use, with an acre of land; a parking lot for 15 cars; and 7 rooms. Each room will be set up with classic retro video game consoles. Friends and families will be able to enjoy restaurant-quality pizza and classic cozy retro video gaming in their own private space.
            </p>

            <div className="flex gap-2 justify-center">
                <div className="values-display">
                    <MediaPlayer link="/media/values/house.mp4"
                                 title="Picture of Fort Wayne and Summit City Showdown prototype cartridge"
                                 type="video"
                                 style="justify-center items-center h-45 w-150 mx-auto   text-foreground
                                mt-10"
                    />
                </div>

            </div>
            <p>
                At present, i heart pizza owns the rights to 32 proprietary Sega Genesis games. We made 18 of these games with the help of artists, developers, and composers from around the world. Our other 14 games are titles from the ‘90s that never saw a wide release. We’ve rescued these games and characters that time forgot; incorporated them into our localized game projects and marketing; and are giving them an “extra life” at our pizza place and beyond.
            </p>

            <div className="flex gap-2 justify-center">
                <div className="values-display">
                    <MediaPlayer link="/media/values/scrennsot1_goforit.png"
                                 title="Screenshot taken from go for it "
                                 type="image"
                                 style="justify-center items-center h-45 w-150 mx-auto   text-foreground
                                mt-10"
                    />
                </div>

                <div className="values-display">
                    <MediaPlayer link="/media/values/WallopScreenshot.png"
                                 title="Screenshot taken from Wallop The Wallaby"
                                 type="image"
                                 style="justify-center items-center h-45 w-150 mx-auto   text-foreground
                                mt-10"
                    />
                </div>

            </div>
            <p>
                There are over 700 unique characters in the i heart pizza “pizzaverse.” In addition to game development, we make high quality 2D animated cartoons; figurines; and all sorts of merchandise.

            </p>


            <div className="flex gap-2 justify-center">
                <div className="values-display">
                    <MediaPlayer link="/media/ihp Sprites/06a - Wallop punch.png"
                                 title="Picture of Fort Wayne and Summit City Showdown prototype cartridge"
                                 type="image"
                                 style="justify-center items-center size-20 mx-auto   text-foreground
                                mt-10"
                                 showCaption={false}
                    />
                </div>
                <div className="values-display">
                    <MediaPlayer link="/media/ihp Sprites/walk_3.png"
                                 title="Picture of Fort Wayne and Summit City Showdown prototype cartridge"
                                 type="image"
                                 style="justify-center items-center size-20 mx-auto  bg-cover text-foreground
                                mt-10"
                                 showCaption={false}
                    />
                </div>
                <div className="values-display">
                    <MediaPlayer link="/media/ihp Sprites/Yelloween anim0000.png"
                                 title="Picture of Fort Wayne and Summit City Showdown prototype cartridge"
                                 type="image"
                                 style="justify-center items-center size-20 mx-auto   text-foreground
                                mt-10"
                                 showCaption={false}
                    />
                </div>
                <div className="values-display">
                    <MediaPlayer link="/media/ihp Sprites/run gif.gif"
                                 title="Picture of Fort Wayne and Summit City Showdown prototype cartridge"
                                 type="image"
                                 style="justify-center items-center size-20 mx-auto   text-foreground
                                mt-10"
                                 showCaption={false}
                    />
                </div>

            </div>
            <p>
                I heart pizza is not yet open for business. We planned to open in Fall 2020; however, the pandemic prevented us from doing so. We’re planning to launch our pizza place in coordination with the release of some of our games.
            <br/> <br/>
                <a href="https://inputfortwayne.com/Fort-Wayne-video-game/"
                className="text-red-500/80 underline font-light justify-center text-center mx-auto"
                > Read the 2019 interview with John by input Fort Wayne</a>
            </p>


            <p>
                We intend to launch a YouTube channel soon, where we tell our story, and create genuinely wholesome, joyful content. We’ll also be livestreaming our proprietary games from our cozy little pizza place. While we hope to earn a living, this isn’t about money. It’s a calling - something that John feels he has to do.
            </p>


            <div className="flex gap-2 justify-center">
                <div className="values-display">
                    <MediaPlayer link="https://www.youtube.com/embed/iRNASXOyS7w?si=6vooWY5a5eA3h0QQ"
                                 title="Trailer for Go For it"
                                 type="youtube"
                                 style="justify-center items-center h-60 w-100   text-foreground
                                mt-10"
                    />
                </div>

            </div>
            <p>
                Some of our family-friendly collection of games are designed for use exclusively at our pizza place. When you walk in our doors, our goal is to make you wonder how our place can actually exist.
                <br/> <br/>
                To that end, we’ve developed a tool where we take photos of real-life pizza, and turn it into a Sega Genesis game right before your eyes. We’ve developed a collection of bite-sized mini games that allow you to win discounts and prizes. We’re creating a fun and interactive game database designed to help you find your ideal game. We’re developing a method for customers to order food via a Sega Genesis game. And more!

            </p>



            <div className="flex gap-2 justify-center">
                <div className="values-display">
                    <MediaPlayer link="/media/values/vlcsnap-2026-08-31-00h19m37s543.png"
                                 title="screenshots of pizzeria exclusive games "
                                 type="image"
                                 style="justify-center items-center h-45 w-150 mx-auto   text-foreground
                                mt-10"
                    />
                </div>
                <div className="values-display">
                    <MediaPlayer link="/media/values/pixel pizza.png"
                                 title="screenshots of pizzeria exclusive games "
                                 type="image"
                                 style="justify-center items-center h-45 w-150 mx-auto   text-foreground
                                mt-10"
                    />
                </div>
                <div className="values-display">
                    <MediaPlayer link="/media/values/Goofy Game-O-Rama000.png"
                                 title="screenshots of pizzeria exclusive games "
                                 type="image"
                                 style="justify-center items-center h-45 w-150 mx-auto   text-foreground
                                mt-10"
                    />
                </div>

            </div>
            <p>
                While it says pizza and games on the marquee, the goal of i heart pizza is to bring people together, and create happy memories. With over 17 years’ of work, we are humbled and confident that our little company is positioned to bring people together for a very long time.
            </p>




            <div className="flex gap-2 justify-center">
                <div className="values-display">
                    <MediaPlayer link="/media/values/alia_john_genesis_snes_correct.png"
                                 title="Picture of Fort Wayne and Summit City Showdown prototype cartridge"
                                 type="image"
                                 style="justify-center items-center h-45 w-150 mx-auto   text-foreground
                                mt-10"
                    />
                </div>
                <div className="values-display">
                    <MediaPlayer link="/media/values/john paper route.png"
                                 title="Picture of Fort Wayne and Summit City Showdown prototype cartridge"
                                 type="image"
                                 style="justify-center items-center h-45 w-150 mx-auto   text-foreground
                                mt-10"
                    />
                </div>
                <div className="values-display">
                    <MediaPlayer link="/media/values/IHPbuildingwithMegaDrive.jpg"
                                 title="Picture of Fort Wayne and Summit City Showdown prototype cartridge"
                                 type="image"
                                 style="justify-center items-center h-45 w-55 mx-auto   text-foreground
                                mt-10"
                    />
                </div>

            </div>




        </section>
    )
}