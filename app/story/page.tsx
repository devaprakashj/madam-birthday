"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRouter } from "next/navigation";

interface StoryMoment {
    id: string;
    text: string;
    emoji: string;
    bg: string;
    accent: string;
}

const STORY_MOMENTS: StoryMoment[] = [
    {
        id: "1",
        emoji: "🙈",
        text: "College la Harivasan water bottle vittu poitan. Appo Naan unoda number kandupidichi msg anupunen... but appo enaku bayam, so delete panniten.",
        bg: "radial-gradient(circle at 10% 10%, #1a1033 0%, #050510 100%)",
        accent: "#f5c842",
    },
    {
        id: "2",
        emoji: "😏",
        text: "Aprom Harivasan kitta avanaiye msg poda solliten. un number avan kitta na thandhutan.",
        bg: "radial-gradient(circle at 90% 10%, #2a0a1a 0%, #050510 100%)",
        accent: "#ff8fab",
    },
    {
        id: "3",
        emoji: "😶",
        text: "Konjam naal kazhichu unaku direct msg poten... but Madam reply pannave illa. Semma thigil enaku! 🥶",
        bg: "radial-gradient(circle at 10% 90%, #0a1a2a 0%, #050510 100%)",
        accent: "#f5c842",
    },
    {
        id: "4",
        emoji: "🥺",
        text: "Naa sry nu msg pottan, aprm dhan nee reply panna. Appolaiye irundhu conversation start aachu... ana edhula oru matter na naan yaru ne konjam naala unaku teriyadhu dhana. 😉",
        bg: "radial-gradient(circle at 90% 90%, #2a1a0a 0%, #050510 100%)",
        accent: "#ff8fab",
    },
];

function Scene({ moment }: { moment: StoryMoment }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section ref={ref} className="h-screen w-full flex items-center justify-center relative overflow-hidden">
            <motion.div
                style={{ scale, opacity, y }}
                className="w-full max-w-lg px-8 py-16 rounded-[40px] bg-white/[0.03] backdrop-blur-3xl border border-white/10 relative z-10 mx-6"
            >
                {/* Glow behind the scene */}
                <div className="absolute inset-0 -z-10 blur-[80px] opacity-20" style={{ background: moment.bg }} />

                <div className="flex flex-col items-center text-center gap-8">
                    <motion.span
                        animate={{ y: [-10, 10, -10] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="text-8xl filter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] select-none"
                    >
                        {moment.emoji}
                    </motion.span>

                    <div className="space-y-4">
                        <span className="text-[10px] tracking-[0.6em] uppercase text-white/30 font-bold block">Memoir {moment.id}</span>
                        <p className="text-xl md:text-2xl font-light leading-relaxed text-[#f5f0e8]">
                            {moment.text}
                        </p>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-white/5 rounded-tl-[40px]" />
                <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-white/5 rounded-br-[40px]" />
            </motion.div>
        </section>
    );
}

export default function StoryPage() {
    const router = useRouter();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    return (
        <div className="bg-[#050510] relative">
            {/* Progress Bar */}
            <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#f5c842] via-[#ff8fab] to-[#f5c842] z-50 origin-[0%]" style={{ scaleX }} />

            {/* Intro Screen */}
            <section className="h-screen w-full flex flex-col items-center justify-center text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="space-y-6"
                >
                    <span className="text-xl">📖</span>
                    <h1 className="font-handwriting text-5xl md:text-7xl gradient-gold text-glow-gold">Namma Story...</h1>
                    <p className="text-xs tracking-[0.4em] uppercase opacity-40">Scroll to travel through time</p>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="text-gold py-10"
                    >
                        ↓
                    </motion.div>
                </motion.div>
            </section>

            {/* Cinematic Scenes */}
            <div className="relative">
                {STORY_MOMENTS.map((moment) => (
                    <Scene key={moment.id} moment={moment} />
                ))}
            </div>

            {/* Outro Screen */}
            <section className="h-screen w-full flex items-center justify-center px-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="w-full max-w-md text-center space-y-12"
                >
                    <div className="relative inline-block py-10">
                        <motion.div
                            className="absolute inset-0 blur-3xl opacity-20"
                            style={{ background: "radial-gradient(circle, #ff8fab, transparent)" }}
                        />
                        <p className="font-handwriting text-3xl md:text-5xl gradient-pink italic relative z-10">
                            &ldquo;Still writing, Madam...&rdquo;
                        </p>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push("/about")}
                        className="nav-btn nav-btn-gold px-12 py-5 rounded-full text-lg shadow-[0_0_30px_rgba(245,200,66,0.2)]"
                    >
                        View More ✨
                    </motion.button>
                </motion.div>
            </section>

            {/* Global background elements */}
            <div className="fixed inset-0 -z-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[#050510]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_50%_50%,_rgba(26,16,51,0.4)_0%,_transparent_50%)]" />
            </div>
        </div>
    );
}
