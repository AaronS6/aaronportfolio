"use client";

import { motion, useReducedMotion as fmReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { navLinks, profile, chapters } from "@/data/portfolio";
import { ThemeToggle } from "./ThemeToggle";
import { Magnetic } from "./Magnetic";
import { cn } from "@/lib/utils";

/**
 * Navbar
 * - Desktop (md+): floating glass pill — "Aaron Shan." + nav links + "Let's talk" + theme toggle
 * - Mobile: just the theme toggle at top-left. Navigation is handled by the MobileDock at the bottom.
 */
export function Navbar() {
  const reduced = fmReducedMotion();

  const go = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  };

  return (
    <>
      {/* ---------- Desktop ---------- */}
      <header className="pointer-events-none fixed inset-x-0 top-4 z-50 hidden md:flex justify-center px-6">
        <motion.nav
          className="pointer-events-auto glass-pill flex items-center gap-1 rounded-full p-1.5 pl-5"
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <button
            onClick={() => go("#home")}
            className="pr-3 text-sm font-semibold tracking-tight text-ink hover:text-ink-soft transition-colors"
          >
            {profile.firstName} {profile.lastName}.
          </button>

          <div className="h-5 w-px bg-line-strong" />

          <div className="flex items-center">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => go(link.href)}
                className="rounded-full px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-paper/60 hover:text-ink"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="ml-1 flex items-center gap-2">
            <Magnetic strength={10} as="button">
              <button
                onClick={() => go("#contact")}
                className="glass glass-hover rounded-full px-4 py-2 text-sm font-medium text-ink transition-colors"
              >
                Let&apos;s talk
              </button>
            </Magnetic>

            <ThemeToggle size="sm" />
          </div>
        </motion.nav>
      </header>

      {/* ---------- Mobile: just theme toggle at top-left ---------- */}
      <div className="fixed left-4 top-4 z-50 md:hidden">
        <ThemeToggle size="sm" />
      </div>
    </>
  );
}
