import React from 'react';
import { Protect, useClerk, useUser } from "@clerk/clerk-react";
import { House, SquarePen, Hash, Eraser, Scissors, FileText, Users, Image, LogOut } from 'lucide-react';
import { NavLink } from "react-router-dom";

const navItems = [
    { to: '/ai', label: 'Dashboard', Icon: House },
    { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen },
    { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash },
    { to: '/ai/generate-images', label: 'Generate Images', Icon: Image },
    { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
    { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors },
    { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText },
    { to: '/ai/community', label: 'Community', Icon: Users },
];

const Sidebar = ({ sidebar, setSidebar }) => {
    const { user } = useUser();
    const { signOut, openUserProfile } = useClerk();

    if (!user) {
        return null;
    }

    return (
        <>
            {/* Mobile Sidebar */}
            <div
                className={`sm:hidden fixed left-0 top-0 bottom-0 w-60 bg-neutral-50 border-r border-gray-200 flex flex-col justify-between items-center ${
                    sidebar ? 'translate-x-0' : '-translate-x-full'
                } transition-all duration-300 ease-in-out shadow-xl z-20 overflow-y-auto`}
                style={{ paddingTop: '64px' }} // Push content below navigation
            >
                <div className='w-full flex-1 flex flex-col'>
                    {/* Profile Section */}
                    <div className='px-6 py-6 border-b border-gray-200'>
                        <img
                            src={user.imageUrl}
                            alt="profilepic"
                            className='w-20 h-20 rounded-full cursor-pointer mx-auto mb-3'
                            onClick={openUserProfile}
                        />
                        <h1 className='text-center font-medium text-gray-900'>{user.fullName}</h1>
                    </div>

                    {/* Navigation Items */}
                    <div className='flex-1 px-3 py-4 text-sm text-slate-600 font-medium'>
                        {navItems.map(({ to, label, Icon }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={to === '/ai'}
                                onClick={() => setSidebar(false)}
                                className={({ isActive }) => `px-3.5 py-3 flex items-center gap-3 rounded-lg mx-2 mb-1 ${isActive ? 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white' : 'hover:bg-gray-100'}`}
                            >
                                {({ isActive }) => (
                                    <>
                                        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                                        <span className={isActive ? 'text-white' : 'text-gray-700'}>{label}</span>
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </div>

                    {/* Footer Section */}
                    <div className='border-t border-gray-200 pt-4 pb-6 px-4'>
                        <div className='flex items-center gap-3 mb-4 p-2 rounded-lg hover:bg-gray-100 cursor-pointer' onClick={openUserProfile}>
                            <img src={user.imageUrl} alt="profilepic" className='w-10 h-10 rounded-full' />
                            <div className='flex-1'>
                                <h1 className='text-sm font-medium text-gray-900'>{user.fullName}</h1>
                                <p className='text-xs text-gray-500'>
                                    <Protect plan='premium_pro' fallback={<span>Free Plan</span>}>
                                        Premium Pro
                                    </Protect>
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={signOut}
                            className='w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors'
                        >
                            <LogOut className='w-4 h-4 text-gray-500' />
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>

            {/* Desktop Sidebar - Always visible */}
            <div className="hidden sm:flex fixed left-0 top-0 bottom-0 w-60 bg-neutral-50 border-r border-gray-200 flex-col justify-between items-center shadow-xl z-10 overflow-y-auto"
                 style={{ paddingTop: '64px' }} // Push content below navigation
            >
                <div className='w-full flex-1 flex flex-col'>
                    {/* Profile Section */}
                    <div className='px-6 py-6 border-b border-gray-200'>
                        <img
                            src={user.imageUrl}
                            alt="profilepic"
                            className='w-20 h-20 rounded-full cursor-pointer mx-auto mb-3'
                            onClick={openUserProfile}
                        />
                        <h1 className='text-center font-medium text-gray-900'>{user.fullName}</h1>
                    </div>

                    {/* Navigation Items */}
                    <div className='flex-1 px-3 py-4 text-sm text-slate-600 font-medium'>
                        {navItems.map(({ to, label, Icon }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={to === '/ai'}
                                className={({ isActive }) => `px-3.5 py-3 flex items-center gap-3 rounded-lg mx-2 mb-1 ${isActive ? 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white' : 'hover:bg-gray-100'}`}
                            >
                                {({ isActive }) => (
                                    <>
                                        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                                        <span className={isActive ? 'text-white' : 'text-gray-700'}>{label}</span>
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </div>

                    {/* Footer Section */}
                    <div className='border-t border-gray-200 pt-4 pb-6 px-4'>
                        <div className='flex items-center gap-3 mb-4 p-2 rounded-lg hover:bg-gray-100 cursor-pointer' onClick={openUserProfile}>
                            <img src={user.imageUrl} alt="profilepic" className='w-10 h-10 rounded-full' />
                            <div className='flex-1'>
                                <h1 className='text-sm font-medium text-gray-900'>{user.fullName}</h1>
                                <p className='text-xs text-gray-500'>
                                    <Protect plan='premium_pro' fallback={<span>Free Plan</span>}>
                                        Premium Pro
                                    </Protect>
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={signOut}
                            className='w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors'
                        >
                            <LogOut className='w-4 h-4 text-gray-500' />
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;