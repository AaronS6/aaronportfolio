"use client";

import { motion } from "framer-motion";
import { Command } from "lucide-react";
import { useUiStore } from "./ui-store";

/**
 * MobileCommandTrigger — a small floating button (bottom-left on mobile)
 * that opens the command palette. Hidden on md+ (desktop uses ⌘K).
 */
export function MobileCommandTrigger() {
  const toggleCommand = useUiStore((s) => s.toggleCommand);

  return (
    <motion.button
      onClick={toggleCommand}
      aria-label="Open command palette"
      className="glass glass-hover fixed bottom-24 left-5 z-40 flex h-11 w-11 items-center justify-center rounded-full text-ink-soft hover:text-ink md:hidden"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
    >
      <Command size={18} />
    </motion.button>
  );
}
