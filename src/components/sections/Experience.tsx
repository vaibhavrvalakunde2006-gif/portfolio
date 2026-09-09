"use client";

import { motion } from "framer-motion";
import { TextScramble } from "@/components/ui/Effects";

const responsibilities = [
  "Professional project workflows & agile methodology",
  "Technical & problem-solving skills development",
  "Team collaboration & communication",
  "Git / GitHub version control & CI/CD",
  "Data analytics methodologies & visualization",
];

export function Experience() {
  return (
    <section id="experience" className="relative py-40 px-8 bg-[#030303]/80 backdrop-blur-sm">
      <div className="max-w-[1600px] mx-auto">
        {/* Section header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                className="h-px w-12 bg-white/20 origin-left"
              />
              <span className="font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase">Experience</span>
            </div>
          </div>
          <div className="lg:col-span-9">
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight"
              >
                Where I've <span className="text-white/30">worked.</span>
              </motion.h2>
            </div>
          </div>
        </div>

        {/* Experience card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative border border-white/[0.06] bg-white/[0.01] overflow-hidden group interactive cursor-default"
        >
          {/* Top accent */}
          <div className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-[1.5s] ease-out" />

          {/* Content */}
          <div className="p-10 sm:p-16 lg:p-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Left */}
              <div className="lg:col-span-5">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="inline-block font-mono text-[10px] tracking-widest text-cyan-400 border border-cyan-400/20 px-4 py-2 bg-cyan-400/[0.03] mb-8"
                >
                  AUG 2026 — PRESENT
                </motion.div>

                <div className="overflow-hidden mb-3">
                  <motion.h3
                    initial={{ y: "100%" }}
                    whileInView={{ y: "0%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight uppercase"
                  >
                    WORKORA
                  </motion.h3>
                </div>
                <div className="overflow-hidden mb-8">
                  <motion.h3
                    initial={{ y: "100%" }}
                    whileInView={{ y: "0%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight uppercase text-white/30"
                  >
                    LABS
                  </motion.h3>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-lg text-white/40 font-light"
                >
                  Data Analytics Intern
                </motion.p>
              </div>

              {/* Right */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <p className="font-mono text-[9px] uppercase tracking-widest text-white/20 mb-8">What I'm learning</p>
                <div className="flex flex-col">
                  {responsibilities.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                      className="flex items-center gap-6 py-5 border-b border-white/[0.04] group/item hover:pl-4 hover:border-white/[0.08] transition-all duration-500"
                    >
                      <span className="font-mono text-[10px] text-white/15 tabular-nums shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-base text-white/50 font-light group-hover/item:text-white/80 transition-colors">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom decoration */}
          <div className="px-10 sm:px-16 lg:px-20 pb-10 sm:pb-16 lg:pb-20">
            <div className="flex items-center gap-4 font-mono text-[9px] tracking-widest text-white/10">
              <span className="w-2 h-2 bg-emerald-400/30 rounded-full" />
              <span>CURRENTLY ACTIVE</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
