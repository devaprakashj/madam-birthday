"use client";
import { useEffect, useRef } from "react";

interface ConfettiOptions {
    particleCount?: number;
    spread?: number;
    origin?: { x?: number; y?: number };
    colors?: string[];
    angle?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    scalar?: number;
    ticks?: number;
}

export function useConfetti() {
    const confettiRef = useRef<((opts: ConfettiOptions) => void) | null>(null);

    useEffect(() => {
        import("canvas-confetti").then((module) => {
            confettiRef.current = module.default as (opts: ConfettiOptions) => void;
        });
    }, []);

    const burst = (origin = { x: 0.5, y: 0.5 }) => {
        if (!confettiRef.current) return;
        const fire = (opts: ConfettiOptions) => confettiRef.current!(opts);
        fire({
            particleCount: 80,
            spread: 90,
            origin,
            colors: ["#f5c842", "#ff8fab", "#ffffff", "#ffd700", "#ffb3c6"],
            startVelocity: 35,
            decay: 0.9,
            gravity: 0.8,
        });
    };

    const fireworks = () => {
        if (!confettiRef.current) return;
        const fire = (opts: ConfettiOptions) => confettiRef.current!(opts);
        const colors = ["#f5c842", "#ff8fab", "#ffffff", "#ffd700", "#c0c0c0"];
        let frame = 0;
        const duration = 5000;
        const animFrame = () => {
            if (frame > duration / 16) return;
            frame++;
            fire({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.6 },
                colors,
                startVelocity: 60,
                decay: 0.93,
                gravity: 1.2,
            });
            fire({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.6 },
                colors,
                startVelocity: 60,
                decay: 0.93,
                gravity: 1.2,
            });
            requestAnimationFrame(animFrame);
        };
        animFrame();
    };

    return { burst, fireworks };
}
