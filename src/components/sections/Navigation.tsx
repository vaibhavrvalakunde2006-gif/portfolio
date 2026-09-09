"use client";

import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useState } from "react";

const navItems = [
  { label: "HOME", href: "#" },
  { label: "ABOUT", href: "#about" },
  { label: "WORK", href: "#work" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "SKILLS", href: "#skills" },
  { label: "HACKATHONS", href: "#achievements" },
  { label: "CONTACT", href: "#contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  return (
    <>
      {/* Top bar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
        className="fixed top-0 left-0 w-full z-50 px-8 py-5 flex items-center justify-between pointer-events-none"
      >
        <a href="/" className="pointer-events-auto interactive">
          <motion.span
            whileHover={{ scale: 1.1 }}
            className="font-mono text-xs font-bold tracking-[0.3em] text-white/80 uppercase inline-block"
          >
            V<span className="text-cyan-400">.</span>R<span className="text-cyan-400">.</span>V
          </motion.span>
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="pointer-events-auto interactive relative w-12 h-12 flex flex-col items-center justify-center gap-1.5 group"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 5, width: 24 } : { rotate: 0, y: 0, width: 24 }}
            className="block h-[1px] bg-white group-hover:bg-cyan-400 transition-colors origin-center"
          />
          <motion.span
            animate={isOpen ? { opacity: 0, width: 0 } : { opacity: 1, width: 16 }}
            className="block h-[1px] bg-white group-hover:bg-cyan-400 transition-colors self-end"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -5, width: 24 } : { rotate: 0, y: 0, width: 24 }}
            className="block h-[1px] bg-white group-hover:bg-cyan-400 transition-colors origin-center"
          />
        </button>
      </motion.nav>

      {/* Scroll progress line */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-cyan-400 z-[51] origin-left"
      />

      {/* Side scroll progress */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3"
      >
        <div className="h-24 w-[1px] bg-white/[0.06] relative overflow-hidden">
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute inset-0 bg-cyan-400 origin-top"
          />
        </div>
      </motion.div>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 32px) 28px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 32px) 28px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 32px) 28px)" }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-40 bg-[#030303]/98 backdrop-blur-2xl flex items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-6">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="interactive text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white/60 hover:text-white hover:tracking-wider transition-all duration-500"
                >
                  {item.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex gap-8 mt-16"
              >
                <a href="https://github.com/vaibhavrvalakunde2006-gif" className="interactive font-mono text-[10px] tracking-widest text-white/30 hover:text-cyan-400 transition-colors">GITHUB ↗</a>
                <a href="https://www.linkedin.com/in/vaibhav-r-valakunde-596a08398" className="interactive font-mono text-[10px] tracking-widest text-white/30 hover:text-cyan-400 transition-colors">LINKEDIN ↗</a>
                <a href="mailto:vaibhavrvalakunde2006@gmail.com" className="interactive font-mono text-[10px] tracking-widest text-white/30 hover:text-cyan-400 transition-colors">EMAIL ↗</a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
