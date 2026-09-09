"use client";

import { motion } from "framer-motion";

interface MarqueeProps {
  text: string;
  speed?: number;
  filled?: boolean;
  className?: string;
}

export function Marquee({ text, speed = 20, filled = false, className = "" }: MarqueeProps) {
  const repeated = `${text} ✦ `.repeat(12);

  return (
    <div className={`overflow-hidden whitespace-nowrap py-8 border-y border-white/[0.06] ${className}`}>
      <motion.div
        animate={{ x: [0, "-50%"] }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
        className="inline-block"
      >
        <span className={`text-5xl sm:text-7xl lg:text-[8vw] font-bold tracking-tighter select-none ${filled ? "text-white/[0.04]" : "text-outline"}`}>
          {repeated}
        </span>
      </motion.div>
    </div>
  );
}

export function MarqueeReverse({ text, speed = 20, className = "" }: MarqueeProps) {
  const repeated = `${text} — `.repeat(12);

  return (
    <div className={`overflow-hidden whitespace-nowrap py-4 ${className}`}>
      <motion.div
        animate={{ x: ["-50%", "0%"] }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
        className="inline-block"
      >
        <span className="text-sm sm:text-base font-mono tracking-[0.2em] text-white/[0.06] select-none uppercase">
          {repeated}
        </span>
      </motion.div>
    </div>
  );
}
