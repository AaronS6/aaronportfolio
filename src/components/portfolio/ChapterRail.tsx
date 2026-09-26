"use client";

import { motion, useReducedMotion as fmReducedMotion } from "framer-motion";
import {
  Home,
  Images,
  User,
  Briefcase,
  Code2,
  Sparkles,
  Route,
  Trophy,
  HelpCircle,
  Mail,
} from "lucide-react";
import { chapters } from "@/data/portfolio";
import { useActiveSection } from "./hooks";
import { cn } from "@/lib/utils";

const iconMap: Record<string, typeof Home> = {
  home: Home,
  intro: Images,
  about: User,
  works: Briefcase,
  code: Code2,
  skills: Sparkles,
  timeline: Route,
  awards: Trophy,
  faq: HelpCircle,
  contact: Mail,
};

/**
 * ChapterRail — desktop-only right-side icons.
 * Each icon represents a chapter; the active one is highlighted.
 */
export function ChapterRail() {
  const ids = chapters.map((c) => c.id);
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
    <div className="pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <div className="pointer-events-auto">
        <motion.ul
          className="glass flex flex-col items-center gap-1 rounded-full p-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {chapters.map((c) => {
            const isActive = active === c.id;
            const Icon = iconMap[c.id] ?? Home;
            return (
              <li key={c.id}>
                <button
                  onClick={() => go(c.id)}
                  className="group relative flex items-center justify-center"
                  aria-label={`Jump to ${c.label}`}
                  title={c.label}
                >
                  {/* active glow */}
                  {isActive && (
                    <motion.span
                      layoutId="chapter-rail-active"
                      className="absolute inset-0 rounded-full bg-ink/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <motion.div
                    className={cn(
                      "relative flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-300",
                      isActive
                        ? "bg-ink text-paper"
                        : "text-ink-faint hover:text-ink hover:bg-paper/60"
                    )}
                    whileHover={!reduced ? { scale: 1.1 } : undefined}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={15} strokeWidth={isActive ? 2.5 : 2} />
                  </motion.div>

                  {/* tooltip on hover */}
                  <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-ink px-2.5 py-1 text-[0.65rem] font-medium text-paper opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    {c.label}
                  </span>
                </button>
              </li>
            );
          })}
        </motion.ul>
      </div>
    </div>
  );
}
