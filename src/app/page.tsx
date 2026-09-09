"use client";

import dynamic from "next/dynamic";
import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Works } from "@/components/sections/Works";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Achievements } from "@/components/sections/Hackathons";
import { Contact } from "@/components/sections/Contact";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Loader } from "@/components/ui/Loader";
import { Marquee, MarqueeReverse } from "@/components/ui/Marquee";
import { GradientBackground } from "@/components/ui/GradientBackground";

const Scene = dynamic(
  () => import("@/components/canvas/Scene").then((m) => ({ default: m.Scene })),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="relative bg-[#030303] min-h-screen text-white overflow-x-hidden noise">
      <Loader />
      <SmoothScroll />

      {/* Layered backgrounds: gradient mesh + 3D particles */}
      <GradientBackground />
      <Scene />

      <CustomCursor />
      <Navigation />

      <div className="relative" style={{ zIndex: 2 }}>
        <Hero />
        <Marquee text="BUILDER ✦ AI ✦ DATA ✦ SOFTWARE" speed={25} />
        <MarqueeReverse text="VAIBHAV R VALAKUNDE — CREATIVE DEVELOPER — DBIT BENGALURU" speed={30} />
        <About />
        <Marquee text="SELECTED WORKS" speed={15} filled />
        <Works />
        <Marquee text="LEARN ✦ BUILD ✦ BREAK ✦ FIX ✦ REPEAT" speed={30} />
        <Experience />
        <Skills />
        <Achievements />
        <Contact />
      </div>
    </main>
  );
}
