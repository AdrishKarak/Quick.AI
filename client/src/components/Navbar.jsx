import React from 'react';
import {assets} from "../assets/assets.js";
import {useNavigate} from "react-router-dom";

import {  UserButton ,useUser, useClerk } from '@clerk/clerk-react';
const Navbar = () => {
    const navigate = useNavigate();
    const {user}=useUser();
    const{openSignIn}=useClerk();
    return (
        <div className='fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center px-5 py-4 sm:px-20 xl:px-34 '>
 <img src={assets.logo} alt="logo" className='w-32 sm:w-44 cursor-pointer' onClick={()=>navigate('/')}/>

            {
                user ? <UserButton/> : (
                    <button onClick={openSignIn} className="group px-8 py-2.5 bg-indigo-600 rounded-lg text-white cursor-pointer active:scale-95 transition duration-300 hover:bg-indigo-700 border border-gray-400">
                        <p className="relative h-6 overflow-hidden">
                            <span className="block transition-transform duration-300 group-hover:-translate-y-full">Sign In 🚀</span>
                            <span className="absolute w-full top-full left-1/2 -translate-x-1/2 block transition-transform duration-300 group-hover:translate-y-[-100%]"> ✨ 🚀</span>
                        </p>
                    </button>
                )
            }


        </div>
    );
};

export default Navbar;

