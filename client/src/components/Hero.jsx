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

                <p className="mx-auto max-w-lg text-sm sm:text-base text-gray-600 mb-6">
                    Use AI tools for creating engaging articles, blogs, generate images,
                    review resumes, and more. Try the Premium version for more features.
                </p>

                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-4">
                    <button
                        onClick={() => navigate("/ai")}
                        className="bg-blue-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:scale-105 active:scale-95 transition shadow-lg"
                    >
                        Start creating
                    </button>

                    <button className="bg-amber-100 px-6 sm:px-8 py-2 sm:py-3 rounded-lg border border-gray-400 hover:scale-105 active:scale-95 transition shadow-lg">
                        Watch Demo
                    </button>
                </div>

                <div className="flex items-center gap-2 justify-center text-gray-600 text-sm sm:text-base mb-6">
                    <img src={assets.user_group} alt="users" className="h-6 sm:h-8" />
                    Trusted by many users...
                </div>

                {/* Marquee - centered and constrained inside the hero */}
                <div className="mx-auto w-full max-w-lg">
                    <Marquee gradient={false} speed={50} pauseOnHover>
                        {items.map((item, i) => (
                            <span key={i} className="mx-6 text-base sm:text-lg font-bold whitespace-nowrap">
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
