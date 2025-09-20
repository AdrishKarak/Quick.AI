import React, { useState } from 'react';
import Markdown from "react-markdown";

const CreationItem = ({ item }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div
            onClick={() => setExpanded(!expanded)}
            className="p-4 max-w-5xl text-sm bg-white border border-gray-200 rounded-lg shadow-md cursor-pointer"
        >
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h2>{item.prompt}</h2>
                    <p className="text-slate-500">
                        {item.type} - {new Date(item.created_at).toLocaleDateString()}
                    </p>
                </div>
                <button className="bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] px-4 py-1 rounded-full">
                    {item.type}
                </button>
            </div>

            {/* Smooth expandable container */}
            <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    expanded ? "max-h-[1000px] opacity-100 mt-3" : "max-h-0 opacity-0"
                }`}
            >
                {item.type === "image" ? (
                    <div>
                        <img
                            src={item.content}
                            alt="image"
                            className="w-full max-w-md mt-4"
                        />
                    </div>
                ) : (
                    <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-700">
                        <div className="reset-tw">
                            <Markdown>{item.content}</Markdown>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreationItem;
