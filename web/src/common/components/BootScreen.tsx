import { useEffect, useState } from "react";

/** Drawn from the company's own copy, so the wait tells you something real. */
const tips = [
    "32 proprietary Sega Genesis games",
    "Built for authentic Mega Drive hardware",
    "Fort Wayne, Indiana, since 2008",
    "18 games made with artists worldwide",
    "14 lost '90s games, rescued",
    "Over 700 characters in the pizzaverse",
];

const SEGMENTS = 20;
const TIP_MS = 2200;

/**
 * The only sprites in the library with real transparency are this one and the
 * Wallop punch frame; running.gif, run gif.gif and GH-walk1.png all have their
 * backgrounds baked in (purple, black and magenta chroma-key respectively), so
 * they composite as coloured boxes. This one is static, so the hop comes from
 * CSS - which also means prefers-reduced-motion is handled by the global rule
 * rather than a media query in here.
 */
const SPRITE = "/media/ihp%20Sprites/walk_3.png";

export default function BootScreen({ percent }: { percent: number }) {
    const [tipIndex, setTipIndex] = useState(() =>
        Math.floor(Math.random() * tips.length),
    );

    // Only matters on a slow connection, which is exactly when it earns its
    // place.
    useEffect(() => {
        const id = setInterval(
            () => setTipIndex((current) => (current + 1) % tips.length),
            TIP_MS,
        );
        return () => clearInterval(id);
    }, []);

    const filled = Math.round((percent / 100) * SEGMENTS);

    return (
        <div
            className="boot"
            role="status"
            aria-live="polite"
            aria-label={`Loading, ${percent} percent`}
        >
            <div className="boot__inner crt">
                <img
                    src="/ihp_logo.png"
                    alt="I Heart Pizza"
                    className="pixel-img boot__logo"
                />

                <div className="boot__track">
                    {/* Wrapper owns the horizontal position so the hop can own
                        transform without the two fighting. */}
                    <span className="boot__sprite" style={{ left: `${percent}%` }}>
                        <img
                            src={SPRITE}
                            alt=""
                            aria-hidden="true"
                            className="pixel-img boot__sprite-img"
                        />
                    </span>
                </div>

                <div className="boot__bar" aria-hidden="true">
                    {Array.from({ length: SEGMENTS }, (_, index) => (
                        <span
                            key={index}
                            className={
                                index < filled ? "boot__seg boot__seg--on" : "boot__seg"
                            }
                        />
                    ))}
                </div>

                <div className="boot__status">
                    <span>Now loading</span>
                    <span>{percent}%</span>
                </div>

                <p className="boot__tip">{tips[tipIndex]}</p>

                <p className="boot__skip">Press any key to skip</p>
            </div>
        </div>
    );
}
