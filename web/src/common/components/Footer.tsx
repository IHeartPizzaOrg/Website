import GoForIt from "../../assets/media/go_for_it.png";
import React, {useState} from "react";
import {contactApi} from "../../constants/axiosClient.ts";

const Confirmation = () => {
    return (
        <>
            <h1 className="mt-5 text-lg font-bold text-red-500/80">Thanks For Joining Our Newsletter!</h1>
            <p className=" text-center pt-1 text-md font-light">
                We hope you are excited as we are!
            </p>
        </>
    )
}
interface SignUpFormProps {
    HandleNewsLetterSignUp?: React.SubmitEventHandler<HTMLFormElement> | undefined
}
const SignUpForm = ({HandleNewsLetterSignUp}) => {
    return (
        <>
            <h1 className="mt-5 text-lg font-bold text-red-500/80">Sign Up For Our Newsletter!</h1>
            <p className=" text-start pt-1 text-sm w-80 font-light">
                Sign up for info, and to be notified when pre-orders go live!
            </p>
            <form className="flex justify-center mt-5" onSubmit={HandleNewsLetterSignUp}>
                <div className="max-w-sm w-60 ">
                    {/*<label htmlFor="input-base"*/}
                    {/*       className="block ml-1 text-xs font-medium text-start text-foreground">Email</label>*/}
                    <input id="footer_email" name="footer_email" type="email"
                           className="px-2 rounded-full block w-full bg-layer h-5 border-layer-line
                           sm:text-sm text-foreground placeholder:text-muted-foreground-1 focus:border-primary-focus
                           focus:ring-primary-focus disabled:opacity-50 disabled:pointer-events-none mt-2.5"
                           placeholder="Example@email.com"/>

                </div>
                <button type="submit"
                        className="
                                py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium rounded-lg bg-red-500/80
                                text-primary-foreground hover:bg-primary-hover focus:outline-hidden
                                focus:bg-primary-focus  disabled:opacity-50 disabled:pointer-events-none
                                ml-2 mt-2 h-6
                        "

                >
                    Join Now!
                </button>
            </form>
        </>
    )
}

export default function Footer() {
    const [joined, setJoined] = useState(false);
    async function HandleNewsLetterSignUp(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const data = {
            name: "",
            email: formData.get('footer_email'),
            subscribed: true,
            shouldDelete: false,
            tags: []
        }

        try {
            await contactApi.post("", data)
            setJoined(true)
        } catch (error) {
            console.error(error)
        }



    }
    return (
        <footer
            id="footer"
            className="border-red-500 border-t border-t-2 text-white flex flex-col  "
        >
            <section className="inline-flex w-full h-35 px-5 mb-5">
                <img src={GoForIt} alt="Go For It Title Screen" className="
                inline-flex justify-start items-center size-25   border  text-foreground
                   mt-5
                "/>

                <div className="inline-flex flex-col justify-end  ml-auto mr-25">
                    {!joined ? <SignUpForm HandleNewsLetterSignUp={HandleNewsLetterSignUp}/> : <Confirmation/>}
                </div>
            </section>

            <section className="bg-red-500 justify-center">
                <h2 className="font-caslon font-bold text-white pt-10 text-2xl">
                    CONTACT US
                </h2>

                <a
                    href="https://www.flaticon.com/free-icons/open-menu"
                    title="open menu icons"
                    className="text-[8px]"
                >
                    Open menu icons created by Pixel perfect - Flaticon
                </a>

                <p className="font-light  pb-10 text-sm">
                    @2026 by I Heart Pizza LLC
                </p>
            </section>
        </footer>
    )
}
