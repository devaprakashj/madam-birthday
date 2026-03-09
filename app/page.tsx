"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useConfetti } from "./components/useConfetti";

export default function MysteryLanding() {
  const router = useRouter();
  const { burst } = useConfetti();
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  const handleOpen = async () => {
    if (clicking) return;
    setClicking(true);

    // Impactful sequence
    burst({ x: 0.5, y: 0.5 });
    setTimeout(() => burst({ x: 0.4, y: 0.45 }), 150);
    setTimeout(() => burst({ x: 0.6, y: 0.45 }), 300);

    setTimeout(() => router.push("/unlock"), 1000);
  };

  return (
    <div className="page-container flex flex-col items-center justify-center min-h-dvh px-6 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        {/* Deep space layers */}
        <div className="absolute inset-0 bg-[#050510]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_#1a1033_0%,_transparent_60%)] opacity-60" />

        {/* Animated stars with parallax-like feel */}
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: i % 5 === 0 ? "2px" : "1px",
              height: i % 5 === 0 ? "2px" : "1px",
              backgroundColor: i % 3 === 0 ? "#f5c842" : i % 3 === 1 ? "#ff8fab" : "#fff",
              opacity: 0.1 + Math.random() * 0.5,
              boxShadow: i % 10 === 0 ? "0 0 8px #f5c842" : "none",
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + Math.random() * 4,
              delay: Math.random() * 5,
              repeat: Infinity
            }}
          />
        ))}

        {/* Floating dust/sparkles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute text-[8px] pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              color: "#f5c842",
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          >
            ✧
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="z-10 w-full max-w-sm"
          >
            {/* Main Glass Card */}
            <div className={`glass-card p-10 flex flex-col items-center text-center relative overflow-hidden group border border-white/10 transition-colors duration-700 ${clicking ? 'border-[#f5c842]/50 bg-[#f5c842]/5' : ''}`}>
              {/* Shimmering Border Animation */}
              <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: clicking ? 0 : 1,
                  x: ["-50%", "50%"]
                }}
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(245, 200, 66, 0.2), transparent)",
                  width: "200%",
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Card internal aura */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#f5c842]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ff8fab]/40 to-transparent" />

              {/* Gift Presentation */}
              <motion.div
                initial={{ rotate: -15, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                  delay: 0.6
                }}
                className="relative mb-8"
              >
                {/* Glow behind gift */}
                <div className="absolute inset-0 bg-[#f5c842] blur-3xl opacity-20 scale-150 animate-pulse" />

                <motion.div
                  animate={clicking ? {
                    scale: [1, 1.2, 0],
                    rotate: [0, 15, -15, 0],
                    opacity: [1, 1, 0],
                  } : {
                    y: [-8, 8, -8],
                    rotate: [-2, 2, -2]
                  }}
                  transition={clicking ? {
                    duration: 0.8,
                    times: [0, 0.5, 1],
                  } : {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  whileHover={{ scale: 1.1 }}
                  className="text-[100px] cursor-pointer relative z-10 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] select-none"
                  onClick={handleOpen}
                >
                  🎁
                </motion.div>
              </motion.div>

              {/* Text Hierarchy */}
              <div className="space-y-4 mb-10">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  transition={{ delay: 1.2 }}
                  className="block text-[10px] uppercase tracking-[0.5rem] text-white"
                >
                  A message for
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, letterSpacing: "-0.05em" }}
                  animate={{ opacity: 1, letterSpacing: "0.1em" }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="font-handwriting text-5xl gradient-gold text-glow-gold"
                >
                  Madam...
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                  className="pt-2"
                >
                  <p className="text-[#f5f0e8] text-lg font-light leading-relaxed">
                    oru <span className="text-[#f5c842] font-semibold">surprise</span> wait pannudhu
                  </p>
                </motion.div>
              </div>

              {/* Action Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.6 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpen}
                disabled={clicking}
                className={`
                  relative overflow-hidden px-8 py-4 rounded-full font-semibold transition-all duration-500
                  ${clicking ? 'bg-[#f5c842]/20 text-[#f5c842]' : 'bg-gradient-to-r from-[#f5c842] to-[#e6b800] text-[#0a0a1a] shadow-[0_0_30px_rgba(245,200,66,0.3)] hover:shadow-[0_0_50px_rgba(245,200,66,0.5)]'}
                `}
              >
                <span className="relative z-10 flex items-center gap-3">
                  {clicking ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        ✨
                      </motion.span>
                      Unlocking Magic...
                    </>
                  ) : (
                    <>
                      Open pannu 💌
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </>
                  )}
                </span>

                {/* Shine effect on button hover */}
                <div className="absolute top-0 -left-full bottom-0 w-1/2 bg-white/20 skew-x-[-25deg] group-hover:left-[150%] transition-all duration-[800ms] pointer-events-none" />
              </motion.button>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 2.5 }}
                className="mt-8 text-[10px] tracking-widest text-white/40 uppercase"
              >
                tap to begin the journey ✨
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 2.2, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4"
      >
        <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#f5c842]" />
        <span className="text-[#f5c842]/80 text-xs">✦</span>
        <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#f5c842]" />
      </motion.div>
    </div>
  );
}
