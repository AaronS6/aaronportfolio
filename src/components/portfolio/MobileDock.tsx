"use client";

import { motion, useReducedMotion as fmReducedMotion } from "framer-motion";
import { Home, Layers, Code, Award, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { useActiveSection } from "./hooks";

const items = [
  { id: "home", label: "Home", icon: Home },
  { id: "works", label: "Works", icon: Layers },
  { id: "code", label: "Code", icon: Code },
  { id: "awards", label: "Awards", icon: Award },
  { id: "contact", label: "Talk", icon: Mail },
];

/**
 * MobileDock — bottom nav for small screens.
 * Shows 5 primary destinations with an active indicator.
 */
export function MobileDock() {
  const ids = items.map((i) => i.id);
  const active = useActiveSection(ids);
  const reduced = fmReducedMotion();

  const go = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <motion.div
      className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 md:hidden"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
    >
      <nav className="glass-pill flex items-center gap-1 rounded-full p-1.5">
        {items.map((item) => {
          const isActive = active === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative flex h-11 w-11 items-center justify-center rounded-full transition-colors",
                isActive ? "text-ink" : "text-ink-faint hover:text-ink-soft"
              )}
            >
              {isActive && (
                <motion.span
                  className="absolute inset-0 rounded-full bg-paper/80"
                  layoutId="mobile-dock-active"
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
              <Icon size={18} className="relative z-10" strokeWidth={2} />
            </button>
          );
        })}
      </nav>
    </motion.div>
  );
}
