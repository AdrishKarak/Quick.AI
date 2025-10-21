import React, {useState} from 'react';
import {Eraser, Sparkles} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveBackGround = () => {
    const[input , setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState("");
    const { getToken } = useAuth();

    const onSubmitHandler = async (e)=>{
        e.preventDefault();
        try {
            setLoading(true);
            if (!input) {
                toast.error('Please select an image first');
                setLoading(false);
                return;
            }
            const token = await getToken();
            const formData = new FormData();
            formData.append("image", input);

            const { data } = await axios.post(
                "/api/ai/remove-image-background",
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (data.success) {
                setContent(data.content);
                toast.success("Image generated successfully!");
            } else {
                toast.error(data.message || "Failed to generate image");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="h-screen overflow-y-auto p-6 flex flex-col md:flex-row gap-4 text-slate-700">
            <form onSubmit={onSubmitHandler} className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 shadow-sm self-start">
                <div className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6 stroke-[#FF4938]" />
                    <h1 className="text-xl font-semibold">Background remover</h1>
                </div>
                <p className='mt-6 text-sm font-medium'>Upload Images Here :</p>
                <input onChange={(e)=>setInput(e.target.files[0])} type="file" accept='image/*'   className=" bg-slate-50  border border-gray-300 rounded-md mt-2 w-full p-2 px-3 outline-none text-sm text-slate-600" required />
                  <p className='text-xs text-gray-500 font-light mt-1'>Supports JPG , PNG and other image formats</p>

                <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#F6AB41] to-[#FF4938] text-white px-4 py-2 rounded-lg mt-6  text-sm font-medium cursor-pointer'>
                    {loading ? (
                        <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent border-white animate-spin"></span>
                    ) : (
                        <Eraser className='w-5'/>
                    )}

                    Remove Background
                </button>

            </form>

            {/*right col*/}
            <div className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col min-h-80 max-h-[500px] overflow-y-auto'>
                <div className='flex items-center gap-3'>
                    <Eraser className='w-5 h-5 text-[#FF4938]'/>
                    <h1 className='text-xl font-semibold '>Generated Image</h1>
                </div>
                {!content ? (
                    <div className='flex-1 flex justify-center items-center bg-slate-50 mt-6 rounded-md border border-gray-300'>
                        <div className='text-sm flex flex-col  items-center gap-5 text-gray-500'>
                            <Eraser className='w-10 h-10 '/>
                            <p>Enter a image to remove Background</p>
                        </div>
                    </div>

                ) : (
                    <img src={content} alt="Generated" className='w-full h-auto max-h-[350px] object-contain rounded-md'/>
                )}

            </div>
        </div>
    );
};

export default RemoveBackGround;