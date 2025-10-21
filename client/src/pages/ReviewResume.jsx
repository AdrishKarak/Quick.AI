import React, {useState} from 'react';
import {FileText,  Sparkles} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";
import ReactMarkdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {
    const[input , setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState("");
    const { getToken } = useAuth();

    const onSubmitHandler = async (e)=>{
        e.preventDefault();

        try {
            setLoading(true);
            if (!input) {
                toast.error('Please select an pdf  first ➡️');
                setLoading(false);
                return;
            }

            const token = await getToken();
            const formData = new FormData();
            formData.append("resume", input);


            const { data } = await axios.post(
                "/api/ai/resume-review",
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
                    <Sparkles className="w-6 h-6 stroke-[#00DA83]" />
                    <h1 className="text-xl font-semibold"> Resume Reviewer</h1>
                </div>
                <p className='mt-6 text-sm font-medium'>Upload Resume Here :</p>
                <input onChange={(e)=>setInput(e.target.files[0])} type="file" accept='application/pdf'   className=" bg-slate-50  border border-gray-300 rounded-md mt-2 w-full p-2 px-3 outline-none text-sm text-slate-600" required />
                <p className='text-xs text-gray-500 font-light mt-1'>Supports PDF format only</p>

                <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00DA83] to-[#009BB3] text-white px-4 py-2 rounded-lg mt-6  text-sm font-medium cursor-pointer'>
                    {loading ? (
                        <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent border-white animate-spin"></span>
                    ) : (
                        <FileText className='w-5'/>
                    )}

                    Review Resume
                </button>

            </form>

            {/*right col*/}
            <div className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col min-h-96 max-h-[500px] overflow-y-auto'>
                <div className='flex items-center gap-3'>
                    <FileText className='w-5 h-5 text-[#00DA83]'/>
                    <h1 className='text-xl font-semibold '>Analysis result</h1>
                </div>
                {!content ? (
                    <div className='flex-1 flex justify-center items-center bg-slate-50 mt-6 rounded-md border border-gray-300'>
                        <div className='text-sm flex flex-col  items-center gap-5 text-gray-500'>
                            <FileText className='w-10 h-10 '/>
                            <p>Upload a resume for review and suggestions.</p>
                        </div>
                    </div>
                ) : (
                    <div className="mt-3 h-full overflow-y-scroll text-sm text-gray-700 whitespace-pre-wrap">
                        <div className='reset-tw prose prose-sm sm:prose-base lg:prose-lg max-w-none'>
                            <ReactMarkdown>{content}</ReactMarkdown>
                        </div>
                    </div>
                )}


            </div>
        </div>
    );
};

export default ReviewResume;