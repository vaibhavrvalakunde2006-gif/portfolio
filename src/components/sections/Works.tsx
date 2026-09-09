"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { projects } from "@/data/projects";

const ProjectScene = dynamic(
  () => import("@/components/canvas/ProjectScenes").then((m) => ({ default: m.ProjectScene })),
  { ssr: false }
);

function FullScreenProject({ project }: { project: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [120, 0, -80]);
  const counterOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      className="relative h-screen w-full overflow-hidden group cursor-default"
    >
      {/* 3D Scene background */}
      <motion.div style={{ scale: imgScale }} className="absolute inset-0">
        <ProjectScene projectId={project.id} />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-[#030303]/60 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/60 to-transparent pointer-events-none" />

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
      }} />

      {/* Giant background number */}
      <motion.div
        style={{ opacity: counterOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
      >
        <span className="text-[40vw] font-bold leading-none text-white/[0.02] tracking-tighter">
          {project.id}
        </span>
      </motion.div>

      {/* Content */}
      <div className="absolute inset-0 flex items-end z-10">
        <motion.div style={{ y: textY }} className="w-full p-8 sm:p-12 lg:p-20 pb-20">
          <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-cyan-400 uppercase">
                  Project {project.id} / {String(projects.length).padStart(2, "0")}
                </span>
              </motion.div>

              <div className="overflow-hidden mb-3">
                <motion.h3
                  initial={{ y: "100%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[14vw] sm:text-[10vw] lg:text-[7vw] font-bold tracking-[-0.04em] leading-[0.85] uppercase"
                >
                  {project.title}
                </motion.h3>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-sm sm:text-base text-white/40 font-light max-w-xl leading-relaxed"
              >
                {project.description}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:text-right shrink-0"
            >
              <p className="font-mono text-[9px] uppercase tracking-widest text-white/20 mb-4">Stack</p>
              <div className="flex flex-wrap lg:justify-end gap-1.5">
                {project.tech.map((t: string, idx: number) => (
                  <span
                    key={idx}
                    className="font-mono text-[10px] text-white/35 border border-white/[0.08] px-3 py-1.5 bg-white/[0.02] backdrop-blur-sm hover:text-cyan-400 hover:border-cyan-400/30 transition-all cursor-default"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Side vertical text */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <span className="font-mono text-[9px] tracking-[0.3em] text-white/[0.08] [writing-mode:vertical-lr] uppercase">
          {project.subtitle}
        </span>
      </div>

      {/* Top edge blend */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#030303] to-transparent pointer-events-none" />
    </motion.div>
  );
}

export function Works() {
  return (
    <section id="work" className="relative bg-[#030303]/80 backdrop-blur-sm">
      <div className="max-w-[1600px] mx-auto px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-px w-12 bg-white/20 origin-left"
            />
            <span className="font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase">Selected Works</span>
          </div>
          <span className="font-mono text-[10px] tracking-widest text-white/15">
            {String(projects.length).padStart(2, "0")} PROJECTS
          </span>
        </motion.div>
      </div>

      {projects.map((project) => (
        <FullScreenProject key={project.id} project={project} />
      ))}
    </section>
  );
}
