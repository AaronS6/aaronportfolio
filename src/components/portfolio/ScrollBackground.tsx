"use client";

import { motion, useReducedMotion as fmReducedMotion } from "framer-motion";

/**
 * ScrollBackground — fixed gradient-mesh background with floating glass orbs.
 * Sits behind everything (z -10). Purely decorative.
 */
export function ScrollBackground() {
  const reduced = fmReducedMotion();

  const orbs = [
    { size: 320, top: "8%", left: "5%", color: "var(--color-lime)", delay: 0 },
    { size: 260, top: "60%", left: "78%", color: "var(--color-sky)", delay: 2 },
    { size: 200, top: "30%", left: "85%", color: "var(--color-peach)", delay: 4 },
    { size: 380, top: "75%", left: "10%", color: "var(--color-grape)", delay: 1 },
    { size: 180, top: "45%", left: "40%", color: "var(--color-sun)", delay: 3 },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base wash */}
      <div className="absolute inset-0 bg-bg" />
      <div className="absolute inset-0 mesh-bg opacity-70" />

      {/* orbs */}
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          className="orb"
          style={{
            width: o.size,
            height: o.size,
            top: o.top,
            left: o.left,
            background: o.color,
          }}
          animate={
            reduced
              ? undefined
              : {
                  x: [0, 30, -20, 0],
                  y: [0, -40, 30, 0],
                  scale: [1, 1.1, 0.95, 1],
                }
          }
          transition={{
            duration: 18 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: o.delay,
          }}
        />
      ))}

      {/* subtle top + bottom fade so sections feel grounded */}
      <div
        className="absolute inset-x-0 top-0 h-32"
        style={{
          background:
            "linear-gradient(to bottom, var(--bg), transparent)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{
          background:
            "linear-gradient(to top, var(--bg), transparent)",
        }}
      />
    </div>
  );
}
