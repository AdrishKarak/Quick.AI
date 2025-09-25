import React, {useState} from 'react';
import { Scissors, Sparkles} from "lucide-react";

const RemoveObject = () => {
    const[input , setInput] = useState('')
    const[object , setObject] = useState('')

    const onSubmitHandler = async (e)=>{
        e.preventDefault();
    }
    return (
        <div className="h-screen overflow-y-auto p-6 flex gap-4 text-slate-700">
            <form onSubmit={onSubmitHandler} className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 shadow-sm self-start">
                <div className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6 stroke-[#4A7AFF]" />
                    <h1 className="text-xl font-semibold">Object

                        remover</h1>
                </div>
                <p className='mt-6 text-sm font-medium'>Upload Images Here :</p>
                <input onChange={(e)=>setInput(e.target.files[0])} type="file" accept='image/*'   className=" bg-slate-50  border border-gray-300 rounded-md mt-2 w-full p-2 px-3 outline-none text-sm text-slate-600" required />

                <p className='mt-6 text-sm font-medium'>Describe object to be removed</p>
                <textarea onChange={(e)=>setInput(e.target.value)} value={object} rows={4} className=" bg-slate-50  border border-gray-300 rounded-md mt-2 w-full p-2 px-3 outline-none text-sm"  placeholder="e.g., watch or spoon etc. Only a single object at a time..." required  />

                <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#427DF6] to-[#8E37EB] text-white px-4 py-2 rounded-lg mt-6  text-sm font-medium cursor-pointer'>
                    <Scissors className='w-5'/>
                    Remove Object
                </button>

            </form>

            {/*right col*/}
            <div className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col min-h-80 max-h-[200px] overflow-y-auto'>
                <div className='flex items-center gap-3'>
                    <Scissors className='w-5 h-5 text-[#427DF6]'/>
                    <h1 className='text-xl font-semibold '>Processed Image</h1>
                </div>
                <div className='flex-1 flex justify-center items-center bg-slate-50 mt-6 rounded-md border border-gray-300'>
                    <div className='text-sm flex flex-col  items-center gap-5 text-gray-500'>
                        <Scissors className='w-10 h-10 '/>
                        <p>Enter a image to remove a object</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RemoveObject;