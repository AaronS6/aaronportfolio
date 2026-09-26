"use client";

import { motion, useReducedMotion as fmReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionDividerProps = {
  label: string;
  className?: string;
  align?: "left" | "center";
};

/**
 * SectionDivider — animated divider with a small label.
 * A luminous gradient line draws across, the label fades in with a dot.
 */
export function SectionDivider({
  label,
  className,
  align = "center",
}: SectionDividerProps) {
  const reduced = fmReducedMotion();

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-6xl px-6 py-14 sm:py-20",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3",
          align === "center" ? "justify-center" : "justify-start"
        )}
      >
        {/* Left line */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent to-line-strong"
          initial={reduced ? false : { width: 0, opacity: 0 }}
          whileInView={{ width: align === "center" ? 60 : 40, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 60 }}
        />

        {/* Dot before label */}
        <motion.span
          className="h-1 w-1 rounded-full bg-gradient-to-r from-lime to-coral"
          initial={reduced ? false : { scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Label */}
        <motion.span
          className="text-xs font-medium uppercase tracking-[0.25em] text-ink-faint"
          initial={reduced ? false : { opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {label}
        </motion.span>

        {/* Dot after label */}
        <motion.span
          className="h-1 w-1 rounded-full bg-gradient-to-r from-coral to-grape"
          initial={reduced ? false : { scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Right line */}
        <motion.div
          className="h-px bg-gradient-to-l from-transparent to-line-strong"
          initial={reduced ? false : { width: 0, opacity: 0 }}
          whileInView={{ width: align === "center" ? 60 : 40, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 60 }}
        />
      </div>
    </div>
  );
}
