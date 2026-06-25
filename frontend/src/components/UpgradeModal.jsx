import React from 'react';
import { Link } from 'react-router-dom';

export default function UpgradeModal({ isOpen, onClose }) {
    // If the modal state is false, render nothing (null)
    if (!isOpen) return null;

    return (
        /* Modal Overlay - Darkened background with blur effect */
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
            
            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden scale-100 animate-in zoom-in-95 duration-300">
                
                {/* Upper Section: Icon and Text */}
                <div className="p-8 text-center space-y-5">
                    {/* Glowing Premium Icon Placeholder */}
                    <div className="w-20 h-20 bg-linear-to-b from-zinc-700 to-zinc-800 rounded-full flex items-center justify-center mx-auto border border-zinc-600 shadow-inner relative">
                        <div className="absolute inset-0 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.2)] animate-pulse"></div>
                        <span className="text-4xl relative z-10">💎</span>
                    </div>
                    
                    <div>
                        <h2 className="text-2xl font-extrabold text-white mb-2">Premium Unlock Required</h2>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            You have reached the maximum limit of 5 tasks on the free tier. Upgrade to our Premium plan to unlock unlimited task management and exclusive productivity tools.
                        </p>
                    </div>
                </div>

                {/* Lower Section: Action Buttons */}
                <div className="p-5 bg-zinc-950/50 border-t border-zinc-800 flex gap-3 sm:flex-row flex-col-reverse">
                    <button
                        onClick={onClose}
                        className="w-full sm:w-1/2 px-4 py-3 rounded-xl bg-zinc-800 text-zinc-300 font-medium hover:bg-zinc-700 hover:text-white transition-colors border border-zinc-700"
                    >
                        Maybe Later
                    </button>
                    
                    {/* Navigates to the Pricing Page */}
                    <Link
                        to="/pricing"
                        onClick={onClose}
                        className="w-full sm:w-1/2 flex items-center justify-center px-4 py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all duration-300"
                    >
                        Upgrade Now
                    </Link>
                </div>
                
            </div>
        </div>
    );
}