"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export function GradientBackground() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 20, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 20, damping: 15 });

  const bg1X = useTransform(springX, [0, 1], ["20%", "80%"]);
  const bg1Y = useTransform(springY, [0, 1], ["20%", "60%"]);
  const bg2X = useTransform(springX, [0, 1], ["70%", "30%"]);
  const bg2Y = useTransform(springY, [0, 1], ["60%", "30%"]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Primary gradient blobs */}
      <motion.div
        style={{ left: bg1X, top: bg1Y }}
        className="absolute w-[60vw] h-[60vw] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="w-full h-full bg-cyan-500/[0.04] rounded-full blur-[120px] animate-pulse" style={{ animationDuration: "8s" }} />
      </motion.div>

      <motion.div
        style={{ left: bg2X, top: bg2Y }}
        className="absolute w-[50vw] h-[50vw] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="w-full h-full bg-indigo-500/[0.03] rounded-full blur-[120px] animate-pulse" style={{ animationDuration: "12s" }} />
      </motion.div>

      {/* Subtle third blob */}
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw]">
        <div className="w-full h-full bg-emerald-500/[0.02] rounded-full blur-[100px] animate-pulse" style={{ animationDuration: "15s" }} />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }} />
    </div>
  );
}
