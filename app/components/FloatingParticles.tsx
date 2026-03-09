"use client";
import { motion } from "framer-motion";

interface FloatingParticlesProps {
    count?: number;
    type?: "stars" | "hearts" | "sparkles";
}

const EMOJIS = {
    stars: ["⭐", "✨", "💫", "🌟", "⚡"],
    hearts: ["💖", "💗", "💝", "🩷", "💓"],
    sparkles: ["✨", "🎊", "🎉", "💛", "🌸"],
};

export default function FloatingParticles({ count = 15, type = "stars" }: FloatingParticlesProps) {
    const items = EMOJIS[type];

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {Array.from({ length: count }).map((_, i) => {
                const x = Math.random() * 100;
                const delay = Math.random() * 6;
                const duration = 4 + Math.random() * 6;
                const size = 0.6 + Math.random() * 1.2;
                const emoji = items[i % items.length];

                return (
                    <motion.div
                        key={i}
                        className="absolute"
                        style={{ left: `${x}%`, fontSize: `${size}rem` }}
                        initial={{ y: "110vh", opacity: 0 }}
                        animate={{ y: "-10vh", opacity: [0, 1, 1, 0] }}
                        transition={{
                            duration,
                            delay,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        {emoji}
                    </motion.div>
                );
            })}
        </div>
    );
}
