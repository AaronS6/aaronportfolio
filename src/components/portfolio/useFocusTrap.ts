"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * useFocusTrap — trap keyboard focus inside a container while `active`.
 * Restores focus to the previously-focused element on deactivate.
 */
export function useFocusTrap<T extends HTMLElement>(
  active: boolean
): RefObject<T | null> {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    if (!active) return;

    const container = containerRef.current;
    if (!container) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    // Focus the container (or first focusable) on open
    const focusableSelector =
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

    const getFocusable = () =>
      Array.from(
        container.querySelectorAll<HTMLElement>(focusableSelector)
      ).filter((el) => el.offsetParent !== null);

    const focusables = getFocusable();
    if (focusables.length > 0) {
      focusables[0].focus();
    } else {
      container.tabIndex = -1;
      container.focus();
    }

    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = getFocusable();
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    container.addEventListener("keydown", handleKey);

    return () => {
      container.removeEventListener("keydown", handleKey);
      previouslyFocused?.focus?.();
    };
  }, [active]);

  return containerRef;
}
