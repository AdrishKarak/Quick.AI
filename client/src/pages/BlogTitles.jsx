import React, {useState} from 'react';
import { Hash, Sparkles} from "lucide-react";

const BlogTitles = () => {
    const blogCategories = [
       'General' , 'Technology' , 'Business' , 'Health' , 'Lifestyle' , 'Sports' , 'Travel', 'Food' , 'Entertainment'
    ]

    const[selectedCategory , setSelectedCategory] = useState('General');
    const[input , setInput] = useState('')
    const onSubmitHandler = async (e)=>{
        e.preventDefault();
    }

    return (
        <div className="h-screen overflow-y-auto p-6 flex gap-4 text-slate-700">
            <form onSubmit={onSubmitHandler} className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 shadow-sm self-start">
                <div className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6 stroke-[#8E37EB]" />
                    <h1 className="text-xl font-semibold">Blog Title Generation</h1>
                </div>
                <p className='mt-6 text-sm font-medium'>Keyword</p>
                <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder="Enter blog topic to generate..." className=" bg-slate-50  border border-gray-300 rounded-md mt-2 w-full p-2 px-3 outline-none text-sm" />
                <p className='mt-4 text-sm font-medium'>Category :</p>
                <div className='mt-3 flex gap-3 flex-wrap sm:max-w-8/12'>
                    {blogCategories.map((item)=> (
                        <span onClick={()=> setSelectedCategory(item)} className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                            selectedCategory === item
                                ? 'bg-purple-100 text-purple-700 border-purple-400'
                                : 'text-gray-500 border-gray-400'
                        }`} key={item}>{item}</span>
                    ))}
                </div>
                <br/>
                <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white px-4 py-2 rounded-lg mt-6  text-sm font-medium cursor-pointer'>
                    <Hash className='w-5'/>
                    Generate Title
                </button>

            </form>

            {/*right col*/}
            <div className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col min-h-80 max-h-[200px] overflow-y-auto'>
                <div className='flex items-center gap-3'>
                    <Hash className='w-5 h-5 text-[#4A7AFF]'/>
                    <h1 className='text-xl font-semibold '>Generated Title</h1>
                </div>
                <div className='flex-1 flex justify-center items-center bg-slate-50 mt-6 rounded-md border border-gray-300'>
                    <div className='text-sm flex flex-col  items-center gap-5 text-gray-500'>
                        <Hash className='w-10 h-10 '/>
                        <p>Enter a topic and generate Title</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BlogTitles;