"use client";

import { motion } from "framer-motion";

const skillGroups = [
  { name: "PROGRAMMING", skills: ["Python"], icon: "⟨/⟩", color: "cyan" },
  { name: "DATA", skills: ["SQL", "Data Analytics", "Data Science", "Machine Learning"], icon: "◈", color: "indigo" },
  { name: "BACKEND", skills: ["Flask", "REST APIs"], icon: "⚙", color: "emerald" },
  { name: "TOOLS", skills: ["Git", "GitHub", "Streamlit"], icon: "⬡", color: "amber" },
];

const colorMap: Record<string, string> = {
  cyan: "group-hover:text-cyan-400 group-hover:border-cyan-400/20",
  indigo: "group-hover:text-indigo-400 group-hover:border-indigo-400/20",
  emerald: "group-hover:text-emerald-400 group-hover:border-emerald-400/20",
  amber: "group-hover:text-amber-400 group-hover:border-amber-400/20",
};

const accentMap: Record<string, string> = {
  cyan: "bg-cyan-400",
  indigo: "bg-indigo-400",
  emerald: "bg-emerald-400",
  amber: "bg-amber-400",
};

export function Skills() {
  return (
    <section id="skills" className="relative py-40 px-8 bg-[#030303]/80 backdrop-blur-sm">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                className="h-px w-12 bg-white/20 origin-left"
              />
              <span className="font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase">Capabilities</span>
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
                What I <span className="text-white/30">work with.</span>
              </motion.h2>
            </div>
          </div>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04]">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="interactive bg-[#030303] p-10 group hover:bg-white/[0.02] transition-all duration-700 cursor-default relative overflow-hidden"
            >
              {/* Bottom accent line */}
              <div className={`absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full ${accentMap[group.color]} transition-all duration-1000 ease-out`} />

              {/* Icon */}
              <motion.span
                whileHover={{ scale: 1.2 }}
                className={`text-3xl text-white/[0.06] ${colorMap[group.color].split(" ")[0]} transition-colors duration-500 block mb-8`}
              >
                {group.icon}
              </motion.span>

              {/* Category */}
              <h4 className={`font-mono text-[10px] uppercase tracking-widest text-white/25 ${colorMap[group.color].split(" ")[0]} transition-colors mb-8 pb-4 border-b border-white/[0.06] ${colorMap[group.color].split(" ")[1]}`}>
                {group.name}
              </h4>

              {/* Skills */}
              <ul className="flex flex-col gap-4">
                {group.skills.map((skill, j) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + j * 0.05 + 0.3 }}
                    className="text-lg font-light text-white/50 group-hover:text-white/80 transition-colors duration-500"
                  >
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
