import { Link } from "react-router";

export default function LegalPage() {
    return (
        <section className="shell shell-narrow py-16">
            <h1 className="section-title">Legal &amp; data disclosure</h1>
            <p className="caption mt-4">Last updated September 21, 2026</p>

            <div className="prose-retro mt-8">
                <p>
                    I Heart Pizza LLC collects only what it needs to run its
                    newsletter: your name and email address. We don&apos;t collect,
                    store, or sell anything beyond that.
                </p>

                <h2 className="text-d3 mt-8 text-red-bright">Subscribing</h2>
                <p>
                    When you sign up, we store your name and email so we can send
                    you updates about our games and our pizza shop in Fort Wayne,
                    Indiana. That&apos;s the only reason we keep it, and it&apos;s
                    the only information we keep.
                </p>

                <h2 className="text-d3 mt-8 text-red-bright">Unsubscribing</h2>
                <p>
                    Requesting to be removed marks your record as unsubscribed and
                    deletes it from our active database right away. You will not
                    receive any further newsletter emails once this happens.
                </p>

                <h2 className="text-d3 mt-8 text-red-bright">
                    Backups &amp; data retention
                </h2>
                <p>
                    Storing your data is not the same thing as being subscribed.
                    Deleting your record from the active database doesn&apos;t erase
                    it from our routine backups instantly &mdash; we keep those for
                    up to 30 days for reliability. Your information may exist in a
                    backup for up to 30 days after you unsubscribe, after which it
                    is permanently cleared.
                </p>

                <h2 className="text-d3 mt-8 text-red-bright">Questions</h2>
                <p>
                    If you have any questions about how your data is handled, reach
                    out through our{" "}
                    <Link to="/contact" className="link-arcade">
                        contact page
                    </Link>
                    .
                </p>
            </div>
        </section>
    );
}
