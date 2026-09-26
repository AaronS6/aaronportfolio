"use client";

import { useSyncExternalStore, useEffect, useState } from "react";

/**
 * useReducedMotion — respects the user's OS-level motion preference.
 * Uses useSyncExternalStore so there's no setState-in-effect.
 */
function subscribeMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}
function getMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function getMotionServerSnapshot() {
  return false;
}
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeMotion,
    getMotionSnapshot,
    getMotionServerSnapshot
  );
}

/**
 * useActiveSection — tracks which section id is currently in view.
 * Uses IntersectionObserver + scroll listener for reliable detection.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // pick the entry closest to the top that's intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      {
        // a section counts as active when it's in the middle 40% of the viewport
        rootMargin: "-20% 0px -40% 0px",
        threshold: [0, 0.15, 0.3, 0.5, 0.75, 1],
      }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Fallback: scroll-based detection for tall sections that IO might miss
    let scrollTicking = false;
    const onScroll = () => {
      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(() => {
        // Find which section occupies the most space in the viewport's
        // top 40% zone (the "reading area")
        const checkY = window.innerHeight * 0.35;
        let bestId = ids[0] ?? "";
        let bestTop = -Infinity;

        for (const id of ids) {
          const el = document.getElementById(id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          // Check if this section's top is at or above the check line
          // AND its bottom is below the check line (i.e. it spans the check line)
          if (rect.top <= checkY && rect.bottom > checkY) {
            bestId = id;
            break;
          }
          // Otherwise track the closest section above the check line
          if (rect.top <= checkY && rect.top > bestTop) {
            bestTop = rect.top;
            bestId = id;
          }
        }
        setActive(bestId);
        scrollTicking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial check

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(",")]);

  return active;
}

/**
 * useScrollProgress — 0..1 of the page scrolled. Uses a native scroll
 * listener (not framer's useScroll) to avoid console warnings.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(1, scrollTop / docHeight) : 0);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return progress;
}

/**
 * useScrolled — true once the user scrolls past `threshold` px.
 */
export function useScrolled(threshold = 40): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

/**
 * useMediaQuery — generic responsive hook (SSR-safe via useSyncExternalStore).
 */
function makeMediaSubscribe(query: string) {
  return (callback: () => void) => {
    const mq = window.matchMedia(query);
    mq.addEventListener("change", callback);
    return () => mq.removeEventListener("change", callback);
  };
}
export function useMediaQuery(query: string): boolean {
  const subscribe = makeMediaSubscribe(query);
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}
