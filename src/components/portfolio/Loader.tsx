"use client";

import { motion, AnimatePresence, useReducedMotion as fmReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useUiStore } from "./ui-store";
import { profile } from "@/data/portfolio";

/**
 * Loader — intro animation on first paint.
 * Reduced-motion users skip straight to loaded (loader never renders).
 */
export function Loader() {
  const reduced = fmReducedMotion();
  const setLoaded = useUiStore((s) => s.setLoaded);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // reduced motion: no loader, just flip the loaded flag (async = OK)
    const duration = reduced ? 0 : 1900;
    const t = setTimeout(() => {
      setShow(false);
      setLoaded(true);
    }, duration);
    return () => clearTimeout(t);
  }, [reduced, setLoaded]);

  // reduced-motion: render nothing
  if (reduced) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* mesh tint behind */}
          <div className="absolute inset-0 mesh-bg opacity-50" />

          <div className="relative flex flex-col items-center gap-5">
            <motion.div
              className="overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="text-3xl font-semibold tracking-tight text-ink sm:text-5xl"
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              >
                {profile.name}
              </motion.div>
            </motion.div>

            <motion.div
              className="h-[3px] w-40 overflow-hidden rounded-full bg-line"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, var(--color-lime), var(--color-sun), var(--color-coral))",
                }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              />
            </motion.div>

            <motion.span
              className="text-xs uppercase tracking-[0.3em] text-ink-faint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Loading
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
