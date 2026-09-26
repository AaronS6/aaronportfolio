"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
  size?: "sm" | "md";
};

/**
 * ThemeToggle — light/dark switch with a sun/moon swap.
 * ⌘⇧L hotkey is wired up in KeyboardNav.
 */
export function ThemeToggle({ className, size = "md" }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Standard next-themes SSR pattern: flip mounted after hydration so we
  // read the real resolved theme without a hydration mismatch.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";
  const dims = size === "sm" ? "h-9 w-9" : "h-10 w-10";
  const iconSize = size === "sm" ? 16 : 18;

  const toggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode (⌘⇧L)" : "Dark mode (⌘⇧L)"}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full",
        "glass glass-hover text-ink-soft hover:text-ink",
        "transition-colors duration-300",
        dims,
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted && (
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {isDark ? (
              <Moon size={iconSize} strokeWidth={2} />
            ) : (
              <Sun size={iconSize} strokeWidth={2} />
            )}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
