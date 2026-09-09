"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const words = ["VAIBHAV", "DEVELOPER", "ENGINEER", "CREATOR"];

export function Loader() {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const counter = setInterval(() => {
      setCount((p) => {
        if (p >= 100) {
          clearInterval(counter);
          setTimeout(() => setLoading(false), 600);
          return 100;
        }
        return p + 1;
      });
    }, 20);

    const wordCycler = setInterval(() => {
      setWordIdx((p) => (p + 1) % words.length);
    }, 500);

    return () => { clearInterval(counter); clearInterval(wordCycler); };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-[9999] bg-[#030303] flex flex-col items-center justify-center"
        >
          {/* Cycling word */}
          <div className="h-20 overflow-hidden mb-8">
            <AnimatePresence mode="wait">
              <motion.h1
                key={wordIdx}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -80, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl sm:text-7xl font-bold tracking-[-0.04em] text-white text-center"
              >
                {words[wordIdx]}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Progress */}
          <div className="relative w-64">
            <div className="h-[1px] bg-white/10 w-full">
              <motion.div
                className="h-full bg-cyan-400"
                style={{ width: `${count}%` }}
              />
            </div>
            <div className="flex justify-between mt-3 font-mono text-[10px] tracking-widest text-white/30">
              <span>LOADING</span>
              <span className="tabular-nums">{String(count).padStart(3, "0")}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
