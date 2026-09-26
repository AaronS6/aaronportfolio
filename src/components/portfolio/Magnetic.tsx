"use client";

import { motion, useMotionValue, useSpring, useReducedMotion as fmReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number; // px pull at the edge
  as?: "div" | "a" | "button" | "span";
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
};

/**
 * Magnetic — children gently pull toward the cursor on hover.
 * Respects prefers-reduced-motion (no transform).
 */
export function Magnetic({
  children,
  className,
  strength = 18,
  as = "div",
  href,
  onClick,
  ariaLabel,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = fmReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    const maxDist = Math.max(rect.width, rect.height) / 2;
    const pull = strength / maxDist;
    x.set(relX * pull);
    y.set(relY * pull);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      ref={ref as never}
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={cn("inline-block", className)}
    >
      {children}
    </MotionTag>
  );
}
