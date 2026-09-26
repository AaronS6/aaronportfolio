"use client";

import { motion, AnimatePresence, useReducedMotion as fmReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useUiStore } from "./ui-store";
import { profile } from "@/data/portfolio";

/**
 * Loader — premium intro animation.
 * Letters rise up one by one, progress bar fills, then fades out.
 */
export function Loader() {
  const reduced = fmReducedMotion();
  const setLoaded = useUiStore((s) => s.setLoaded);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const duration = reduced ? 0 : 2600;
    const t = setTimeout(() => {
      setShow(false);
      setLoaded(true);
    }, duration);
    return () => clearTimeout(t);
  }, [reduced, setLoaded]);

  if (reduced) return null;

  // Split name into individual letters for staggered animation
  const nameLetters = profile.name.split("");

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Animated gradient orbs in background */}
          <motion.div
            className="absolute h-[400px] w-[400px] rounded-full opacity-30 blur-3xl"
            style={{ background: "var(--color-lime)" }}
            animate={{
              x: [-100, 80, -100],
              y: [-50, 60, -50],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute h-[350px] w-[350px] rounded-full opacity-25 blur-3xl"
            style={{ background: "var(--color-coral)" }}
            animate={{
              x: [120, -60, 120],
              y: [60, -40, 60],
              scale: [1.1, 0.7, 1.1],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute h-[300px] w-[300px] rounded-full opacity-20 blur-3xl"
            style={{ background: "var(--color-sky)" }}
            animate={{
              x: [0, 100, 0],
              y: [80, -60, 80],
              scale: [0.9, 1.2, 0.9],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Content */}
          <div className="relative flex flex-col items-center gap-6">
            {/* Animated name — letters rise up one by one */}
            <div className="flex overflow-hidden">
              {nameLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  className="text-4xl font-semibold tracking-tight text-ink sm:text-6xl"
                  initial={{ y: "120%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.1 + i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
              {/* Period with accent color */}
              <motion.span
                className="text-4xl font-semibold tracking-tight text-gradient-warm sm:text-6xl"
                initial={{ y: "120%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.7,
                  delay: 0.1 + nameLetters.length * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                .
              </motion.span>
            </div>

            {/* Progress bar — fills with gradient */}
            <motion.div
              className="h-[3px] w-44 overflow-hidden rounded-full bg-line"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "11rem" }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, var(--color-lime), var(--color-sun), var(--color-coral), var(--color-grape))",
                  backgroundSize: "200% 100%",
                }}
                initial={{ width: "0%" }}
                animate={{ width: "100%", backgroundPosition: ["0% 0%", "200% 0%"] }}
                transition={{
                  width: { duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 },
                  backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" },
                }}
              />
            </motion.div>

            {/* Loading text with animated dots */}
            <motion.div
              className="flex items-center gap-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <motion.span
                className="text-xs uppercase tracking-[0.3em] text-ink-faint"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                Loading
              </motion.span>
              <div className="flex gap-1">
                {[0, 1, 2].map((dot) => (
                  <motion.span
                    key={dot}
                    className="h-1 w-1 rounded-full bg-ink-faint"
                    animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: dot * 0.2,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Subtle grid overlay for texture */}
          <div
            className="absolute inset-0 opacity-[0.015] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(var(--ink) 1px, transparent 1px), linear-gradient(90deg, var(--ink) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
