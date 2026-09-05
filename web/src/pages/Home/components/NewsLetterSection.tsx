import React, {useState} from 'react'
import GoForIt from "../../../assets/media/go_for_it.png";

interface SignUpFormProps {
    HandleNewsLetterSignUp?: React.SubmitEventHandler<HTMLFormElement> | undefined
}

function SignUpForm({HandleNewsLetterSignUp}: SignUpFormProps) {
    return (
        <>
            <h1 className="mt-5 text-lg font-bold text-red-500/80">Sign Up For Our Newsletter!</h1>
            <p className=" text-center pt-1 text-md font-light">
                We’re deep into development of our new 2D fighting game Go For It! - and we’re planning to release some
                of our other 31 (!) games soon! Sign up for info, and to be notified when pre-orders go live!
            </p>
            <form className="flex justify-center mt-5" onSubmit={HandleNewsLetterSignUp}>
                <div className="max-w-sm w-30 px-2">
                    <label htmlFor="name"
                           className="block ml-1 text-xs font-medium text-start text-foreground">Name</label>
                    <input id="name" type="text"
                           className="px-2 rounded-full block w-full bg-layer h-5 border-layer-line
                           sm:text-sm text-foreground placeholder:text-muted-foreground-1 focus:border-primary-focus
                           focus:ring-primary-focus disabled:opacity-50 disabled:pointer-events-none"
                           placeholder="Names"/>
                </div>
                <div className="max-w-sm w-40 ">
                    <label htmlFor="email"
                           className="block ml-1 text-xs font-medium text-start text-foreground">Email</label>
                    <input id="email" type="email"
                           className="px-2 rounded-full block w-full bg-layer h-5 border-layer-line
                           sm:text-sm text-foreground placeholder:text-muted-foreground-1 focus:border-primary-focus
                           focus:ring-primary-focus disabled:opacity-50 disabled:pointer-events-none"
                           placeholder="Example@email.com"/>
                </div>
                <button type="submit"
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-red-500/80
                          text-primary-foreground hover:bg-primary-hover focus:outline-hidden
                        focus:bg-primary-focus  disabled:opacity-50 disabled:pointer-events-none
                        ml-2 mt-2
                        "

                >
                    Join Now!
                </button>
            </form>
        </>
    )
}


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


function NewsLetterSection() {
    const [joined, setJoined] = useState(false)


    function HandleNewsLetterSignUp(e: { preventDefault: () => void; }) {
        e.preventDefault();
        setJoined(true)
    }

    return (
        <section className=" text-center lg:w-2/5 justify-center mx-auto">

            <img src={GoForIt} alt="Go For It Title Screen" className="
            inline-flex justify-center items-center size-50    border  text-foreground
            mt-20
            "/>

            {!joined ? <SignUpForm HandleNewsLetterSignUp={HandleNewsLetterSignUp} />: <Confirmation />}
        </section>
    )
}

export default NewsLetterSection
