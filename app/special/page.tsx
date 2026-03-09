"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function SpecialPage() {
    const router = useRouter();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showBtn, setShowBtn] = useState(false);

    const handlePlay = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    const handleVideoEnd = () => {
        setShowBtn(true);
    };

    return (
        <div className="min-h-screen bg-[#0a0a1a] flex flex-col items-center py-12 px-6 relative overflow-x-hidden">
            {/* Background Magic */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-lg aspect-square bg-[#f5c842] opacity-[0.05] blur-[120px] pointer-events-none rounded-full" />
            <div className="fixed bottom-0 right-0 w-80 h-80 bg-[#ff8fab] opacity-[0.03] blur-[100px] pointer-events-none rounded-full" />

            <div className="w-full max-w-[450px] flex flex-col items-center relative z-10">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <span className="text-4xl mb-4 block">👨‍👧</span>
                    <h1 className="font-handwriting text-3xl gradient-gold">
                        A Special Message
                    </h1>
                    <p className="text-[#f5f0e8]/60 text-sm mt-2 italic">
                        From Appa, with lots of love...
                    </p>
                </motion.div>

                {/* Video Player Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="w-full relative group"
                >
                    {/* Golden Frame Border */}
                    <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-tr from-[#f5c842]/30 via-transparent to-[#f5c842]/30 blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="relative aspect-square w-full bg-black/60 rounded-[2.5rem] border border-[#f5c842]/20 overflow-hidden shadow-2xl flex items-center justify-center">
                        {/* The Actual Video */}
                        <video
                            ref={videoRef}
                            className="w-full h-full object-cover"
                            onEnded={handleVideoEnd}
                            playsInline
                        >
                            <source src="/videos/wish.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>

                        {/* Play Placeholder Overlay */}
                        <AnimatePresence>
                            {!isPlaying && (
                                <motion.div
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer"
                                    onClick={handlePlay}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-16 h-16 rounded-full bg-[#f5c842] flex items-center justify-center shadow-[0_0_30px_rgba(245,200,66,0.5)]"
                                    >
                                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-[#0a0a1a] border-b-[10px] border-b-transparent ml-1" />
                                    </motion.div>
                                    <p className="text-[#f5c842] font-semibold mt-4 tracking-widest uppercase text-xs">
                                        Tap to Watch
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -bottom-4 -left-4 text-2xl">🌸</div>
                    <div className="absolute -top-4 -right-4 text-2xl animate-pulse">✨</div>
                </motion.div>

                {/* Next Button - Only appears after video ends OR give a skip option if user wants */}
                <AnimatePresence>
                    {(showBtn || isPlaying) && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-12 text-center pb-12 w-full"
                        >
                            <button
                                onClick={() => router.push("/cake")}
                                className="nav-btn nav-btn-gold animate-pulse-glow w-full py-4 text-lg"
                            >
                                Go to Cake 🎂
                            </button>
                            <p className="text-[#f5f0e8]/30 text-[10px] mt-4 uppercase tracking-[0.2em]">
                                Only one more surprise left...
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
