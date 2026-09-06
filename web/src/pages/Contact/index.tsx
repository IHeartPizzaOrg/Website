import type { SubmitEvent } from "react";

export default function ContactPage() {
    const HandleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("handleSubmit");
    }

    return (
        <section className="w-3/4 lg:w-2/3 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mt-10">

                {/* Image */}
                <div className="h-full min-h-[500px]">
                    <img
                        src=""
                        alt="Contact us"
                        className="w-full h-90 object-cover rounded-lg border"
                    />
                </div>

                {/* Form */}
                <form className="space-y-5" onSubmit={(e)=>HandleSubmit(e)}>

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
                            className="py-3 px-4 block w-full bg-layer bg-black border border-layer-line rounded-lg sm:text-sm text-foreground placeholder:text-muted-foreground-1 focus:z-10 focus:border-primary-focus focus:ring-primary-focus resize-none"
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
        </section>
    );
}