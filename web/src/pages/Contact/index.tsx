import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import { contactApi } from "../../constants/axiosClient.ts";

interface ContactFormProps {
    HandleSubmit: (event: FormEvent<HTMLFormElement>) => void;
    failed: boolean;
    sending: boolean;
}

const ContactForm = ({ HandleSubmit, failed, sending }: ContactFormProps) => {
    return (
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
            {/* Was min-h-[500px] with no upper bound, so it dwarfed the form on
                tablets. Now it matches the form column and crops to a ratio. */}
            <div className="screen crt h-fit">
                <img
                    src="/media/values/a_moment.jpg"
                    alt="A scene from an I Heart Pizza game: two characters outside the pizza shop"
                    className="pixel-img block w-full"
                />
            </div>

            <form className="flex flex-col gap-5" onSubmit={HandleSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label className="label" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            autoComplete="name"
                            className="field"
                            placeholder="Your name"
                        />
                    </div>

                    <div>
                        <label className="label" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            autoComplete="email"
                            className="field"
                            placeholder="you@email.com"
                        />
                    </div>
                </div>

                <div>
                    <label className="label" htmlFor="subject">
                        Subject
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        className="field"
                        placeholder="What's this about?"
                    />
                </div>

                <div>
                    <label className="label" htmlFor="message">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows={8}
                        required
                        className="field resize-y"
                        placeholder="Tell us what's on your mind"
                    />
                </div>

                {failed && (
                    <p role="alert" className="text-sm text-red-bright">
                        The message didn&apos;t send. Check your email address and try
                        again.
                    </p>
                )}

                <div className="flex sm:justify-end">
                    <button
                        type="submit"
                        className="btn-arcade w-full sm:w-auto"
                        disabled={sending}
                    >
                        {sending ? "Sending" : "Send message"}
                    </button>
                </div>
            </form>
        </div>
    );
};

const Confirmation = ({ ResetForm }: { ResetForm: () => void }) => {
    return (
        <div className="mx-auto max-w-2xl text-center">
            <div className="screen crt">
                <img
                    src="/media/values/a_moment.jpg"
                    alt="A scene from an I Heart Pizza game: two characters outside the pizza shop"
                    className="pixel-img block w-full"
                />
            </div>

            <h2 className="text-d2 mt-8">Message sent</h2>
            <p className="caption mt-3">
                We read everything that comes in, and we&apos;ll get back to you.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link to="/games" className="btn-arcade">
                    Browse the games
                </Link>
                <button type="button" className="btn-ghost" onClick={ResetForm}>
                    Send another message
                </button>
            </div>
        </div>
    );
};

export default function ContactPage() {
    const [messageSent, setMessageSent] = useState(false);
    const [failed, setFailed] = useState(false);
    const [sending, setSending] = useState(false);

    const HandleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setSending(true);
        setFailed(false);

        try {
            await contactApi.post("/message", {
                email: formData.get("email"),
                name: formData.get("name"),
                read: false,
                replied: false,
                subject: formData.get("subject"),
                body: formData.get("message"),
            });
            setMessageSent(true);
        } catch (error) {
            console.error(error);
            setFailed(true);
        } finally {
            setSending(false);
        }
    };

    const ResetForm = () => {
        setMessageSent(false);
        setFailed(false);
    };

    return (
        <section className="shell shell-mid py-12">
            <h1 className="section-title">Contact us</h1>

            <div className="mt-10">
                {!messageSent ? (
                    <ContactForm
                        HandleSubmit={HandleSubmit}
                        failed={failed}
                        sending={sending}
                    />
                ) : (
                    <Confirmation ResetForm={ResetForm} />
                )}
            </div>
        </section>
    );
}
