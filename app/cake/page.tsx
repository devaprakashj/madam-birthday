"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useConfetti } from "../components/useConfetti";

export default function CakePage() {
    const router = useRouter();
    const { burst, fireworks } = useConfetti();
    const [isCut, setIsCut] = useState(false);
    const [isBlowing, setIsBlowing] = useState(false);
    const [isPieceSentToAppa, setIsPieceSentToAppa] = useState(false);
    const [isPieceSentToDeva, setIsPieceSentToDeva] = useState(false);
    const [showAppaMsg, setShowAppaMsg] = useState(false);
    const [showDevaMsg, setShowDevaMsg] = useState(false);

    const handleCut = () => {
        if (isCut) return;
        setIsCut(true);
        setIsBlowing(true);

        // Play Sound
        try {
            const hdBgm = new Audio("https://cdn.pixabay.com/audio/2022/03/10/audio_f8a0a0b1cb.mp3");
            hdBgm.volume = 0.5;
            hdBgm.play().catch(e => console.log("Audio play blocked"));
        } catch (e) { }

        // Celebration!
        burst({ x: 0.5, y: 0.5 });
        setTimeout(() => fireworks(), 500);
    };

    const handleSendToAppa = () => {
        setIsPieceSentToAppa(true);
        try {
            new Audio("https://assets.mixkit.co/active_storage/sfx/2357/2357-preview.mp3").play();
        } catch (e) { }

        setTimeout(() => {
            setShowAppaMsg(true);
            try {
                new Audio("https://assets.mixkit.co/active_storage/sfx/1344/1344-preview.mp3").play();
            } catch (e) { }
        }, 1500);
    };

    const handleSendToDeva = () => {
        setIsPieceSentToDeva(true);
        try {
            new Audio("https://assets.mixkit.co/active_storage/sfx/2357/2357-preview.mp3").play();
        } catch (e) { }

        setTimeout(() => {
            setShowDevaMsg(true);
            try {
                new Audio("https://assets.mixkit.co/active_storage/sfx/1344/1344-preview.mp3").play();
            } catch (e) { }
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#050510] flex flex-col items-center py-10 px-6 relative overflow-x-hidden">
            {/* Background Magic */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,_#1a1033_0%,_#050510_70%)] opacity-80" />

            <div className="w-full max-w-[450px] flex flex-col items-center text-center relative z-10">

                {/* Header */}
                <motion.div
                    animate={(isPieceSentToAppa && !showAppaMsg) || (isPieceSentToDeva && !showDevaMsg) ? { opacity: 0.2 } : {}}
                    className="mb-6 mt-4"
                >
                    <span className="text-gold block tracking-[0.4em] text-[10px] uppercase mb-2 opacity-60">The Grand Moment</span>
                    <h1 className="font-handwriting text-4xl gradient-gold mb-2">
                        Slice of Joy 🎂
                    </h1>
                </motion.div>

                {/* The Virtual Cake Stage */}
                <div className="relative w-full h-[380px] flex flex-col items-center justify-center">

                    {/* Main Cake (Only if neither piece is currently 'flying' or being replied to in a large way) */}
                    <AnimatePresence>
                        {(!isPieceSentToAppa && !isPieceSentToDeva) && (
                            <motion.div
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="relative flex flex-col items-center"
                            >
                                {/* Highly Detailed Cake Holder */}
                                <motion.div
                                    className="relative z-10 cursor-pointer flex flex-col items-center"
                                    onClick={handleCut}
                                >
                                    {/* Candles */}
                                    {!isBlowing && (
                                        <div className="flex gap-5 mb-2 z-30">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="relative">
                                                    <div className="w-2.5 h-10 rounded-full bg-gradient-to-b from-[#f5c842] to-[#ffd700]" />
                                                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }} className="absolute -top-5 left-1/2 -translate-x-1/2 w-4 h-7 bg-orange-400 rounded-full shadow-[0_0_15px_#fb923c]" />
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Top Layer */}
                                    <motion.div
                                        animate={isCut ? { x: -25, rotate: -4, y: -5 } : {}}
                                        className="w-44 h-24 bg-[#3a2518] rounded-t-[30px] shadow-2xl relative z-20"
                                    >
                                        <div className="absolute bottom-0 left-0 w-full h-8 flex overflow-hidden">
                                            {Array.from({ length: 8 }).map((_, i) => (
                                                <div key={i} className="flex-1 bg-[#3a2518] h-full rounded-b-full shadow-md" style={{ height: `${20 + Math.random() * 10}px`, marginTop: "-5px" }} />
                                            ))}
                                        </div>
                                    </motion.div>

                                    {/* Middle Layer */}
                                    <motion.div animate={isCut ? { x: 5, rotate: 1 } : {}} className="w-[190px] h-8 bg-[#f5f0e8] relative z-10 border-y border-[#3a2518]/10" />

                                    {/* Bottom Layer */}
                                    <motion.div
                                        animate={isCut ? { x: 15, rotate: 2, y: 5 } : {}}
                                        className="w-60 h-32 bg-gradient-to-br from-[#2a1b3d] to-[#120a1a] rounded-b-[40px] shadow-2xl relative overflow-hidden"
                                    />

                                    {/* Knife */}
                                    {!isCut && (
                                        <motion.div animate={{ x: [0, 15, 0], y: [0, -10, 0] }} transition={{ repeat: Infinity }} className="absolute -right-16 top-20 text-7xl select-none z-50">
                                            🔪
                                        </motion.div>
                                    )}
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Appa's Reply Bubble */}
                    <AnimatePresence>
                        {showAppaMsg && !isPieceSentToDeva && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, x: -30 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                className="bg-[#1a1033] border border-[#f5c842]/40 rounded-3xl p-6 shadow-2xl max-w-[320px] relative z-20"
                            >
                                <div className="absolute -top-8 left-6 flex items-center gap-2 bg-[#0a051a] px-3 py-1 rounded-full border border-[#f5c842]/20">
                                    <span className="text-sm">👨‍👧</span>
                                    <span className="text-[9px] text-gold font-bold tracking-widest uppercase">Appa</span>
                                </div>
                                <p className="font-handwriting text-xl text-[#f5f0e8] leading-relaxed">
                                    "Kandippa ma... Rombo sweets-ah irukku! Unoda anbhu andha cake-laye theriyithu. Appa blessings eppovum unkooda irukum ma. Nee eppovum santhoshama, thanambikkaiyoda irukanum. Unoda kanavugal ellaam kandippa niraivayrum. Happy birthday ma! ❤️"
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Deva's Reply Bubble */}
                    <AnimatePresence>
                        {showDevaMsg && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, x: 30 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                className="bg-[#0a0a20] border border-blue-400/30 rounded-3xl p-6 shadow-2xl max-w-[320px] relative z-20 mt-4"
                            >
                                <div className="absolute -top-8 right-6 flex items-center gap-2 bg-[#050510] px-3 py-1 rounded-full border border-blue-400/20">
                                    <span className="text-sm">👨‍💻</span>
                                    <span className="text-[9px] text-blue-300 font-bold tracking-widest uppercase">Deva</span>
                                </div>
                                <p className="font-handwriting text-xl text-[#f5f0e8] leading-relaxed">
                                    "Wow, super taste! Thanks for the piece madam. Innaiku full-ah unoda day thaan — enjoy pannu! 😉🔥"
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Piece Flying Animation for Appa */}
                    {isPieceSentToAppa && !showAppaMsg && (
                        <motion.div initial={{ scale: 0.2, x: 0, y: 0 }} animate={{ scale: 1.5, x: -300, y: -300, opacity: 0 }} transition={{ duration: 1.5 }} className="text-6xl absolute">🍰</motion.div>
                    )}

                    {/* Piece Flying Animation for Deva */}
                    {isPieceSentToDeva && !showDevaMsg && (
                        <motion.div initial={{ scale: 0.2, x: 0, y: 0 }} animate={{ scale: 1.5, x: 300, y: -300, opacity: 0 }} transition={{ duration: 1.5 }} className="text-6xl absolute">🍰</motion.div>
                    )}
                </div>

                {/* Interaction Button Area */}
                <div className="w-full min-h-[160px] mt-6 flex flex-col justify-start">
                    <AnimatePresence mode="wait">
                        {!isCut ? (
                            <motion.p key="hint" className="text-[#f5f0e8]/80 text-lg tracking-[0.2em] uppercase font-light">
                                Tap to Slice 🖤
                            </motion.p>
                        ) : !isPieceSentToAppa ? (
                            <motion.div key="appa-btn" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center">
                                <p className="text-gold text-sm mb-4 italic">The cake is ready! Share the love...</p>
                                <button
                                    onClick={handleSendToAppa}
                                    className="nav-btn nav-btn-gold py-4 px-12 text-lg rounded-full"
                                >
                                    Feed a Piece to Appa 🍰
                                </button>
                            </motion.div>
                        ) : (showAppaMsg && !isPieceSentToDeva) ? (
                            <motion.div key="deva-btn" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center">
                                <p className="text-blue-300/60 text-xs mb-4 tracking-widest uppercase">Appa is happy! Now me?</p>
                                <button
                                    onClick={handleSendToDeva}
                                    className="px-12 py-4 rounded-full border border-blue-400/30 text-blue-300 bg-blue-400/5 hover:bg-blue-400/10 transition-all font-medium text-lg shadow-[0_0_20px_rgba(37,99,235,0.1)]"
                                >
                                    Send a Piece to Deva 🍰✨
                                </button>
                            </motion.div>
                        ) : showDevaMsg ? (
                            <motion.div key="final-btn" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center">
                                <p className="text-gold/40 text-[10px] mb-6 tracking-[0.3em] uppercase">Everyone's heart is full! ❤️</p>
                                <button
                                    onClick={() => router.push("/finale")}
                                    className="nav-btn nav-btn-gold py-4 px-14 text-xl rounded-full shadow-[0_0_40px_rgba(245,200,66,0.3)] animate-pulse-glow"
                                >
                                    Grand Finale 🎆
                                </button>
                            </motion.div>
                        ) : (
                            <motion.p key="wait" className="text-gold/60 text-lg tracking-widest animate-pulse">
                                Sending love... 🍰📩
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
}
