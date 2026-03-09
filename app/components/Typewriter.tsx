"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface TypewriterProps {
    lines: string[];
    className?: string;
    speed?: number;
    lineDelay?: number;
    onComplete?: () => void;
    cursor?: boolean;
}

export default function Typewriter({
    lines,
    className = "",
    speed = 40,
    lineDelay = 600,
    onComplete,
    cursor = true,
}: TypewriterProps) {
    const [visibleLines, setVisibleLines] = useState<string[]>([]);
    const [currentLine, setCurrentLine] = useState(0);
    const [currentChar, setCurrentChar] = useState(0);
    const [done, setDone] = useState(false);
    const onCompleteRef = useRef(onComplete);
    onCompleteRef.current = onComplete;

    useEffect(() => {
        if (currentLine >= lines.length) {
            setDone(true);
            onCompleteRef.current?.();
            return;
        }

        const text = lines[currentLine];

        if (currentChar < text.length) {
            const timeout = setTimeout(() => {
                setVisibleLines((prev) => {
                    const next = [...prev];
                    next[currentLine] = (next[currentLine] || "") + text[currentChar];
                    return next;
                });
                setCurrentChar((c) => c + 1);
            }, speed);
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                setCurrentLine((l) => l + 1);
                setCurrentChar(0);
            }, lineDelay);
            return () => clearTimeout(timeout);
        }
    }, [currentLine, currentChar, lines, speed, lineDelay]);

    return (
        <div className={className}>
            {visibleLines.map((line, i) => (
                <motion.p
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-3"
                >
                    {line}
                    {cursor && i === currentLine && !done && (
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="ml-0.5"
                        >
                            |
                        </motion.span>
                    )}
                </motion.p>
            ))}
        </div>
    );
}
