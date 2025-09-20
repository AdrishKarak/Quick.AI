import React, {useState} from 'react';
import {Edit, Sparkles} from "lucide-react";

const WriteArticle = () => {
    const articleLength = [
        {length: 800 , text: 'Short (500-800 words)'},
        {length: 1200 , text: 'Short (800-1200 words)'},
        {length: 1600 , text: 'Short (1200+ words)'},
    ]

    const[selectedLength, setSelectedLength] = useState(articleLength[0]);
    const[input , setInput] = useState('')
    const onSubmitHandler = async (e)=>{
        e.preventDefault();
    }


    return (

        <div className="h-screen overflow-y-auto p-6 flex gap-4 text-slate-700">
            <form onSubmit={onSubmitHandler} className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 shadow-sm self-start">
                <div className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6 stroke-[#4A7AFF]" />
                    <h1 className="text-xl font-semibold">Article Configuration</h1>
                </div>
                <p className='mt-6 text-sm font-medium'>Article Topic</p>
                <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder="Enter article topic to generate..." className=" bg-slate-50  border border-gray-300 rounded-md mt-2 w-full p-2 px-3 outline-none text-sm" />
                <p className='mt-4 text-sm font-medium'>Article length :</p>
                <div className='mt-3 flex gap-3 flex-wrap sm:max-w-8/12'>
                    {articleLength.map((item,index)=> (
                        <span onClick={()=> setSelectedLength(item)} className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                            selectedLength.text === item.text
                                ? 'bg-blue-100 text-blue-700 border-blue-400'
                                : 'text-gray-500 border-gray-400'
                        }`} key={index}>{item.text}</span>
                    ))}
                </div>
                <br/>
                <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white px-4 py-2 rounded-lg mt-6  text-sm font-medium cursor-pointer'>
                    <Edit className='w-5'/>
                    Generate Article
                </button>

            </form>

            {/*right col*/}
            <div className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col min-h-96 max-h-[600px] overflow-y-auto'>
                <div className='flex items-center gap-3'>
                      <Edit className='w-5 h-5 text-[#4A7AFF]'/>
                    <h1 className='text-xl font-semibold '>Generated Article</h1>
                </div>
                <div className='flex-1 flex justify-center items-center bg-slate-50 mt-6 rounded-md border border-gray-300'>
                  <div className='text-sm flex flex-col  items-center gap-5 text-gray-500'>
                      <Edit className='w-10 h-10 '/>
                      <p>Enter a topic and generate article</p>
                  </div>
                </div>

            </div>
        </div>


    );
};

export default WriteArticle;