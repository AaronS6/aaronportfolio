"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useUiStore } from "./ui-store";
import { useFocusTrap } from "./useFocusTrap";

const groups = [
  {
    title: "Navigate",
    items: [
      { keys: ["j"], label: "Next section" },
      { keys: ["k"], label: "Previous section" },
      { keys: ["g", "h"], label: "Jump to Home", concat: true },
      { keys: ["g", "a"], label: "Jump to About", concat: true },
      { keys: ["g", "w"], label: "Jump to Works", concat: true },
      { keys: ["g", "c"], label: "Jump to Code", concat: true },
      { keys: ["g", "r"], label: "Jump to Awards", concat: true },
      { keys: ["g", "q"], label: "Jump to Q&A", concat: true },
    ],
  },
  {
    title: "Actions",
    items: [
      { keys: ["⌘", "K"], label: "Command palette", concat: true },
      { keys: ["⌘", "⇧", "L"], label: "Toggle dark mode", concat: true },
      { keys: ["?"], label: "Show this help" },
      { keys: ["Esc"], label: "Close any overlay" },
    ],
  },
];

/**
 * ShortcutHelp — overlay listing all keyboard shortcuts.
 * Triggered by the ? key (and from the command palette).
 */
export function ShortcutHelp() {
  const open = useUiStore((s) => s.shortcutsOpen);
  const setOpen = useUiStore((s) => s.setShortcutsOpen);
  const ref = useFocusTrap<HTMLDivElement>(open);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 bg-bg/50 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />
          <motion.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-label="Keyboard shortcuts"
            className="glass-strong relative w-full max-w-lg rounded-3xl p-6 sm:p-8"
            initial={{ scale: 0.96, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 16, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-ink">
                  Shortcuts
                </h2>
                <p className="mt-1 text-sm text-ink-faint">
                  Move around fast. Press <kbd className="kbd">?</kbd> again to close.
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="glass flex h-9 w-9 items-center justify-center rounded-full text-ink-soft hover:text-ink"
              >
                <X size={16} />
              </button>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              {groups.map((g) => (
                <div key={g.title}>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink-faint">
                    {g.title}
                  </h3>
                  <ul className="flex flex-col gap-2.5">
                    {g.items.map((item) => (
                      <li
                        key={item.label}
                        className="flex items-center justify-between gap-3"
                      >
                        <span className="text-sm text-ink-soft">{item.label}</span>
                        <span className="flex items-center gap-1">
                          {item.keys.map((k, i) => (
                            <span key={i} className="flex items-center gap-1">
                              {i > 0 && item.concat && (
                                <span className="text-ink-faint">+</span>
                              )}
                              <kbd className="kbd">{k}</kbd>
                            </span>
                          ))}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="mt-6 border-t border-line pt-4 text-xs text-ink-faint">
              Tip: <kbd className="kbd">g</kbd> then a letter jumps to that section.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
