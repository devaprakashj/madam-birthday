"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import FloatingParticles from "../components/FloatingParticles";
import { useConfetti } from "../components/useConfetti";

const BALLOONS = ["🎈", "🎀", "🎊", "🎉", "🎁", "💖", "🌸", "🌟"];

export default function WishPage() {
    const router = useRouter();
    const { burst } = useConfetti();
    const [phase, setPhase] = useState(0);
    const [showBtn, setShowBtn] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Trigger confetti on load
        setTimeout(() => burst({ x: 0.5, y: 0.3 }), 500);
        setTimeout(() => burst({ x: 0.3, y: 0.5 }), 800);
        setTimeout(() => burst({ x: 0.7, y: 0.5 }), 1100);

        // Sequence
        const t1 = setTimeout(() => setPhase(1), 400);
        const t2 = setTimeout(() => setPhase(2), 2000);
        const t3 = setTimeout(() => setPhase(3), 4000);
        const t4 = setTimeout(() => setShowBtn(true), 5500);

        // Try auto-play BGM
        try {
            audioRef.current = new Audio("https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");
            audioRef.current.volume = 0.3;
            audioRef.current.loop = true;
        } catch (_) { }

        return () => {
            clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
            audioRef.current?.pause();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="page-container flex flex-col items-center justify-center min-h-dvh px-6 relative overflow-hidden">
            <FloatingParticles count={12} type="hearts" />

            {/* Balloons rising from bottom */}
            {BALLOONS.map((balloon, i) => (
                <motion.div
                    key={i}
                    className="absolute text-3xl pointer-events-none"
                    style={{ left: `${8 + i * 12}%`, bottom: "-10vh" }}
                    animate={{ y: [0, "-120vh"], rotate: [0, i % 2 === 0 ? 8 : -8, 0] }}
                    transition={{
                        duration: 6 + Math.random() * 4,
                        delay: i * 0.4,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {balloon}
                </motion.div>
            ))}

            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-10 pointer-events-none"
                style={{ background: "radial-gradient(circle, #ff8fab, #f5c842, transparent)" }} />

            <div className="z-10 flex flex-col items-center text-center max-w-sm w-full">
                {/* Cake */}
                <AnimatePresence>
                    {phase >= 1 && (
                        <motion.div
                            initial={{ scale: 0, rotate: -10 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
                            className="text-7xl mb-6"
                        >
                            🎂
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main birthday text with typewriter effect */}
                {phase >= 1 && (
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="font-handwriting text-3xl md:text-5xl font-bold mb-4 leading-tight"
                        style={{
                            background: "linear-gradient(135deg, #f5c842, #ff8fab, #f5c842)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            textShadow: "none",
                        }}
                    >
                        Happy Birthday<br />Deepika! 🎂
                    </motion.h1>
                )}

                {/* Subtext */}
                {phase >= 2 && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-base md:text-lg leading-relaxed mb-3"
                        style={{ color: "#f5f0e8", opacity: 0.9 }}
                    >
                        Nee rombo special Madam
                    </motion.p>
                )}

                {phase >= 3 && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-sm md:text-base mb-8"
                        style={{ color: "#f5f0e8", opacity: 0.6 }}
                    >
                        even if naan daily solla maaten 🙃
                    </motion.p>
                )}

                {/* CTA */}
                <AnimatePresence>
                    {showBtn && (
                        <motion.button
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ type: "spring", bounce: 0.4 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.push("/story")}
                            className="nav-btn nav-btn-gold animate-pulse-glow"
                        >
                            Namma story paaru 💌
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* Stars row */}
                {phase >= 2 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex gap-2 mt-8"
                    >
                        {["⭐", "💛", "🌟", "💛", "⭐"].map((s, i) => (
                            <motion.span
                                key={i}
                                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                                className="text-lg"
                            >
                                {s}
                            </motion.span>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
