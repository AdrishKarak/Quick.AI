import React, {useState} from 'react';
import { Scissors, Sparkles} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {
    const[input , setInput] = useState('');
    const[object , setObject] = useState('');
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
            if(object.split(' ').length > 1){
                toast.error('😒 Please add only 1 input.')
                setLoading(false); // ✅ Stop loading
                return;
            }
            const token = await getToken();
            const formData = new FormData();
            formData.append("image", input);
            formData.append("object" , object)

            const { data } = await axios.post(
                "/api/ai/remove-image-object",
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
                    <Sparkles className="w-6 h-6 stroke-[#4A7AFF]" />
                    <h1 className="text-xl font-semibold">Object

                        remover</h1>
                </div>
                <p className='mt-6 text-sm font-medium'>Upload Images Here :</p>
                <input onChange={(e)=>setInput(e.target.files[0])} type="file" accept='image/*'   className=" bg-slate-50  border border-gray-300 rounded-md mt-2 w-full p-2 px-3 outline-none text-sm text-slate-600" required />

                <p className='mt-6 text-sm font-medium'>Describe object to be removed</p>
                <textarea onChange={(e)=>setObject(e.target.value)} value={object} rows={4} className=" bg-slate-50  border border-gray-300 rounded-md mt-2 w-full p-2 px-3 outline-none text-sm"  placeholder="e.g., watch or spoon etc. Only a single object at a time..." required  />

                <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#427DF6] to-[#8E37EB] text-white px-4 py-2 rounded-lg mt-6  text-sm font-medium cursor-pointer'>
                    {loading ? (
                        <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent border-white animate-spin"></span>
                    ) : (
                        <Scissors className='w-5'/>
                    )}

                    Remove Object
                </button>

            </form>

            {/*right col*/}
            <div className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col min-h-80 max-h-[500px] overflow-y-auto'>
                <div className='flex items-center gap-3'>
                    <Scissors className='w-5 h-5 text-[#427DF6]'/>
                    <h1 className='text-xl font-semibold '>Processed Image</h1>
                </div>
                {!content ? (
                    <div className='flex-1 flex justify-center items-center bg-slate-50 mt-6 rounded-md border border-gray-300'>
                        <div className='text-sm flex flex-col  items-center gap-5 text-gray-500'>
                            <Scissors className='w-10 h-10 '/>
                            <p>Enter a image to remove a object</p>
                        </div>
                    </div>
                ) : (
                    <img src={content} alt="processed" className='w-full h-auto max-h-[350px] object-contain rounded-md ' />
                )}


            </div>
        </div>
    );
};

export default RemoveObject;