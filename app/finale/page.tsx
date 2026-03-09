"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useConfetti } from "../components/useConfetti";

export default function FinalePage() {
    const { fireworks, burst } = useConfetti();
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        // Start fireworks immediately
        setTimeout(() => {
            fireworks();
            burst({ x: 0.5, y: 0.4 });
        }, 300);

        const t1 = setTimeout(() => setPhase(1), 600);
        const t2 = setTimeout(() => setPhase(2), 2000);
        const t3 = setTimeout(() => setPhase(3), 3500);

        // Play Full Birthday BGM
        try {
            const audio = new Audio("https://pixabay.com/music/download/123015/"); // Fetching an upbeat track directly
            // Direct Link to an upbeat happy birthday track
            const bgm = new Audio("https://cdn.pixabay.com/audio/2021/11/24/audio_3497d34190.mp3"); // 'Happy Birthday' Upbeat Instrumental
            bgm.volume = 0.4;
            bgm.loop = true;
            bgm.play().catch(() => console.log("BGM playing is waiting for user interaction..."));
        } catch (e) { }

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleTap = () => {
        burst({ x: Math.random(), y: Math.random() * 0.5 });
        burst({ x: Math.random(), y: Math.random() * 0.5 });
    };

    return (
        <div
            className="page-container min-h-dvh flex flex-col items-center justify-center px-6 relative overflow-hidden"
            onClick={handleTap}
            style={{ cursor: "pointer" }}
        >
            {/* Multi-layer background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0"
                    style={{ background: "radial-gradient(ellipse at 50% 50%, #0f0025, #0a0a1a 60%)" }} />

                {/* Pulsing rings */}
                {[1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        className="absolute top-1/2 left-1/2 rounded-full -translate-x-1/2 -translate-y-1/2"
                        style={{
                            width: `${i * 200}px`,
                            height: `${i * 200}px`,
                            border: `1px solid rgba(245, 200, 66, ${0.15 / i})`,
                        }}
                        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                    />
                ))}
            </div>

            {/* Floating emoji rain */}
            {["🎂", "🎊", "🎉", "✨", "💖", "🌟", "🎈", "💛", "🔥", "⭐"].map((e, i) => (
                <motion.div
                    key={i}
                    className="absolute text-2xl pointer-events-none"
                    style={{
                        left: `${i * 10 + Math.random() * 5}%`,
                        top: "-5%",
                    }}
                    animate={{
                        y: ["0vh", "110vh"],
                        rotate: [0, 360],
                        opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                        duration: 4 + Math.random() * 3,
                        delay: i * 0.4 + Math.random(),
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {e}
                </motion.div>
            ))}

            {/* Stars twinkling */}
            {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                    key={`star-${i}`}
                    className="absolute w-1 h-1 rounded-full pointer-events-none"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        background: i % 2 === 0 ? "#f5c842" : "#ff8fab",
                    }}
                    animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.5, 0.8] }}
                    transition={{
                        duration: 1.5 + Math.random() * 2,
                        delay: Math.random() * 3,
                        repeat: Infinity,
                    }}
                />
            ))}

            {/* Main content */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
                {/* Cake emoji */}
                <AnimatePresence>
                    {phase >= 1 && (
                        <motion.div
                            initial={{ scale: 0, rotate: -20 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", bounce: 0.6, duration: 0.8 }}
                            className="text-8xl mb-6"
                        >
                            🎂
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main heading */}
                {phase >= 1 && (
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.7, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.9, type: "spring", bounce: 0.4, delay: 0.2 }}
                        className="font-handwriting font-bold leading-tight mb-4"
                        style={{
                            fontSize: "clamp(2rem, 8vw, 3.5rem)",
                            background: "linear-gradient(135deg, #f5c842, #ffd700, #ff8fab, #f5c842)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            filter: "drop-shadow(0 0 20px rgba(245,200,66,0.5))",
                        }}
                    >
                        Happy Birthday<br />Madam! 🎂🔥
                    </motion.h1>
                )}

                {/* Subtext */}
                {phase >= 2 && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-base md:text-lg mb-3"
                        style={{ color: "#f5f0e8", opacity: 0.9 }}
                    >
                        Nee special —
                    </motion.p>
                )}
                {phase >= 2 && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-sm mb-8"
                        style={{ color: "#f5f0e8", opacity: 0.6 }}
                    >
                        even if naan daily solla maaten 🙃
                    </motion.p>
                )}

                {/* Tap hint */}
                {phase >= 2 && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.5, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-xs mb-6"
                        style={{ color: "#f5c842" }}
                    >
                        tap anywhere for more magic ✨
                    </motion.p>
                )}

                {/* Fireworks row */}
                {phase >= 2 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="flex gap-2 justify-center text-3xl mb-8"
                    >
                        {["🎆", "🎇", "🎆"].map((e, i) => (
                            <motion.span
                                key={i}
                                animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
                            >
                                {e}
                            </motion.span>
                        ))}
                    </motion.div>
                )}

                {/* Signature */}
                {phase >= 3 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mt-4"
                    >
                        <div className="h-px w-24 mx-auto mb-4 opacity-30"
                            style={{ background: "linear-gradient(90deg, transparent, #f5c842, transparent)" }} />
                        <p className="font-handwriting text-lg gradient-gold">
                            — Deva ✨
                        </p>
                    </motion.div>
                )}
            </div>

            {/* Bottom glow bar */}
            <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 1.5, duration: 1.5 }}
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ background: "linear-gradient(90deg, #ff8fab, #f5c842, #ff8fab)", boxShadow: "0 0 20px rgba(245,200,66,0.5)" }}
            />
        </div>
    );
}
