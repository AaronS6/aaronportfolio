"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Search,
  CornerDownLeft,
  Sun,
  Moon,
  Keyboard,
  ArrowUpRight,
  Mail,
  Camera,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";
import { useUiStore } from "./ui-store";
import { useFocusTrap } from "./useFocusTrap";
import { chapters, codeProjects, profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type Action = {
  id: string;
  label: string;
  hint?: string;
  icon: LucideIcon;
  group: "Navigate" | "Actions" | "Links";
  run: () => void;
};

/**
 * CommandPalette — ⌘K searchable action list.
 * Outer component gates mount via AnimatePresence; inner holds the state
 * so each open starts fresh (no setState-in-effect needed).
 */
export function CommandPalette() {
  const open = useUiStore((s) => s.commandOpen);

  return (
    <AnimatePresence>
      {open && <CommandPaletteInner key="cmd-inner" />}
    </AnimatePresence>
  );
}

function CommandPaletteInner() {
  const setOpen = useUiStore((s) => s.setCommandOpen);
  const toggleShortcuts = useUiStore((s) => s.toggleShortcuts);
  const { resolvedTheme, setTheme } = useTheme();

  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const ref = useFocusTrap<HTMLDivElement>(true);

  const actions = useMemo<Action[]>(() => {
    const jump = (id: string) => {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
    };

    const nav: Action[] = chapters.map((c) => ({
      id: `nav-${c.id}`,
      label: `Go to ${c.label}`,
      hint: `g ${c.key}`,
      icon: ArrowUpRight,
      group: "Navigate",
      run: () => jump(c.id),
    }));

    const acts: Action[] = [
      {
        id: "act-theme",
        label:
          resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode",
        hint: "⌘⇧L",
        icon: resolvedTheme === "dark" ? Sun : Moon,
        group: "Actions",
        run: () => {
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
          setOpen(false);
        },
      },
      {
        id: "act-shortcuts",
        label: "Show keyboard shortcuts",
        hint: "?",
        icon: Keyboard,
        group: "Actions",
        run: () => {
          setOpen(false);
          toggleShortcuts();
        },
      },
      {
        id: "act-top",
        label: "Scroll to top",
        icon: ArrowUpRight,
        group: "Actions",
        run: () => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setOpen(false);
        },
      },
    ];

    const links: Action[] = [
      {
        id: "link-email",
        label: `Email ${profile.email}`,
        icon: Mail,
        group: "Links",
        run: () => {
          window.location.href = `mailto:${profile.email}`;
          setOpen(false);
        },
      },
      {
        id: "link-ig",
        label: `Instagram ${profile.instagram.handle}`,
        icon: Camera,
        group: "Links",
        run: () => {
          window.open(profile.instagram.url, "_blank", "noopener");
          setOpen(false);
        },
      },
      ...codeProjects.map((p) => ({
        id: `link-${p.id}`,
        label: `Open ${p.name} (live)`,
        icon: ExternalLink,
        group: "Links" as const,
        run: () => {
          window.open(p.liveUrl, "_blank", "noopener");
          setOpen(false);
        },
      })),
    ];

    return [...nav, ...acts, ...links];
  }, [resolvedTheme, setTheme, setOpen, toggleShortcuts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (a) =>
        a.label.toLowerCase().includes(q) || a.group.toLowerCase().includes(q)
    );
  }, [actions, query]);

  // keep active index valid (derived, not an effect)
  const safeActive = filtered.length === 0 ? 0 : Math.min(active, filtered.length - 1);

  // focus the input on mount (DOM side-effect — allowed in effects)
  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, []);

  // scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-cmd-idx="${safeActive}"]`
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [safeActive]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(filtered.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[safeActive]?.run();
    }
  };

  // group filtered results preserving order
  const grouped = useMemo(() => {
    const map = new Map<string, Action[]>();
    filtered.forEach((a) => {
      const arr = map.get(a.group) ?? [];
      arr.push(a);
      map.set(a.group, arr);
    });
    const order = ["Navigate", "Actions", "Links"];
    return order
      .map((g) => ({ group: g, items: map.get(g) ?? [] }))
      .filter((g) => g.items.length > 0);
  }, [filtered]);

  let runningIdx = -1;

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-start justify-center p-4 pt-[12vh] sm:pt-[16vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="absolute inset-0 bg-bg/50 backdrop-blur-md"
        onClick={() => setOpen(false)}
      />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="glass-strong relative w-full max-w-xl overflow-hidden rounded-3xl"
        initial={{ scale: 0.97, y: 12, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.97, y: 12, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* search input */}
        <div className="flex items-center gap-3 border-b border-line px-5 py-4">
          <Search size={18} className="text-ink-faint" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKey}
            placeholder="Type a command or search…"
            className="flex-1 bg-transparent text-base text-ink placeholder:text-ink-faint focus:outline-none"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="kbd hidden sm:inline-flex">Esc</kbd>
        </div>

        {/* results */}
        <div ref={listRef} className="max-h-[52vh] overflow-y-auto scroll-area p-2">
          {grouped.length === 0 ? (
            <div className="px-4 py-10 text-center text-sm text-ink-faint">
              No results for &ldquo;{query}&rdquo;
            </div>
          ) : (
            grouped.map((g) => (
              <div key={g.group} className="mb-1">
                <div className="px-3 pb-1 pt-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ink-faint">
                  {g.group}
                </div>
                {g.items.map((a) => {
                  runningIdx += 1;
                  const idx = runningIdx;
                  const isActive = idx === safeActive;
                  const Icon = a.icon;
                  return (
                    <button
                      key={a.id}
                      data-cmd-idx={idx}
                      onMouseMove={() => setActive(idx)}
                      onClick={() => a.run()}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors",
                        isActive
                          ? "bg-paper/80 text-ink"
                          : "text-ink-soft hover:bg-paper/50"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl",
                          isActive ? "glass text-ink" : "text-ink-faint"
                        )}
                      >
                        <Icon size={15} />
                      </span>
                      <span className="flex-1 text-sm font-medium">{a.label}</span>
                      {a.hint && (
                        <span className="flex items-center gap-1 text-xs text-ink-faint">
                          {a.hint.split(" ").map((k, i) => (
                            <kbd key={i} className="kbd">
                              {k}
                            </kbd>
                          ))}
                        </span>
                      )}
                      {isActive && (
                        <CornerDownLeft size={14} className="text-ink-faint" />
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* footer */}
        <div className="flex items-center justify-between border-t border-line px-5 py-2.5 text-xs text-ink-faint">
          <span>
            {filtered.length} result{filtered.length === 1 ? "" : "s"}
          </span>
          <span className="flex items-center gap-2">
            <kbd className="kbd">↑</kbd>
            <kbd className="kbd">↓</kbd>
            <span>to move</span>
            <kbd className="kbd">↵</kbd>
            <span>to run</span>
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
