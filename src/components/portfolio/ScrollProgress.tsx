"use client";

import { motion, useReducedMotion as fmReducedMotion } from "framer-motion";
import { useScrollProgress } from "./hooks";

/**
 * ScrollProgress — top progress bar (lime → sun → coral).
 */
export function ScrollProgress() {
  const progress = useScrollProgress();
  const reduced = fmReducedMotion();

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left"
      style={{
        scaleX: progress,
        background:
          "linear-gradient(90deg, var(--color-lime), var(--color-sun) 40%, var(--color-peach) 70%, var(--color-coral))",
        opacity: progress > 0.001 ? 1 : 0,
        transition: reduced ? "none" : "opacity 0.3s ease",
      }}
    />
  );
}
