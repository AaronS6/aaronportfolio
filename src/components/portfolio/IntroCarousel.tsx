"use client";

import Image from "next/image";
import { motion, useReducedMotion as fmReducedMotion } from "framer-motion";
import { introCards } from "@/data/portfolio";
import { cn } from "@/lib/utils";

/**
 * IntroCarousel — bento grid on desktop, horizontal scroll on mobile.
 * All cards are photos now (no quote cards).
 */
export function IntroCarousel() {
  const reduced = fmReducedMotion();

  // Desktop bento layout — 8 photos
  const desktopLayout = [
    "hidden sm:block sm:col-span-2 sm:row-span-2",      // 0: kayak — big
    "hidden sm:block sm:col-span-1 sm:row-span-1",       // 1: council
    "hidden sm:block sm:col-span-1 sm:row-span-2",       // 2: piano — tall
    "hidden sm:block sm:col-span-2 sm:row-span-1",       // 3: nature — wide
    "hidden sm:block sm:col-span-1 sm:row-span-1",       // 4: debate
    "hidden sm:block sm:col-span-1 sm:row-span-1",       // 5: classroom1
    "hidden sm:block sm:col-span-1 sm:row-span-2",       // 6: classroom2 — tall
    "hidden sm:block sm:col-span-3 sm:row-span-1",       // 7: interview — wide
  ];

  return (
    <section
      id="intro"
      data-section
      className="relative w-full py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto mb-6 max-w-6xl px-6 sm:mb-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-faint">
            A quick look
          </h2>
        </motion.div>
      </div>

      {/* ========== MOBILE: horizontal scroll carousel ========== */}
      <div
        className="no-scrollbar flex gap-3 overflow-x-auto px-6 pb-3 sm:hidden"
        style={{
          scrollbarWidth: "none",
          overscrollBehaviorX: "contain",
          touchAction: "pan-x pan-y",
        }}
      >
        {introCards.map((card, i) => (
          <motion.div
            key={`mobile-${i}`}
            initial={reduced ? false : { opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{
              duration: 0.5,
              delay: i * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={reduced ? undefined : { y: -3 }}
            className="group relative h-[200px] w-[160px] shrink-0 overflow-hidden rounded-[1.25rem]"
          >
            <div className="glass glass-hover group relative h-full w-full overflow-hidden rounded-[1.25rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.src}
                alt={card.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* ========== DESKTOP: bento grid ========== */}
      <div className="mx-auto hidden max-w-6xl px-6 sm:block">
        <div className="grid auto-rows-[160px] grid-cols-4 gap-4">
          {introCards.map((card, i) => (
            <motion.div
              key={`desktop-${i}`}
              initial={reduced ? false : { opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={reduced ? undefined : { y: -4, scale: 1.02 }}
              className={cn(
                "group relative overflow-hidden rounded-[1.25rem]",
                desktopLayout[i] || "hidden sm:block sm:col-span-1 sm:row-span-1"
              )}
            >
              <div className="glass glass-hover group relative h-full w-full overflow-hidden rounded-[1.25rem]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.src}
                  alt={card.alt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
                <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
