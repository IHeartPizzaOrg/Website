import NewsLetterSection from "./components/NewsLetterSection.tsx";
import PollSection from "./components/PollSection.tsx";
import GameHighLight from "./components/GameHighLight.tsx";
import FeaturedGames from "./components/FeaturedGames.tsx";
import AboutUsSection from "./components/AboutUsSection.tsx";


export default function HomePage(){


    return (
        <section className=" justify-center  ">
            <NewsLetterSection />
            <GameHighLight/>
            <PollSection />
            <FeaturedGames/>
            <AboutUsSection/>
        </section>
    )
}