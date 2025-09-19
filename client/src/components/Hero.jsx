import React from "react";
import gradientBackground from "../assets/gradientBackground.png";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import Marquee from "react-fast-marquee";

const Hero = () => {
    const navigate = useNavigate();
    const items = [
        "Blog Writing",
        "Image Creation",
        "Background Removal",
        "Object Removal",
        "Resume Review",
    ];

    return (
        // Outer full-viewport wrapper ensures hero covers whole phone screen
        <section
            className="relative h-screen w-screen flex items-center justify-center bg-center bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(${gradientBackground})` }}
        >
            {/* Inner content container: centered, limited width, responsive padding */}
            <div className="w-full max-w-4xl px-6 sm:px-12 lg:px-20 text-center mt-10">
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-snug mb-4"  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                    <Typewriter
                        onInit={(typewriter) => {
                            typewriter
                                .typeString(
                                    '<span style="color:blue;">Create</span> amazing contents with <span style="color:blue;">AI</span> tools'
                                )
                                .start();
                        }}
                        options={{ delay: 100, cursor: "" }}
                    />
                </h1>

                <p className="mx-auto max-w-lg text-sm sm:text-base text-gray-500 mb-6">
                    Use AI tools for creating engaging articles, blogs, generate images,
                    review resumes, and more. Try the Premium version for more features.
                </p>

                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-4">

                    <button  onClick={() => navigate("/ai")} className="group px-8 py-2.5 bg-indigo-600 rounded-lg text-white cursor-pointer active:scale-95 transition duration-300 hover:bg-indigo-700 border border-gray-400">
                        <p className="relative h-6 overflow-hidden">
                            <span className="block transition-transform duration-300 group-hover:-translate-y-full">Start Creating</span>
                            <span className="absolute w-full top-full left-1/2 -translate-x-1/2 block transition-transform duration-300 group-hover:translate-y-[-100%]">Lets go 🚀</span>
                        </p>
                    </button>

                    <button className="group px-8 py-2.5 bg-amber-100 rounded-lg text-black cursor-pointer active:scale-95 transition duration-300 hover:bg-amber-200 border border-gray-400">
                        <p className="relative h-6 overflow-hidden">
                            <span className="block transition-transform duration-300 group-hover:-translate-y-full">Watch Demo</span>
                            <span className="absolute w-full top-full left-1/2 -translate-x-1/2 block transition-transform duration-300 group-hover:translate-y-[-100%]">Watch Demo</span>
                        </p>
                    </button>
                </div>

                <div className="flex items-center gap-2 justify-center text-gray-500 text-sm sm:text-base mb-6">
                    <img src={assets.user_group} alt="users" className="h-6 sm:h-8" />
                    Trusted by many users...
                </div>

                {/* Marquee - centered and constrained inside the hero */}
                <div className="mx-auto w-full max-w-lg mt-15">
                    <Marquee gradient={false} speed={50} pauseOnHover>
                        {items.map((item, i) => (
                            <span key={i} className="mx-6 text-primary text-base sm:text-lg font-bold whitespace-nowrap">
                {item}
              </span>
                        ))}
                    </Marquee>
                </div>
            </div>
        </section>
    );
};

export default Hero;
