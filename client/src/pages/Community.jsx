import React, { useState, useEffect } from 'react';
import { useUser } from "@clerk/clerk-react";
import { dummyPublishedCreationData } from "../assets/assets.js";
import { Heart } from "lucide-react";

const Community = () => {
    const [creations, setCreations] = useState([]);
    const { user } = useUser();

    const fetchCreations = async () => {
        setCreations(dummyPublishedCreationData);
    };

    useEffect(() => {
        if (user) {
            fetchCreations();
        }
    }, [user]);

    const handleLike = (index) => {
        setCreations((prev) =>
            prev.map((creation, i) => {
                if (i === index) {
                    const alreadyLiked = creation.likes?.includes(user.id);
                    return {
                        ...creation,
                        likes: alreadyLiked
                            ? creation.likes.filter((id) => id !== user.id) // unlike
                            : [...(creation.likes || []), user.id], // like
                    };
                }
                return creation;
            })
        );
    };

    return (
        <div className="flex-1 flex flex-col gap-4 p-6 h-full">
            Creations
            <div className="bg-white h-full w-full rounded-xl overflow-y-scroll">
                {creations.map((creation, index) => (
                    <div
                        key={index}
                        className="relative group cursor-pointer inline-block pl-3 pt-3 w-full sm:max-w-1/2 lg:max-w-1/3"
                    >
                        {/* ⚠️ image tag should be lowercase <img>, not <image> */}
                        <img
                            src={creation.content}
                            alt=""
                            className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute bottom-0 right-0 left-3 flex gap-2 items-end justify-end group-hover:justify-between p-3 group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg">
                            <p className="text-sm hidden group-hover:block">{creation.prompt}</p>
                            <div className="flex gap-1 items-center">
                                <p>{creation.likes?.length || 0}</p>
                                <Heart  onClick={() => handleLike(index)}
                                    className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${
                                        creation.likes?.includes(user?.id)
                                            ? "fill-red-500 text-red-600"
                                            : "text-white"
                                    }`}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Community;
