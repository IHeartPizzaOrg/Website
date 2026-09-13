import { Link } from "react-router";

export default function AboutUsSection() {
  return (
    <section className="border-t-2 border-line py-14">
      <div className="shell shell-mid">
        <h2 className="section-title">Meet John</h2>

        {/* Was flex with gap-40 and a fixed size-100 portrait, which
                    forced a horizontal scrollbar on anything under ~1100px. */}
        <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-12">
          <div className="screen h-fit">
            <img
              src="/john.png"
              alt="John Springer, founder of I Heart Pizza"
              className="aspect-square w-full object-cover"
            />
          </div>

          <div className="prose-retro">
            <p>Hi! I&apos;m John, the owner and founder of I Heart Pizza.</p>
            <p>
              My whole life, I&apos;ve never fit in. Nobody came to my 3rd grade
              birthday party, but my mom and dad gifted me a Sega Master System.
            </p>
            <p>It changed my life.</p>
            <p>
              Years later, I was diagnosed with stage 4b cancer. I promised that
              if I survived, I&apos;d give my dream of opening a cozy little
              pizza place and retro game company everything I have.
            </p>
            <p>
              I&apos;ve worked for the last 18 years to bring that dream to
              life. It&apos;s just pizza and games, but it&apos;s my way of
              bringing people together to create happy memories.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/about" className="btn-arcade text-white">
                Read my story
              </Link>
              <Link to="/values" className="btn-ghost">
                Our values
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
