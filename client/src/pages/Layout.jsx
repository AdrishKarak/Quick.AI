import React, {useState} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import {assets} from "../assets/assets.js";
import {Menu, X} from "lucide-react";
import Sidebar from "../components/Sidebar";
import {useUser , SignIn} from "@clerk/clerk-react";


const Layout = () => {

    const navigate = useNavigate();
    const[sidebar,setSidebar]=useState(false)
    const {user}=useUser();
    return user ? (
        <div className='flex flex-col items-start justify-start h-screen'>

            <nav className='w-full flex justify-between items-center px-8 min-h-14 border-b border-gray-200 shadow-lg cursor-pointer'>
                <img src={assets.logo} alt="logo" className='cursor-pointer w-32 sm:w-44' onClick={()=>navigate('/')}/>

                {
                    sidebar ? <X onClick={()=> setSidebar(false)} className='w-6 h-6 cursor-pointer sm:hidden text-gray-700' /> : <Menu onClick={()=> setSidebar(true)} className='w-6 h-6 cursor-pointer sm:hidden text-gray-700'/>
                }
            </nav>

            <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>
                <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
                <div className='flex-1 bg-[#F4F7FB]'>
                    <Outlet/>
                </div>
            </div>

        </div>
    ) : (
        <div className='flex justify-center items-center h-screen bg-gray-100'>
            <SignIn/>
        </div>
    )
};

export default Layout;