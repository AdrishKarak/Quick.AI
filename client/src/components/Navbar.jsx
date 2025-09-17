import React from 'react';
import {assets} from "../assets/assets.js";
import {useNavigate} from "react-router-dom";
import {ArrowRight} from "lucide-react";
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
                    <button onClick={openSignIn} className='flex items-center gap-2 rounded-full text-xl cursor-pointer bg-blue-300 text-blue-950 px-8 py-2.5'>Sign in <ArrowRight className='w-4 h-4'/>

                    </button>
                )
            }


        </div>
    );
};

export default Navbar;