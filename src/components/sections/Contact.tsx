"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/Effects";

export function Contact() {
  return (
    <section id="contact" className="relative min-h-screen flex flex-col justify-center py-40 px-8 overflow-hidden bg-[#030303]">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] bg-cyan-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* Giant watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[30vw] font-bold tracking-tighter text-white/[0.03] leading-none">
          SAY HI
        </span>
      </div>

      <div className="max-w-[1600px] mx-auto w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-4 mb-20"
        >
          <div className="h-px w-12 bg-white/30" />
          <span className="font-mono text-[10px] tracking-[0.3em] text-cyan-400 uppercase">Get in touch</span>
          <div className="h-px w-12 bg-white/30" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl sm:text-[10vw] lg:text-[12vw] font-bold tracking-[-0.04em] leading-[0.85] text-white mb-4"
        >
          LET'S BUILD
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-6xl sm:text-[10vw] lg:text-[12vw] font-bold tracking-[-0.04em] leading-[0.85] text-white/40 mb-20"
        >
          SOMETHING.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg text-white/50 font-light mb-20 max-w-md mx-auto"
        >
          Have an idea, project or opportunity? Let's create something meaningful together.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <MagneticButton>
            <a
              href="mailto:vaibhavrvalakunde2006@gmail.com"
              className="block px-12 py-5 bg-white text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-cyan-400 transition-colors duration-500"
            >
              GET IN TOUCH
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="https://github.com/vaibhavrvalakunde2006-gif"
              className="block px-12 py-5 border border-white/30 text-white/80 font-mono text-xs uppercase tracking-widest hover:border-white hover:text-white hover:bg-white/5 transition-all duration-500"
            >
              GITHUB
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="https://www.linkedin.com/in/vaibhav-r-valakunde-596a08398"
              className="block px-12 py-5 border border-white/30 text-white/80 font-mono text-xs uppercase tracking-widest hover:border-white hover:text-white hover:bg-white/5 transition-all duration-500"
            >
              LINKEDIN
            </a>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 1 }}
        className="max-w-[1600px] mx-auto w-full mt-40 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-[10px] text-white/30 tracking-widest"
      >
        <span>VAIBHAV R VALAKUNDE</span>
        <span>DESIGNED & DEVELOPED — {new Date().getFullYear()}</span>
      </motion.div>
    </section>
  );
}
