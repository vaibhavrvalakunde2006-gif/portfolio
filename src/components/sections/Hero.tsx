"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { TextScramble, MagneticButton } from "@/components/ui/Effects";

function SplitText({ text, delay, className }: { text: string; delay: number; className: string }) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "120%", rotateX: -80 }}
        animate={{ y: "0%", rotateX: 0 }}
        transition={{ duration: 1.6, delay, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "bottom", perspective: 1000 }}
      >
        <span className={className}>{text}</span>
      </motion.div>
    </div>
  );
}

function TypewriterText({ text, delay }: { text: string; delay: number }) {
  const [displayed, setDisplayed] = useState("");
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="text-cyan-400"
      >
        |
      </motion.span>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 500]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const blur = useTransform(scrollYProgress, [0, 0.3], [0, 10]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 15 });
  const imgX = useTransform(springX, [-1, 1], [-30, 30]);
  const imgY = useTransform(springY, [-1, 1], [-30, 30]);
  const rotateX = useTransform(springY, [-1, 1], [12, -12]);
  const rotateY = useTransform(springX, [-1, 1], [-12, 12]);
  const bgX = useTransform(springX, [-1, 1], [10, -10]);
  const bgY = useTransform(springY, [-1, 1], [10, -10]);

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width * 2 - 1);
    mouseY.set((e.clientY - rect.top) / rect.height * 2 - 1);
  };

  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      className="relative h-[100dvh] flex items-center overflow-hidden"
    >
      {/* Animated grid background */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute inset-0 opacity-[0.03]"
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }} />
      </motion.div>

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-cyan-500/[0.025] rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        style={{ y, opacity, scale, filter: useTransform(blur, (v) => `blur(${v}px)`) }}
        className="relative z-10 w-full max-w-[1600px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
      >
        {/* Left */}
        <div className="lg:col-span-7 flex flex-col">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 2.5 }}
            className="flex items-center gap-4 mb-10"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 2.5 }}
              className="h-px w-16 bg-cyan-400 origin-left"
            />
            <TextScramble
              text="CREATIVE DEVELOPER PORTFOLIO"
              delay={2700}
              className="font-mono text-[10px] tracking-[0.3em] text-cyan-400 uppercase"
            />
          </motion.div>

          <SplitText text="VAIBHAV" delay={2.6} className="text-[16vw] sm:text-[14vw] lg:text-[9vw] font-bold tracking-[-0.06em] leading-[0.82] text-white block" />
          <SplitText text="R VALAKUNDE" delay={2.75} className="text-[12vw] sm:text-[10vw] lg:text-[6.5vw] font-bold tracking-[-0.05em] leading-[0.82] text-white/40 block" />

          {/* Typewriter tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 3.5 }}
            className="mt-10 font-mono text-sm sm:text-base text-cyan-400/80"
          >
            <TypewriterText text="BUILD. BREAK. FIX. REPEAT." delay={3600} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 4.5 }}
            className="mt-6 text-base text-white/25 max-w-lg font-light leading-relaxed"
          >
            Engineering student building practical software, AI and data-driven solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 5 }}
            className="mt-12 flex items-center gap-4"
          >
            <MagneticButton>
              <a href="mailto:vaibhavrvalakunde2006@gmail.com" className="group flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] text-white/40 hover:text-cyan-400 transition-colors px-5 py-3 border border-white/10 hover:border-cyan-400/40 bg-white/[0.02]">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full group-hover:animate-ping" />
                SAY HELLO
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="https://github.com/vaibhavrvalakunde2006-gif" className="font-mono text-[10px] tracking-[0.2em] text-white/25 hover:text-white transition-colors px-5 py-3 border border-white/[0.06] hover:border-white/20">
                GITHUB ↗
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="https://www.linkedin.com/in/vaibhav-r-valakunde-596a08398" className="font-mono text-[10px] tracking-[0.2em] text-white/25 hover:text-white transition-colors px-5 py-3 border border-white/[0.06] hover:border-white/20">
                LINKEDIN ↗
              </a>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right: 3D Portrait */}
        <motion.div
          className="lg:col-span-5 flex justify-center lg:justify-end perspective-[1000px]"
          style={{ x: imgX, y: imgY }}
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, scale: 0.5, filter: "blur(50px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 2, delay: 2.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-[400px] lg:h-[400px] group"
          >
            {/* Multi-layer glow */}
            <div className="absolute -inset-12 bg-cyan-500/[0.03] rounded-full blur-[80px] group-hover:bg-cyan-500/[0.08] transition-all duration-[2s]" style={{ transform: "translateZ(-60px)" }} />
            <div className="absolute -inset-4 bg-cyan-400/[0.02] rounded-full blur-[40px] group-hover:bg-cyan-400/[0.06] transition-all duration-[2s]" style={{ transform: "translateZ(-30px)" }} />

            {/* Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="absolute -inset-3 rounded-full border border-dashed border-white/[0.04]"
              style={{ transform: "translateZ(5px)" }}
            />
            <div className="absolute -inset-[2px] rounded-full border border-white/[0.06] group-hover:border-cyan-500/20 transition-colors duration-1000" style={{ transform: "translateZ(15px)" }} />

            {/* Image */}
            <div className="relative w-full h-full rounded-full overflow-hidden bg-[#080808] pulse-glow" style={{ transform: "translateZ(30px)" }}>
              <img
                src="/vaibhav-portrait.jpg"
                alt="Vaibhav R Valakunde"
                className="w-full h-full object-contain grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s]"
              />
              {/* Overlay shine on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/0 via-white/0 to-white/0 group-hover:from-cyan-500/10 group-hover:via-white/5 group-hover:to-transparent transition-all duration-[2s]" />
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 px-4 py-2 glass rounded-full font-mono text-[9px] tracking-widest"
              style={{ transform: "translateZ(70px)" }}
            >
              <span className="inline-block w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 animate-pulse" />
              <span className="text-emerald-400/80">AVAILABLE</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-8 -right-8 px-4 py-2 glass rounded-full font-mono text-[9px] text-white/40 tracking-widest"
              style={{ transform: "translateZ(70px)" }}
            >
              DBIT — BENGALURU
            </motion.div>
            <motion.div
              animate={{ x: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute top-1/2 -right-16 px-3 py-1.5 glass rounded-full font-mono text-[8px] text-cyan-400/50 tracking-widest hidden lg:block"
              style={{ transform: "translateZ(50px)" }}
            >
              2026
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4"
      >
        <motion.div className="w-5 h-8 border border-white/15 rounded-full flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-1 bg-white/40 rounded-full"
          />
        </motion.div>
        <span className="font-mono text-[8px] tracking-[0.4em] text-white/10 uppercase">Scroll</span>
      </motion.div>
    </section>
  );
}
