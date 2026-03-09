"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useConfetti } from "../components/useConfetti";

export default function UnlockPage() {
    const router = useRouter();
    const { burst } = useConfetti();
    const [value, setValue] = useState("");
    const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
    const [errorMsg, setErrorMsg] = useState("");
    const [shake, setShake] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = () => {
        if (value.toLowerCase().trim() === "madam") {
            setStatus("success");
            burst({ x: 0.5, y: 0.4 });
            setTimeout(() => burst({ x: 0.2, y: 0.5 }), 200);
            setTimeout(() => burst({ x: 0.8, y: 0.5 }), 400);
            setTimeout(() => router.push("/wish"), 1200);
        } else {
            setStatus("error");
            setShake(true);
            setErrorMsg("Illaye... try pannu 😏");
            setTimeout(() => {
                setShake(false);
                setStatus("idle");
                setErrorMsg("");
            }, 1500);
        }
    };

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleSubmit();
    };

    return (
        <div className="page-container flex flex-col items-center justify-center min-h-dvh px-6 relative">
            {/* Background glow */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-3xl opacity-8"
                    style={{ background: "radial-gradient(circle, #ff8fab40, transparent 70%)" }} />
            </div>

            {/* Floating question marks */}
            {["❓", "🤫", "🔐", "🗝️"].map((emoji, i) => (
                <motion.div
                    key={i}
                    className="absolute text-2xl opacity-20"
                    style={{
                        left: `${10 + i * 25}%`,
                        top: `${20 + (i % 2) * 50}%`,
                    }}
                    animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
                    transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
                >
                    {emoji}
                </motion.div>
            ))}

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-sm z-10"
            >
                {/* Lock icon */}
                <motion.div
                    animate={{ rotate: status === "error" ? [-5, 5, -5, 5, 0] : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-center mb-6"
                >
                    <span className="text-6xl">{status === "success" ? "🔓" : "🔐"}</span>
                </motion.div>

                <h1 className="text-2xl md:text-3xl font-bold text-center mb-2" style={{ color: "#f5f0e8" }}>
                    Oru secret word theriyuma?
                </h1>
                <p className="text-center text-3xl mb-10">🤫</p>

                {/* Input */}
                <motion.div
                    animate={shake ? { x: [-12, 12, -10, 10, -6, 6, 0] } : { x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <input
                        ref={inputRef}
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={handleKey}
                        placeholder="type here..."
                        className={`secret-input mb-4 ${status === "error" ? "error" : ""}`}
                        autoComplete="off"
                        spellCheck={false}
                        autoFocus
                    />
                </motion.div>

                {/* Error message */}
                <AnimatePresence>
                    {status === "error" && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="text-center mb-4 font-medium"
                            style={{ color: "#ff8fab" }}
                        >
                            {errorMsg}
                        </motion.p>
                    )}
                </AnimatePresence>

                {/* Success message */}
                <AnimatePresence>
                    {status === "success" && (
                        <motion.p
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center mb-4 font-bold text-lg"
                            style={{ color: "#f5c842" }}
                        >
                            Correct Madam! 🎉 Entering...
                        </motion.p>
                    )}
                </AnimatePresence>

                {/* Submit button */}
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit}
                    disabled={status === "success"}
                    className="nav-btn nav-btn-gold w-full justify-center text-base"
                    style={{ opacity: status === "success" ? 0.7 : 1 }}
                >
                    Check pannu ✨
                </motion.button>

                {/* Hint */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.35 }}
                    transition={{ delay: 3 }}
                    className="text-center text-xs mt-6"
                    style={{ color: "#f5f0e8" }}
                >
                    Hint: Naan unaiye enna nu kuppuduven 🙃
                </motion.p>
            </motion.div>
        </div>
    );
}
