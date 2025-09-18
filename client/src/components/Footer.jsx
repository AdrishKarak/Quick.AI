import React from 'react';
import {assets} from "../assets/assets.js";
import {useNavigate} from "react-router-dom";

export default function Footer() {
    const navigate = useNavigate();
    return (
        <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500 mt-15">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
                <div className="md:max-w-96">
                    <img src={assets.logo} alt="logo" className='w-32 sm:w-44 cursor-pointer' onClick={()=>navigate('/')}/>
                    <p className="mt-6 text-sm">
                       Quick.AI empowers creators, professionals, and businesses with easy-to-use AI tools for writing, design, and productivity. From blog writing to image generation and resume reviews, we make creativity faster, smarter, and more accessible.
                    </p>
                </div>
                <div className="flex-1 flex items-start md:justify-end gap-20">
                    <div>
                        <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
                        <ul className="text-sm space-y-2">
                            <li><a href="">Home</a></li>
                            <li><a href="">About us</a></li>
                            <li><a href="">Contact us</a></li>
                            <li><a href="">Privacy policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold mb-5 text-gray-800">Get in touch</h2>
                        <div className="text-sm space-y-2">
                            <p>+91-7811-025-336</p>
                            <p>adrishkarak@example.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <p className="pt-4 text-center text-xs md:text-sm pb-5">
                Copyright 2025 © <a href="#">Quick.AI</a>. All Right Reserved.
            </p>
        </footer>
    );
};