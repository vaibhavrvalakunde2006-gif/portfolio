"use client";

import { motion } from "framer-motion";

const certs = [
  "Introduction to Vibe Coding with Gemini",
  "Machine Learning and Data Science — Skill Up",
  "Deloitte Australia — Data Analytics Job Simulation",
  "Tata — Data Visualisation: Empowering Business with Effective Insights Job Simulation",
  "JPMorganChase — Software Engineering Job Simulation"
];

const education = [
  { school: "DON BOSCO INSTITUTE OF TECHNOLOGY", loc: "Bengaluru", deg: "Bachelor of Engineering", date: "2024 – 2028" },
  { school: "UNIVERSAL PU COLLEGE", loc: "", deg: "PCMB", date: "2022 – 2024" },
  { school: "MH NATIONAL PUBLIC ENGLISH SCHOOL", loc: "", deg: "CBSE", date: "2012 – 2022" }
];

export function Certifications() {
  return (
    <section className="py-32 px-6 relative z-10 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
        
        {/* Certifications */}
        <div>
          <div className="font-mono text-xs text-white/30 uppercase tracking-[0.2em] mb-16">
            ( Certifications )
          </div>
          <div className="flex flex-col gap-4">
            {certs.map((cert, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="py-6 border-b border-white/10 hover:px-4 transition-all duration-300 cursor-default"
              >
                <p className="text-xl font-light text-white/80">{cert}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <div className="font-mono text-xs text-white/30 uppercase tracking-[0.2em] mb-16">
            ( Education )
          </div>
          <div className="flex flex-col gap-12">
            {education.map((edu, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-8 border-l border-white/20"
              >
                <div className="absolute top-0 -left-[5px] w-2.5 h-2.5 bg-white/20 rounded-full" />
                <h4 className="text-2xl font-medium tracking-tight mb-2 uppercase">{edu.school}</h4>
                <p className="text-lg text-white/60 font-light mb-4">{edu.deg} {edu.loc && `— ${edu.loc}`}</p>
                <div className="font-mono text-[10px] tracking-widest text-white/40 uppercase bg-white/5 inline-block px-3 py-1 border border-white/10">
                  {edu.date}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
