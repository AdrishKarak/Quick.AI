import React from 'react';
import {AiToolsData} from "../assets/assets.js";
import {useNavigate} from "react-router-dom";
import {useUser} from "@clerk/clerk-react";

const AiTools = () => {
    const navigate = useNavigate();
    const user = useUser();
    return (
        <div className='px-4 sm:px-20 xl:px-32 my-24'>
           <div className='text-center'>
               <h2 className='text-slate-700 text-[42px] font-semibold'>Powerful AI tools</h2>
               <p className='text-gray-500 max-w-lg mx-auto'>Everything you need to create , enhance , optimize and improve your content with cutting-edge AI technology.</p>
           </div>

            <div className='flex flex-wrap justify-center gap-10 mt-10'>
                {AiToolsData.map((tool,index)=> (
                    <div key={index} className='p-8 m-4 max-w-xs rounded-lg shadow-lg  shadow-black bg-[#FDFDFE] border border-black hover:-translate-y-1 transition-all duration-300 cursor-pointer' onClick={()=> user && navigate(tool.path)}>
                       <tool.Icon className='w-12 h-12 p-3 rounded-md'  style={{background:`linear-gradient(to bottom , ${tool.bg.from} ,${tool.bg.to})`}}/>
                        <h3 className='text-lg font-semibold mt-6 mb-3'>{tool.title}</h3>.
                        <p className='text-gray-400 text-sm max-w-[95%]'>{tool.description}</p>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default AiTools;