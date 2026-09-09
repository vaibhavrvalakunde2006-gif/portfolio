"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const hackathons = [
  { id: "01", name: "RNS INSTITUTE OF TECHNOLOGY HACKATHON", project: "MEDSCAN AI", focus: "Hackathon project built at RNS Institute of Technology.", flow: ["HACKATHON", "IDEA", "BUILD"] },
  { id: "02", name: "SJB INSTITUTE OF TECHNOLOGY HACKATHON", project: "RAKSHAK AI", focus: "Hackathon project built at SJB Institute of Technology.", flow: ["HACKATHON", "IDEA", "BUILD"] },
];

const certs = [
  "Introduction to Vibe Coding with Gemini",
  "Machine Learning and Data Science — Skill Up",
  "Deloitte Australia — Data Analytics Job Simulation",
  "Tata — Data Visualisation: Empowering Business with Effective Insights",
  "JPMorganChase — Software Engineering Job Simulation",
];

const education = [
  { school: "DON BOSCO INSTITUTE OF TECHNOLOGY", loc: "Bengaluru", deg: "Bachelor of Engineering", date: "2024 – 2028" },
  { school: "UNIVERSAL PU COLLEGE", loc: "", deg: "PCMB", date: "2022 – 2024" },
  { school: "MH NATIONAL PUBLIC ENGLISH SCHOOL", loc: "", deg: "CBSE", date: "2012 – 2022" },
];

export function Achievements() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="achievements" ref={ref} className="relative py-40 px-8 overflow-hidden bg-[#030303]/80 backdrop-blur-sm">
      {/* Parallax background text */}
      <motion.div
        style={{ y: bgY }}
        className="absolute left-0 top-1/4 text-[18vw] font-bold tracking-tighter text-outline-thick leading-none opacity-20 pointer-events-none select-none whitespace-nowrap"
      >
        HACKATHONS
      </motion.div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Hackathons */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-24">
            <div className="h-px w-12 bg-white/20" />
            <span className="font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase">Hackathons</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/[0.04]">
            {hackathons.map((h, i) => (
              <motion.div
                key={h.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className="interactive bg-black p-10 lg:p-16 group hover:bg-white/[0.02] transition-colors relative overflow-hidden cursor-default"
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-cyan-400 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-1000" />

                <div className="flex items-start justify-between mb-12">
                  <span className="text-6xl font-bold text-white/[0.04] group-hover:text-white/[0.08] transition-colors">{h.id}</span>
                  <span className="font-mono text-[9px] tracking-widest text-white/20 uppercase">{h.name}</span>
                </div>

                <h4 className="text-3xl lg:text-4xl font-medium tracking-tight uppercase mb-6 group-hover:text-cyan-400 transition-colors duration-500">
                  {h.project}
                </h4>
                <p className="text-base text-white/40 font-light mb-10 max-w-md">{h.focus}</p>

                <div className="flex flex-wrap items-center gap-2">
                  {h.flow.map((step, idx) => (
                    <span key={idx} className="flex items-center gap-2">
                      <span className="font-mono text-[9px] tracking-wider text-white/50 border border-white/[0.08] px-3 py-1.5">{step}</span>
                      {idx < h.flow.length - 1 && <span className="text-white/10 text-xs">→</span>}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications & Education */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Certifications */}
          <div>
            <div className="flex items-center gap-4 mb-16">
              <div className="h-px w-12 bg-white/20" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase">Certifications</span>
            </div>
            <div className="flex flex-col">
              {certs.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="interactive py-6 border-b border-white/[0.06] hover:pl-4 hover:border-white/10 transition-all duration-500 cursor-default group"
                >
                  <p className="text-base font-light text-white/60 group-hover:text-white/90 transition-colors">{cert}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-4 mb-16">
              <div className="h-px w-12 bg-white/20" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase">Education</span>
            </div>
            <div className="flex flex-col gap-12">
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative pl-8 border-l border-white/10"
                >
                  <div className="absolute top-1 -left-[4px] w-2 h-2 bg-white/10 rounded-full" />
                  <h4 className="text-xl font-medium tracking-tight uppercase mb-2">{edu.school}</h4>
                  <p className="text-sm text-white/40 font-light mb-3">
                    {edu.deg}{edu.loc ? ` — ${edu.loc}` : ""}
                  </p>
                  <span className="font-mono text-[10px] tracking-widest text-white/20 uppercase">
                    {edu.date}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
