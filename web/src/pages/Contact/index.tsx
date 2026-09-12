import {type SubmitEvent, useState} from "react";
import {contactApi} from "../../constants/axiosClient.ts";
import {useNavigate} from "react-router";

const ContactForm = ({HandleSubmit}) =>{

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mt-10">

            {/* Image */}
            <div className="h-full min-h-[500px]">
                <img
                    src="/media/values/a_moment.jpg"
                    alt="Contact us"
                    className="w-full object-cover rounded-lg mt-5"
                />
            </div>

            {/* Form */}
            <form className="space-y-2" onSubmit={(e)=>HandleSubmit(e)}>

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    {/* Name */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm text-foreground font-medium"
                        >
                            Name
                        </label>

                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="py-2.5 sm:py-3 px-4 block w-full bg-layer bg-black border border-layer-line rounded-lg sm:text-sm text-foreground placeholder:text-muted-foreground-1 focus:z-10 focus:border-primary-focus focus:ring-primary-focus"
                            placeholder="John Doe"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm text-foreground font-medium"
                        >
                            Email address
                        </label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="py-2.5 sm:py-3 px-4 block w-full bg-layer bg-black border border-layer-line rounded-lg sm:text-sm text-foreground placeholder:text-muted-foreground-1 focus:z-10 focus:border-primary-focus focus:ring-primary-focus"
                            placeholder="you@site.com"
                        />
                    </div>

                </div>
                <div>
                    <div>
                        <label
                            htmlFor="subject"
                            className="block mb-2 text-sm text-foreground font-medium"
                        >
                            Subject
                        </label>

                        <input
                            type="subject"
                            id="subject"
                            name="subject"
                            className="py-2.5 sm:py-3 px-4 block w-full bg-layer bg-black border border-layer-line rounded-lg sm:text-sm text-foreground placeholder:text-muted-foreground-1 focus:z-10 focus:border-primary-focus focus:ring-primary-focus"
                            placeholder="Say something"
                        />
                    </div>
                </div>
                {/* Message */}
                <div>
                    <label
                        htmlFor="message"
                        className="block mb-2 text-sm text-foreground font-medium"
                    >
                        Message
                    </label>

                    <textarea
                        id="message"
                        name="message"
                        rows={10}
                        className="py-3 px-4 block w-full h-45 bg-layer bg-black border border-layer-line
                        rounded-lg sm:text-sm text-foreground placeholder:text-muted-foreground-1
                        focus:z-10 focus:border-primary-focus focus:ring-primary-focus resize-none"
                        placeholder="How can we help?"
                    />
                </div>

                {/* Submit */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="py-3 px-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-primary-foreground hover:opacity-90"

                    >
                        Send Message
                    </button>
                </div>

            </form>
        </div>
    )
}
const Confirmation = ({ResetForm}) =>{

    const navigate = useNavigate()



    return (
        <div className="flex flex-col gap-3 text-center mt-10">
            {/* Image */}
            <div className="">
                <img
                    src="/media/values/a_moment.jpg"
                    alt="Contact us"
                    className="w-190 h-100 object-cover rounded-lg mx-auto"
                />
            </div>
            <div className="flex flex-col gap-2">
                <h1 className="text-red-500/80 font-bold text-xl ">Thanks for your Message!</h1>

                <div className="flex gap-5 mx-auto">
                    <button
                        className="py-3 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border
                    border-transparent text-blue-600 hover:bg-primary-100 hover:text-blue-600/80 focus:outline-hidden
                    focus:bg-primary-100 focus:text-primary-800  disabled:opacity-50 disabled:pointer-events-none
                    dark:text-primary-500 dark:hover:bg-primary-500/20 dark:hover:text-primary-400
                    dark:focus:bg-primary-800/30 dark:focus:text-primary-400

                    "
                        onClick={()=> navigate("/")}>Go to games</button>
                    <button
                        className="py-3 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border
                    border-transparent text-blue-600 hover:bg-primary-100 hover:text-blue-600/80 focus:outline-hidden
                    focus:bg-primary-100 focus:text-primary-800  disabled:opacity-50 disabled:pointer-events-none
                    dark:text-primary-500 dark:hover:bg-primary-500/20 dark:hover:text-primary-400
                    dark:focus:bg-primary-800/30 dark:focus:text-primary-400

                    "
                        onClick={ResetForm}>Send another Message</button>
                </div>
            </div>
        </div>
    )
}

export default function ContactPage() {
    const [messageSent, setMessageSent] = useState(false);
    const [error, setError] = useState<unknown>(null);
    const HandleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            email: formData.get("email"),
            name: formData.get("name"),
            read: false,
            replied: false,
            subject: formData.get("subject"),
            body: formData.get("message"),
        }
        try {
            await contactApi.post("/message", data)
            setMessageSent(true);
        } catch (err) {
            setMessageSent(false);
            setError(err);
        }


    }

    const ResetForm = () => {
        setMessageSent(false);
    }



    return (
        <section className="w-3/4 lg:w-2/3 mx-auto">
            {!messageSent ? <ContactForm HandleSubmit={HandleSubmit} /> : <Confirmation ResetForm={ResetForm} />}
        </section>
    );
}