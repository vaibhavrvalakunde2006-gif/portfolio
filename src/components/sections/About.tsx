"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const interests = [
  { label: "AI / ML", desc: "Machine learning models & intelligent systems", icon: "◆" },
  { label: "Data Analytics", desc: "Turning raw data into actionable insights", icon: "◇" },
  { label: "Software Engineering", desc: "Building robust, scalable applications", icon: "△" },
  { label: "Backend Development", desc: "APIs, databases & server architecture", icon: "○" },
  { label: "Real-world Solutions", desc: "Practical tools for actual problems", icon: "□" },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section id="about" ref={ref} className="relative min-h-screen py-40 px-8 overflow-hidden bg-[#030303]/80 backdrop-blur-sm">
      {/* Parallax watermark */}
      <motion.div
        style={{ y: bgY }}
        className="absolute -right-10 top-1/4 text-[22vw] font-bold tracking-tighter text-outline-thick leading-none opacity-20 pointer-events-none select-none"
      >
        ABOUT
      </motion.div>

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="lg:col-span-3 flex items-start pt-4"
        >
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-px w-12 bg-white/20 origin-left"
            />
            <span className="font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase">About</span>
          </div>
        </motion.div>

        <div className="lg:col-span-9 flex flex-col gap-24">
          {/* Bio — split into lines for reveal effect */}
          <div className="flex flex-col gap-2">
            {[
              { text: "I'm ", highlight: false },
              { text: "Vaibhav R Valakunde", highlight: true },
              { text: ", an engineering student at", highlight: false },
              { text: " Don Bosco Institute of Technology", highlight: true },
              { text: ", Bengaluru.", highlight: false },
            ].map((part, i) => (
              <div key={i} className="overflow-hidden inline">
                <motion.span
                  initial={{ y: 60, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={`text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-[1.2] inline ${part.highlight ? "text-white" : "text-white/35"}`}
                >
                  {part.text}
                </motion.span>
              </div>
            ))}
          </div>

          {/* Philosophy strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="py-8 border-y border-white/[0.06]"
          >
            <div className="flex flex-wrap items-center gap-6 text-xl sm:text-2xl font-medium tracking-tight">
              {["LEARN", "BUILD", "BREAK", "FIX", "REPEAT"].map((word, i) => (
                <span key={word} className="flex items-center gap-6">
                  <motion.span
                    whileHover={{ color: "#00e5ff", y: -3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="interactive cursor-default text-white/50"
                  >
                    {word}
                  </motion.span>
                  {i < 4 && <span className="text-white/[0.06] text-xl">✦</span>}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Interests grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04]">
            {interests.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="interactive bg-[#030303] p-8 group hover:bg-white/[0.02] transition-all duration-500 cursor-default relative overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-cyan-400 transition-all duration-700 ease-out" />
                <span className="text-2xl text-white/[0.06] group-hover:text-cyan-400/20 transition-colors duration-500 block mb-6">
                  {item.icon}
                </span>
                <h4 className="text-lg font-medium mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                  {item.label}
                </h4>
                <p className="text-sm text-white/25 font-light leading-relaxed group-hover:text-white/40 transition-colors">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-3 gap-8 py-12 border-t border-white/[0.06]"
          >
            {[
              { label: "Projects Built", value: "5+" },
              { label: "Hackathons", value: "2+" },
              { label: "Certifications", value: "5+" },
            ].map((stat, i) => (
              <div key={stat.label} className="text-center">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.5 }}
                  className="text-4xl lg:text-5xl font-bold text-white/90 block mb-2"
                >
                  {stat.value}
                </motion.span>
                <span className="font-mono text-[9px] tracking-widest text-white/20 uppercase">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
