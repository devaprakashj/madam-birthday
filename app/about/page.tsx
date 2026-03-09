"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";

interface Card {
    id: number;
    frontEmoji: string;
    frontLabel: string;
    back: string;
}

const CARDS: Card[] = [
    {
        id: 1,
        frontEmoji: "💻",
        frontLabel: "Lab mystery",
        back: "A1-02 Lab ku id card vittu oru naal vandha teriyuma, lab assistant kitta thittu vaangi... face la comedy vachikittu irundhaiye — annaiku paakanu unna enaku semma sirippu 😂",
    },
    {
        id: 2,
        frontEmoji: "⏰",
        frontLabel: "Time keeper",
        back: "Nee always time ku saptruva — oru naal late aana kuda mental aagiduva, en class la kudu 12.40 lunch na 12.41pm ku madam mess la sapadu vangi saptu irupinga. aprm clg mess ena ena date ku ena food nu hindi kaaran unna kettudhan cook pannave start pannuvaanga.",
    },
    {
        id: 3,
        frontEmoji: "🕊️",
        frontLabel: "Amaithiyana ponnu",
        back: "Enaku therinja varaikum nee amaithiyana ponnu — adhu unga best quality, adhudhan Madam 🥺",
    },
];

function FlipCard({ card, delay }: { card: Card; delay: number }) {
    const [flipped, setFlipped] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    return (
        // motion wrapper handles ONLY fade-in — no scale/3D transforms
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
        >
            {/* Perspective container — separate from motion */}
            <div
                onClick={() => setFlipped((f) => !f)}
                style={{
                    width: "100%",
                    height: "215px",
                    perspective: "1200px",
                    cursor: "pointer",
                }}
            >
                {/* This is the element that rotates */}
                <div
                    style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        transformStyle: "preserve-3d",
                        transition: "transform 0.6s ease",
                        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    }}
                >
                    {/* ── FRONT ── */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            borderRadius: "16px",
                            backfaceVisibility: "hidden",
                            WebkitBackfaceVisibility: "hidden",
                            background: "linear-gradient(135deg, #12122a, #1a1a38)",
                            border: "1px solid rgba(245,200,66,0.25)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "10px",
                            padding: "20px",
                        }}
                    >
                        <span style={{ fontSize: "3rem", lineHeight: 1 }}>{card.frontEmoji}</span>
                        <p style={{ color: "#f5c842", fontWeight: 600, fontSize: "1rem", textAlign: "center", margin: 0 }}>
                            {card.frontLabel}
                        </p>
                        <p style={{ color: "#f5f0e8", fontSize: "0.7rem", opacity: 0.35, margin: 0 }}>
                            tap to flip 👆
                        </p>
                    </div>

                    {/* ── BACK ── */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            borderRadius: "16px",
                            backfaceVisibility: "hidden",
                            WebkitBackfaceVisibility: "hidden",
                            transform: "rotateY(180deg)",
                            background: "linear-gradient(135deg, #1a002a, #0f0020)",
                            border: "1px solid rgba(255,143,171,0.3)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "20px",
                        }}
                    >
                        <p style={{
                            color: "#f5f0e8",
                            fontSize: "0.85rem",
                            textAlign: "center",
                            lineHeight: 1.75,
                            margin: 0,
                        }}>
                            {card.back}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function AboutPage() {
    const router = useRouter();

    return (
        <div
            className="min-h-dvh px-5 py-16 relative flex flex-col items-center justify-center"
            style={{ background: "#0a0a1a", overflowX: "hidden" }}
        >
            {/* BG glow */}
            <div
                className="fixed top-1/4 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, #ff8fab44, transparent)", opacity: 0.5 }}
            />

            <div className="w-full max-w-sm mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-10"
                >
                    <div className="text-5xl mb-4">👀</div>
                    <h1
                        className="font-handwriting text-2xl md:text-3xl mb-2"
                        style={{
                            background: "linear-gradient(135deg, #ff8fab, #ffb3c6)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        Naan notice pannathellam
                    </h1>
                    <p style={{ color: "#f5f0e8", fontSize: "0.75rem", opacity: 0.45 }}>
                        tap the cards to reveal 🃏
                    </p>
                    <div
                        className="mt-5 mx-auto h-px w-24 opacity-30"
                        style={{ background: "linear-gradient(90deg, transparent, #ff8fab, transparent)" }}
                    />
                </motion.div>

                {/* Cards */}
                <div className="flex flex-col gap-5 mb-12">
                    {CARDS.map((card, i) => (
                        <FlipCard key={card.id} card={card} delay={i * 0.1} />
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center pb-10"
                >
                    <button
                        onClick={() => router.push("/letter")}
                        className="nav-btn nav-btn-gold animate-pulse-glow"
                    >
                        Oru letter irukkு 💌
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
