import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <section className="h-screen bg-[#222831] flex items-center justify-center">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-[#00ADB5]">404</h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-[#EEEEEE] md:text-4xl">Something's missing.</p>
                    <p className="mb-4 text-lg font-light text-[#EEEEEE] opacity-80">Sorry, we can't find that page. You'll find lots to explore on the home page.</p>
                    <Link 
                        to="/home" 
                        className="inline-flex text-[#EEEEEE] bg-[#00ADB5] hover:bg-[#008E9B] focus:ring-4 focus:outline-none focus:ring-[#393E46] font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-200 my-4"
                    >
                        Back to Homepage
                    </Link>
                </div>   
            </div>
        </section>
    )
}

export default NotFoundPage;