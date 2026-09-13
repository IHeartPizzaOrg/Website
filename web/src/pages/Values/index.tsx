import MediaRow from "../../common/components/MediaRow.tsx";

export default function ValuesPage() {
    return (
        <article className="shell shell-narrow py-12">
            <h1 className="section-title">Our mission and values</h1>

            <div className="prose-retro mt-8">
                <p>
                    There&apos;s something magical about getting together with friends,
                    sharing a pizza, and playing video games. That&apos;s the
                    inspiration for our company, i heart pizza LLC.
                </p>
                <p>
                    Our humble little retro video game company makes and rescues
                    authentic 16-bit games. All 32 of our proprietary games are
                    developed for use with authentic Sega Genesis and Mega Drive
                    hardware. They are also playable on modern platforms via emulation.
                </p>
                <p>
                    But there&apos;s more. We&apos;re also opening a cozy little pizza
                    place where people can play our games. Located in Fort Wayne,
                    Indiana, our goal is to bring people together, and to create happy
                    memories. Friends, families, and individuals will be able to enjoy
                    classic cozy couch retro gaming with restaurant quality pizza and a
                    wholly unique curated experience.
                </p>
                <p>
                    Founded in 2008 during chemotherapy and radiation treatments for
                    stage 4b cancer, i heart pizza is the vision of owner John Springer.
                    It&apos;s his life&apos;s work, and is the positive change he
                    believes our community needs.
                </p>
            </div>

            <MediaRow
                items={[
                    {
                        link: "/media/values/recovery.jpg",
                        title: "John during cancer recovery, 2008",
                        type: "image",
                        ratio: "square",
                    },
                    {
                        link: "/media/values/drawing.jpg",
                        title: "The doodle by John's wife Alia, drawn during chemotherapy, that inspired i heart pizza",
                        type: "image",
                        ratio: "square",
                    },
                ]}
            />

            <div className="prose-retro">
                <p>
                    In 2012, i heart pizza completed its first homemade Sega Genesis
                    game. Summit City Showdown features our hometown of Fort Wayne, and
                    includes a lot of local references and charm. While the project
                    remains unreleased, it opened up doors beyond our wildest
                    imagination.
                </p>
            </div>

            <MediaRow
                items={[
                    {
                        link: "/media/values/FortWayneandSummitCityShowdownprototypecartridge.jpg",
                        title: "The Summit City Showdown prototype cartridge",
                        type: "image",
                    },
                ]}
            />

            <div className="prose-retro">
                <p>
                    In 2018, we purchased a building for our future pizza place. It is a
                    house zoned for commercial retail use, with an acre of land, a
                    parking lot for 15 cars, and 7 rooms. Each room will be set up with
                    classic retro video game consoles. Friends and families will be able
                    to enjoy restaurant-quality pizza and classic cozy retro video
                    gaming in their own private space.
                </p>
            </div>

            <MediaRow
                items={[
                    {
                        link: "https://media.iheartpizza.biz/static/house.mp4",
                        title: "A walkthrough of the building that will become our pizza place",
                        type: "video",
                    },
                ]}
            />

            <div className="prose-retro">
                <p>
                    At present, i heart pizza owns the rights to 32 proprietary Sega
                    Genesis games. We made 18 of these games with the help of artists,
                    developers, and composers from around the world. Our other 14 games
                    are titles from the &apos;90s that never saw a wide release.
                    We&apos;ve rescued these games and characters that time forgot,
                    incorporated them into our localized game projects and marketing,
                    and are giving them an &ldquo;extra life&rdquo; at our pizza place
                    and beyond.
                </p>
            </div>

            <MediaRow
                items={[
                    {
                        link: "/media/values/scrennsot1_goforit.png",
                        title: "A screenshot from Go For It!",
                        type: "image",
                        pixel: true,
                        scanlines: true,
                    },
                    {
                        link: "/media/values/WallopScreenshot.png",
                        title: "A screenshot from Wallop the Wallaby",
                        type: "image",
                        pixel: true,
                        scanlines: true,
                    },
                ]}
            />

            <div className="prose-retro">
                <p>
                    There are over 700 unique characters in the i heart pizza
                    &ldquo;pizzaverse.&rdquo; In addition to game development, we make
                    high quality 2D animated cartoons, figurines, and all sorts of
                    merchandise.
                </p>
            </div>

            <MediaRow
                items={[
                    {
                        link: "/media/ihp Sprites/06a - Wallop punch.png",
                        title: "Wallop the Wallaby",
                        type: "image",
                        pixel: true,
                        small: true,
                        hideCaption: true,
                    },
                    {
                        link: "/media/ihp Sprites/walk_3.png",
                        title: "Walk cycle sprite",
                        type: "image",
                        pixel: true,
                        small: true,
                        hideCaption: true,
                    },
                    {
                        link: "/media/ihp Sprites/Yelloween anim0000.png",
                        title: "Yelloween",
                        type: "image",
                        pixel: true,
                        small: true,
                        hideCaption: true,
                    },
                    {
                        link: "/media/ihp Sprites/run gif.gif",
                        title: "Run cycle animation",
                        type: "image",
                        pixel: true,
                        small: true,
                        hideCaption: true,
                    },
                ]}
            />

            <div className="prose-retro">
                <p>
                    I heart pizza is not yet open for business. We planned to open in
                    Fall 2020; however, the pandemic prevented us from doing so.
                    We&apos;re planning to launch our pizza place in coordination with
                    the release of some of our games.
                </p>
                <p>
                    <a
                        href="https://inputfortwayne.com/Fort-Wayne-video-game/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Read the 2019 interview with John by Input Fort Wayne
                    </a>
                </p>
                <p>
                    We intend to launch a YouTube channel soon, where we tell our story,
                    and create genuinely wholesome, joyful content. We&apos;ll also be
                    livestreaming our proprietary games from our cozy little pizza
                    place. While we hope to earn a living, this isn&apos;t about money.
                    It&apos;s a calling — something that John feels he has to do.
                </p>
            </div>

            <MediaRow
                items={[
                    {
                        link: "https://www.youtube.com/embed/iRNASXOyS7w?si=6vooWY5a5eA3h0QQ",
                        title: "The trailer for Go For It!",
                        type: "youtube",
                    },
                ]}
            />

            <div className="prose-retro">
                <p>
                    Some of our family-friendly collection of games are designed for use
                    exclusively at our pizza place. When you walk in our doors, our goal
                    is to make you wonder how our place can actually exist.
                </p>
                <p>
                    To that end, we&apos;ve developed a tool where we take photos of
                    real-life pizza, and turn it into a Sega Genesis game right before
                    your eyes. We&apos;ve developed a collection of bite-sized mini
                    games that allow you to win discounts and prizes. We&apos;re
                    creating a fun and interactive game database designed to help you
                    find your ideal game. We&apos;re developing a method for customers
                    to order food via a Sega Genesis game. And more!
                </p>
            </div>

            <MediaRow
                items={[
                    {
                        link: "/media/values/vlcsnap-2026-08-31-00h19m37s543.png",
                        title: "A pizzeria-exclusive game in play",
                        type: "image",
                        pixel: true,
                        scanlines: true,
                    },
                    {
                        link: "/media/values/pixel pizza.png",
                        title: "A real pizza turned into Sega Genesis pixel art",
                        type: "image",
                        pixel: true,
                        scanlines: true,
                    },
                    {
                        link: "/media/values/Goofy Game-O-Rama000.png",
                        title: "Goofy Game-O-Rama",
                        type: "image",
                        pixel: true,
                        scanlines: true,
                    },
                ]}
            />

            <div className="prose-retro">
                <p>
                    While it says pizza and games on the marquee, the goal of i heart
                    pizza is to bring people together, and create happy memories. With
                    over 17 years of work, we are humbled and confident that our little
                    company is positioned to bring people together for a very long time.
                </p>
            </div>

            <MediaRow
                items={[
                    {
                        link: "/media/values/alia_john_genesis_snes_correct.png",
                        title: "Alia and John with a Genesis and a SNES",
                        type: "image",
                    },
                    {
                        link: "/media/values/john paper route.png",
                        title: "John on his childhood paper route",
                        type: "image",
                    },
                    {
                        link: "/media/values/IHPbuildingwithMegaDrive.jpg",
                        title: "The i heart pizza building, with a Mega Drive",
                        type: "image",
                    },
                ]}
            />
        </article>
    );
}
