import { Link } from "react-router";
import MediaRow from "../../common/components/MediaRow.tsx";

export default function AboutPage() {
    return (
        <article className="shell shell-narrow py-12">
            <h1 className="section-title">About us</h1>

            <MediaRow
                items={[
                    {
                        link: "/media/values/alia_john_genesis_snes_correct.png",
                        title: "Alia & John",
                        type: "image",
                    },
                    {
                        link: "/media/values/ihpname.jpg",
                        title: "John & Alia",
                        type: "image",
                    },
                ]}
            />

            <div className="prose-retro">
                <p>
                    Back in 2008, I was diagnosed with stage 4b cancer. When my doctor
                    called with the news, he explained that the cancer was either
                    imminently treatable, or that I may only have a few months — and that
                    they wouldn&apos;t know my fate for 10 days. I made a promise that if
                    I survived, I&apos;d do my very best to realize my dream of opening a
                    retro game-themed pizza place in my hometown of Fort Wayne, Indiana.
                </p>
                <p>
                    That dream kept me going through chemotherapy and radiation. Early
                    on, I realized that our pizza place needed something special and
                    truly unique. When my mom suggested that I make my own, authentic
                    retro game that I dreamed about when I was a kid, the idea stuck.
                    Somehow, some way, against all odds and with lots of help, I managed
                    to create a brand new, 100% authentic 16-bit game about Fort Wayne,
                    Indiana for use with Sega Genesis and Mega Drive hardware.
                </p>
                <p>
                    That project opened up doors beyond my wildest dreams. As surreal as
                    it sounds (and is), my little company somehow owns the rights to 32
                    proprietary Sega Genesis games. About half of them are homemade. The
                    others are obscure games that were developed for the console back in
                    the &apos;90s. We&apos;re not wealthy, but we were able to acquire
                    the intellectual property of these games and characters that time
                    forgot, give them an &ldquo;extra life,&rdquo; and make something new
                    with something old into something local.
                </p>
                <p>
                    Back in November 2018, my beautiful wife, Alia, and I purchased a
                    property for our pizza place. It&apos;s a house that&apos;s zoned for
                    commercial retail use. The property has 7 bedrooms, which we intend
                    to rent out individually. Friends and families will be able to have
                    their own private space in our cozy little house, and enjoy classic
                    couch gaming, restaurant quality pizza, and 17 years&apos; worth of
                    meticulous planning to curate a truly magical experience. We sell
                    pizza and games, but our mission — and our business — is to bring
                    people together, and to create happy memories.
                </p>
                <p>
                    We were ramping up to open in 2020, and then the pandemic happened.
                    It decimated us, personally and financially. It&apos;s taken us years
                    to recover.
                </p>
                <p>
                    As crazy as it sounds (and is), we&apos;ve been quietly working on
                    this pizza and retro game dream since 2008. We haven&apos;t opened
                    for business, and we haven&apos;t released any of our games or
                    products. We had opportunities to launch our games — particularly
                    during the pandemic — but we made the painful decision to hold off in
                    hopes of preserving what keeps our company special. There are a
                    billion pizza places. There are a million video game companies.
                    There&apos;s one place on earth that makes pizza and authentic 16-bit
                    games for use with Sega Genesis and Mega Drive consoles.
                </p>
                <p>
                    That strategy has allowed us to refine my vision and focus in ways we
                    never initially imagined. We know what our company is — and what it
                    isn&apos;t. We&apos;ve taken a long time to build something unique
                    and fun with little capital that&apos;s built to last. And after all
                    these years, we&apos;re finally ready to take the next step.
                </p>
                <p>
                    Last Fall, a filmmaker who works with Netflix reached out to me via
                    Instagram. He let me know that he&apos;s making a film about classic
                    retro games, and what they mean in this day and age. When he invited
                    me to be in the film, I let him know that we&apos;re not open yet,
                    but he wanted to tell our story anyway. Our segment was planned to be
                    6 minutes long — but I&apos;ve received word that&apos;s now the last
                    22 minutes of the film. What a blessing!
                </p>
                <p>
                    We never thought that going to a friend&apos;s house for pizza and
                    games could become a business plan. We never realized pizza and games
                    could be so complicated. With humility and endless gratitude,
                    we&apos;re doing our best to fulfill that promise, and to be the
                    change we feel our community needs. When folks walk into our doors,
                    it&apos;s our hope that they&apos;ll wonder how this can possibly
                    exist — and that they&apos;ll (re)discover the joys of being
                    together.
                </p>
            </div>

            <div className="mt-12 flex flex-wrap gap-4 border-t-2 border-line pt-8">
                <Link to="/values" className="btn-arcade">
                    Read our values
                </Link>
                <Link to="/games" className="btn-ghost">
                    See the games
                </Link>
            </div>
        </article>
    );
}
