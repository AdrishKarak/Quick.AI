import React, { useState, useEffect } from 'react';
import {useAuth, useUser} from "@clerk/clerk-react";
import { Heart } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
    const [creations, setCreations] = useState([]);
    const { user } = useUser();
    const [loading, setLoading] = useState(true);
    const {getToken} = useAuth();

    const fetchCreations = async () => {
        try {
            setLoading(true);
            const token = await getToken();
            const {data} = await axios.get('/api/user/get-published-creations', {
                headers: {Authorization: `Bearer ${await getToken()}`},
            })

            if(data.success){
                setCreations(data.creations)
            } else {
                toast.error(data.message)
            }
        } catch (error){

            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false)
        }
    };

    const imageToggleLike = async (creationId) => {
        const userIdStr = user?.id?.toString();

        // ✅ Optimistic update - update UI immediately
        setCreations(prevCreations =>
            prevCreations.map(creation => {
                if (creation.id === creationId) {
                    const currentLikes = creation.likes || [];
                    const isLiked = currentLikes.includes(userIdStr);

                    return {
                        ...creation,
                        likes: isLiked
                            ? currentLikes.filter(id => id !== userIdStr) // Unlike
                            : [...currentLikes, userIdStr] // Like
                    };
                }
                return creation;
            })
        );

        try {
            const token = await getToken();

            const {data} = await axios.post(
                '/api/user/like-creations',
                { id: creationId },
                { headers: {Authorization: `Bearer ${token}`} }
            )

            if(data.success){
                // ✅ Don't show toast on every like - too annoying
                // toast.success(data.message);
            } else {
                // ❌ If backend fails, revert the optimistic update
                toast.error(data.message);
                await fetchCreations(); // Refresh to get correct state
            }
        } catch (error){
            console.error('Like error:', error);
            toast.error(error.response?.data?.message || 'Failed to update like');
            // ❌ Revert optimistic update on error
            await fetchCreations();
        }
    }

    useEffect(() => {
        if (user) {
            fetchCreations();
        }
    }, [user]);

    return (
        <div className="flex-1 flex flex-col gap-4 p-6 h-full">
            <h1 className="text-2xl font-bold">Community Creations</h1>

            {loading ? (
                <div className="bg-white h-full w-full rounded-xl flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : creations.length === 0 ? (
                <div className="bg-white h-full w-full rounded-xl flex items-center justify-center">
                    <p className="text-gray-500">No creations found</p>
                </div>
            ) : (
                <div className="bg-white h-full w-full rounded-xl overflow-y-scroll">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-3">
                        {creations.map((creation, index) => (
                            <div
                                key={creation.id || index}
                                className="relative group cursor-pointer rounded-lg overflow-hidden aspect-square"
                            >
                                <img
                                    src={creation.content}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 flex flex-col justify-end p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p className="text-sm text-white mb-2 line-clamp-2">{creation.prompt}</p>
                                    <div className="flex gap-1 items-center justify-end">
                                        <p className="text-white">{creation.likes?.length || 0}</p>
                                        <Heart
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                imageToggleLike(creation.id);
                                            }}
                                            className={`min-w-5 h-5 hover:scale-110 cursor-pointer transition-all ${
                                                creation.likes?.includes(user?.id)
                                                    ? "fill-red-500 text-red-600"
                                                    : "fill-none text-white"
                                            }`}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Community;