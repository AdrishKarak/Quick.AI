import React, {useEffect, useState} from 'react';
import {dummyCreationData} from "../assets/assets.js";
import {Gem, Sparkles} from "lucide-react";
import {Protect} from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem.jsx";

const DashBoard = () => {

    const [creations , setCreations]= useState([])
    const getDashBoardData = async ()=>{
        setCreations(dummyCreationData)
    }
    useEffect(()=>{
        getDashBoardData()
    },[])

    return (
        <div className='h-full overflow-y-scroll p-6'>
            <div className='flex justify-start gap-4 flex-wrap'>
             {/*creations card*/}
                <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl shadow-md border border-gray-200'>
                     <div className='text-slate-700'>
                         <p className='text-sm'>Total Creations</p>
                         <h2 className='text-xl font-semibold '>{creations.length}</h2>
                     </div>
                    <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#1588F2] to-[#0BB0D7] text-white flex justify-center items-center'>
                        <Sparkles className='w-5 text-white'/>
                    </div>
                </div>
            {/*Active plan*/}
                <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl shadow-md border border-gray-200'>
                    <div className='text-slate-700'>
                        <p className='text-sm'>Active Plan</p>
                        <h2 className='text-xl font-semibold '>
                            <Protect plan='premium_pro' fallback="Free"> Premium-pro</Protect>
                        </h2>
                    </div>
                    <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center'>
                        <Gem className='w-5 text-white'/>
                    </div>
                </div>

            </div>

            <div className='space-y-4 '>
                <p className='mt-7 mb-4'>Recent creations</p>
                {
                    creations.map((item)=> <CreationItem key={item.id} item={item}/> )
                }
            </div>



        </div>
    );
};

export default DashBoard;