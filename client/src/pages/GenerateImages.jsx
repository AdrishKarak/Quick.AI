import React, {useState} from 'react';
import { Image, Sparkles} from "lucide-react";

const GenerateImages = () => {
    const imageStyle = [
        'Realistic' , '3D style' , 'Portrait style' , 'Ghibli style' , 'Cartoon style' , 'Anime style'
    ]

    const[selectedStyle , setSelectedStyle] = useState('Realistic');
    const[input , setInput] = useState('')
    const [publish , setPublish] = useState(false);
    const onSubmitHandler = async (e)=>{
        e.preventDefault();
    }
    return (
        <div className="h-screen overflow-y-auto p-6 flex flex-col md:flex-row gap-4 text-slate-700">
            {/*left col*/}
            <form onSubmit={onSubmitHandler} className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 shadow-sm self-start">
                <div className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6 stroke-[#00AD25]" />
                    <h1 className="text-xl font-semibold">AI Image Generation</h1>
                </div>
                <p className='mt-6 text-sm font-medium'>Describe your image</p>
                <textarea onChange={(e)=>setInput(e.target.value)} value={input} rows={4} className=" bg-slate-50  border border-gray-300 rounded-md mt-2 w-full p-2 px-3 outline-none text-sm"  placeholder="Describe your image to generate..." required  />
                <p className='mt-4 text-sm font-medium'>Style :</p>
                <div className='mt-3 flex gap-3 flex-wrap sm:max-w-8/12'>
                    {imageStyle.map((item)=> (
                        <span onClick={()=> setSelectedStyle(item)} className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                            selectedStyle === item
                                ? 'bg-green-100 text-green-700 border-green-400'
                                : 'text-gray-500 border-gray-400'
                        }`} key={item}>{item}</span>
                    ))}
                </div>

                <div className='flex items-center gap-3 my-6'>
                    <label className="relative cursor-pointer">
                        <input
                            type="checkbox"
                            checked={publish}
                            onChange={(e) => setPublish(e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition-all"></div>
                        <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-all peer-checked:translate-x-4"></span>
                    </label>
                    <p className='text-sm font-medium'>Publish the image to Community</p>
                </div>


                <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00AD25] to-[#04FF50] text-white px-4 py-2 rounded-lg mt-6  text-sm font-medium cursor-pointer'>
                    <Image className='w-5'/>
                    Generate Image
                </button>

            </form>

            {/*right col*/}
            <div className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col min-h-80 max-h-[437px] overflow-y-auto'>
                <div className='flex items-center gap-3'>
                    <Image className='w-5 h-5 text-[#00AD25]'/>
                    <h1 className='text-xl font-semibold '>Generated Image</h1>
                </div>
                <div className='flex-1 flex justify-center items-center bg-slate-50 mt-6 rounded-md border border-gray-300'>
                    <div className='text-sm flex flex-col  items-center gap-5 text-gray-500'>
                        <Image className='w-10 h-10 '/>
                        <p>Enter a topic and generate Image</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default GenerateImages;