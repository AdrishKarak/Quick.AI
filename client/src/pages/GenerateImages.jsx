import React, { useState } from "react";
import { Image, Sparkles} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {
    const imageStyle = [
        "Realistic",
        "3D style",
        "Portrait style",
        "Ghibli style",
        "Cartoon style",
        "Anime style",
    ];

    const [selectedStyle, setSelectedStyle] = useState("Realistic");
    const [input, setInput] = useState("");
    const [publish, setPublish] = useState(false);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState("");
    const { getToken } = useAuth();

    const onSubmitHandler = async (e) => {
        e.preventDefault();



        try {
            setLoading(true);
            const token = await getToken();
            const prompt = `Generate an image based on the following description: ${input} and style: ${selectedStyle}.`;

            const { data } = await axios.post(
                "/api/ai/generate-image",
                { prompt, publish },
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
    };

    return (
        <div className="h-screen overflow-y-auto p-6 flex flex-col md:flex-row gap-4 text-slate-700">
            {/* Left column */}
            <form
                onSubmit={onSubmitHandler}
                className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 shadow-sm self-start"
            >
                <div className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6 stroke-[#00AD25]" />
                    <h1 className="text-xl font-semibold">AI Image Generation</h1>
                </div>

                <p className="mt-6 text-sm font-medium">Describe your image</p>
                <textarea
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    rows={4}
                    className="bg-slate-50 border border-gray-300 rounded-md mt-2 w-full p-2 px-3 outline-none text-sm"
                    placeholder="Describe your image to generate..."
                    required
                />

                <p className="mt-4 text-sm font-medium">Style :</p>
                <div className="mt-3 flex gap-3 flex-wrap sm:max-w-8/12">
                    {imageStyle.map((item) => (
                        <span
                            onClick={() => setSelectedStyle(item)}
                            className={`text-xs px-4 py-1 border rounded-full cursor-pointer transition-all ${
                                selectedStyle === item
                                    ? "bg-green-100 text-green-700 border-green-400"
                                    : "text-gray-500 border-gray-400"
                            }`}
                            key={item}
                        >
              {item}
            </span>
                    ))}
                </div>

                <div className="flex items-center gap-3 my-6">
                    {/* Custom toggle switch */}
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={publish}
                            onChange={(e) => setPublish(e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition-colors"></div>
                        <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
                    </label>
                    <p className="text-sm font-medium">Publish the image to Community</p>
                </div>

                <button
                    disabled={loading}
                    className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00AD25] to-[#04FF50] text-white px-4 py-2 rounded-lg mt-6 text-sm font-medium"
                >
                    {loading ? (
                        <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent border-white animate-spin"></span>
                    ) : (
                        <Image className="w-5" />
                    )}
                    Generate Image
                </button>
            </form>

            {/* Right column */}
            <div className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col min-h-80 max-h-[560px] overflow-y-auto">
                <div className="flex items-center gap-3">
                    <Image className="w-5 h-5 text-[#00AD25]" />
                    <h1 className="text-xl font-semibold">Generated Image</h1>
                </div>

                {!content ? (
                    <div className="flex-1 flex justify-center items-center bg-slate-50 mt-6 rounded-md border border-gray-300">
                        <div className="text-sm flex flex-col items-center gap-5 text-gray-500">
                            <Image className="w-10 h-10" />
                            <p>Enter a description and generate an image</p>
                        </div>
                    </div>
                ) : (
                    <div className="mt-3 h-full">
                        <img
                            src={content}
                            alt="Generated"
                            className="w-full h-auto max-h-[437px] object-contain rounded-md"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default GenerateImages;
