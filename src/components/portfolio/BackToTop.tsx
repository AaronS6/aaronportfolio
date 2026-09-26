"use client";

import { motion, AnimatePresence, useReducedMotion as fmReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useScrolled } from "./hooks";

/**
 * BackToTop — appears after scrolling; smooth-scrolls to top.
 */
export function BackToTop() {
  const scrolled = useScrolled(800);
  const reduced = fmReducedMotion();

  return (
    <AnimatePresence>
      {scrolled && (
        <motion.button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: reduced ? "auto" : "smooth",
            })
          }
          aria-label="Back to top"
          className="glass glass-hover fixed bottom-24 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full text-ink-soft hover:text-ink md:bottom-6"
          initial={{ opacity: 0, scale: 0.6, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 10 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
