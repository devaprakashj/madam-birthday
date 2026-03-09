"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const LETTER_LINES = [
    "Madam,",
    "",
    "Nee rombo amaithiyana ponnu — enaku therinja varaikum.",
    "",
    "Naan unkitta rombo sanda pottu irukan, pesama irundhu irukan.",
    "but nee always oru peaceful. naa evalo kovama unna thittunaalum",
    "nee adha cool ahh handel panni pesuvan. unna thittanum nenaichi",
    "call panna kudu nee appudiye topic ahh mathi vera yedhaiyo pesitu irupa.",
    "aprm adha theriyum na unkitta sanda podadhan call pannanu.",
    "sry unakitta sanda poduradhuku ellam.",
    "",
    "",
    "Innaiku unoda birthday —",
    "naan konjam project tension la busy ah irundhen, wish pannala, story paakala...",
    "but naan marakala.",
    "",
    "",
    "— Deva",
];

export default function LetterPage() {
    const router = useRouter();
    const [lineIndex, setLineIndex] = useState(0);
    const [visibleLines, setVisibleLines] = useState<string[]>([]);
    const [done, setDone] = useState(false);
    const [showBtn, setShowBtn] = useState(false);

    useEffect(() => {
        if (lineIndex >= LETTER_LINES.length) {
            setDone(true);
            setTimeout(() => setShowBtn(true), 800);
            return;
        }

        const delay = LETTER_LINES[lineIndex] === "" ? 250 : 650;
        const t = setTimeout(() => {
            setVisibleLines((prev) => [...prev, LETTER_LINES[lineIndex]]);
            setLineIndex((i) => i + 1);
        }, delay);

        return () => clearTimeout(t);
    }, [lineIndex]);

    return (
        <div className="min-h-dvh bg-[#0a0a1a] flex flex-col items-center justify-center py-10 px-4 relative overflow-x-hidden">
            {/* Background Glow */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md aspect-square bg-[#f5c842] opacity-[0.05] blur-[100px] pointer-events-none rounded-full" />

            <div className="w-full max-w-[480px] flex flex-col items-center relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-8"
                >
                    <h1 className="font-handwriting text-2xl"
                        style={{
                            background: "linear-gradient(135deg, #f5c842, #ffd700)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            filter: "drop-shadow(0 0 5px rgba(245,200,66,0.2))"
                        }}>
                        A letter from Deva
                    </h1>
                    <div className="mt-3 h-px w-20 mx-auto bg-gradient-to-r from-transparent via-[#f5c842] to-transparent opacity-20" />
                </motion.div>

                {/* The Letter Card */}
                <div
                    className="w-full bg-[#12122a]/90 backdrop-blur-md rounded-[40px] border border-[#f5c842]/20 shadow-2xl overflow-hidden"
                    style={{
                        boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 20px rgba(245,200,66,0.08)",
                        boxSizing: "border-box"
                    }}
                >
                    <div
                        className="flex flex-col min-h-[500px]"
                        style={{ padding: "clamp(40px, 8vw, 60px) clamp(25px, 6vw, 50px)" }}
                    >
                        <div
                            className="font-handwriting relative z-10 text-[#f5f0e8]/95 flex-1 mt-4"
                            style={{
                                wordBreak: "break-word",
                                overflowWrap: "break-word",
                                whiteSpace: "pre-wrap",
                                fontSize: "clamp(1rem, 4.5vw, 1.15rem)",
                                lineHeight: "2.4",
                                textAlign: "center"
                            }}
                        >
                            {visibleLines.map((line, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4 }}
                                    style={{
                                        marginBottom: line === "" ? "18px" : "8px",
                                        color: line.startsWith("— Deva") ? "#f5c842" : "#f5f0e8",
                                        textAlign: line.startsWith("— Deva") ? "right" : "left",
                                        fontWeight: line.startsWith("— Deva") ? "bold" : "normal",
                                        fontSize: line.startsWith("— Deva") ? "1.4rem" : "inherit",
                                        marginTop: line.startsWith("— Deva") ? "36px" : "0",
                                        paddingRight: line.startsWith("— Deva") ? "0" : "5px"
                                    }}
                                >
                                    {line || "\u00A0"}
                                </motion.div>
                            ))}

                            {!done && (
                                <motion.span
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ duration: 0.6, repeat: Infinity }}
                                    className="text-[#f5c842] inline-block ml-1 font-sans"
                                >
                                    |
                                </motion.span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Button */}
            <AnimatePresence>
                {showBtn && (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mt-10 mb-8"
                    >
                        <button
                            onClick={() => router.push("/special")}
                            className="nav-btn nav-btn-gold animate-pulse-glow px-10 py-3 text-lg rounded-full"
                        >
                            Special Message 🎥
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
