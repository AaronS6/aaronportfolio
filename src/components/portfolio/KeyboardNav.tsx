"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { useUiStore } from "./ui-store";
import { chapters } from "@/data/portfolio";

/**
 * KeyboardNav — global keyboard handler.
 *
 *  ⌘K / Ctrl+K   → command palette
 *  ⌘⇧L / Ctrl+⇧L → toggle dark mode
 *  ?             → shortcuts help
 *  j / k         → next / previous section
 *  g + <key>     → jump to chapter (see `chapters`)
 *  Esc           → close overlays
 */
export function KeyboardNav() {
  const { setTheme, resolvedTheme } = useTheme();
  const {
    toggleCommand,
    commandOpen,
    setCommandOpen,
    toggleShortcuts,
    shortcutsOpen,
    setShortcutsOpen,
  } = useUiStore();

  const gPressed = useRef(false);
  const gTimer = useRef<NodeJS.Timeout | null>(null);
  // resolvedTheme can be undefined on first client render; track a ref so
  // the keydown handler always reads the latest value without re-binding.
  const themeRef = useRef(resolvedTheme);
  useEffect(() => {
    themeRef.current = resolvedTheme;
  }, [resolvedTheme]);

  useEffect(() => {
    const jumpTo = (id: string) => {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable ||
          target.getAttribute("role") === "combobox");

      // Esc — always close
      if (e.key === "Escape") {
        if (commandOpen) setCommandOpen(false);
        if (shortcutsOpen) setShortcutsOpen(false);
        gPressed.current = false;
        return;
      }

      // ⌘K / Ctrl+K — command palette (works even while typing)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggleCommand();
        return;
      }

      // ⌘⇧L / Ctrl+⇧L — theme toggle
      if (
        (e.metaKey || e.ctrlKey) &&
        e.shiftKey &&
        e.key.toLowerCase() === "l"
      ) {
        e.preventDefault();
        const current = themeRef.current;
        setTheme(current === "dark" ? "light" : "dark");
        return;
      }

      if (isTyping) return;

      // ? — shortcuts help (Shift+/ produces "?")
      if (e.key === "?" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        toggleShortcuts();
        return;
      }

      // j / k — next / prev section
      if (e.key === "j" || e.key === "k") {
        if (gPressed.current) return; // don't conflict with g+?
        e.preventDefault();
        const ids = chapters.map((c) => c.id);
        const active = useUiStore.getState().activeSection;
        const idx = ids.indexOf(active);
        const nextIdx =
          e.key === "j"
            ? Math.min(ids.length - 1, idx + 1)
            : Math.max(0, idx - 1);
        jumpTo(ids[nextIdx]);
        return;
      }

      // g + <key> — jump
      if (e.key === "g" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        gPressed.current = true;
        if (gTimer.current) clearTimeout(gTimer.current);
        gTimer.current = setTimeout(() => {
          gPressed.current = false;
        }, 700);
        return;
      }

      if (gPressed.current) {
        const ch = chapters.find((c) => c.key === e.key.toLowerCase());
        if (ch) {
          e.preventDefault();
          jumpTo(ch.id);
        }
        gPressed.current = false;
        if (gTimer.current) clearTimeout(gTimer.current);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (gTimer.current) clearTimeout(gTimer.current);
    };
  }, [
    commandOpen,
    shortcutsOpen,
    toggleCommand,
    setCommandOpen,
    toggleShortcuts,
    setShortcutsOpen,
    setTheme,
  ]);

  return null;
}
