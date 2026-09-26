"use client";

import { motion, useReducedMotion as fmReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  as?: "div" | "section" | "li" | "article" | "span";
};

/**
 * Reveal — smooth fade + rise when scrolled into view.
 * Uses a spring-like easing for a polished feel.
 * Respects prefers-reduced-motion (renders static).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  once = true,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = fmReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduced) {
    return (
      <MotionTag ref={ref as never} className={cn(className)}>
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      ref={ref as never}
      className={cn(className)}
      initial={{ opacity: 0, y, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
