"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { stiffness: 200, damping: 30 });
  const ringY = useSpring(cursorY, { stiffness: 200, damping: 30 });
  const isHovering = useRef(false);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 4);
      cursorY.set(e.clientY - 4);
    };

    const addHover = () => {
      isHovering.current = true;
      ringRef.current?.classList.add("hovering");
    };

    const removeHover = () => {
      isHovering.current = false;
      ringRef.current?.classList.remove("hovering");
    };

    window.addEventListener("mousemove", move);

    const interactives = document.querySelectorAll("a, button, [role='button'], .interactive");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="cursor-dot hidden md:block"
        style={{ left: cursorX, top: cursorY }}
      />
      <motion.div
        ref={ringRef}
        className="cursor-ring hidden md:block"
        style={{
          left: ringX,
          top: ringY,
          x: -16,
          y: -16,
        }}
      />
    </>
  );
}
