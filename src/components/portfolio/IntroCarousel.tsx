"use client";

import Image from "next/image";
import { motion, useReducedMotion as fmReducedMotion } from "framer-motion";
import { introCards, accentMap, profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";

/**
 * IntroCarousel — bento grid on desktop, horizontal scroll on mobile.
 * Mobile: horizontal swipeable carousel with all 7 cards
 * Desktop: static bento grid with varied spans
 */
export function IntroCarousel() {
  const reduced = fmReducedMotion();

  // Desktop bento layout classes — use "hidden sm:block" so cards are
  // hidden on mobile (where the carousel is shown) but visible on desktop
  const desktopLayout = [
    "hidden sm:block sm:col-span-2 sm:row-span-2",      // 0: kayak — big
    "hidden sm:block sm:col-span-1 sm:row-span-1",        // 1: quote
    "hidden sm:block sm:col-span-1 sm:row-span-2",        // 2: council — tall
    "hidden sm:block sm:col-span-2 sm:row-span-1",        // 3: quote — wide
    "hidden sm:block sm:col-span-1 sm:row-span-1",        // 4: piano
    "hidden sm:block sm:col-span-1 sm:row-span-1",        // 5: nature
    "hidden sm:block sm:col-span-2 sm:row-span-1",        // 6: debate — wide
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
            {card.type === "photo" ? (
              <div className="glass glass-hover group relative h-full w-full overflow-hidden rounded-[1.25rem]">
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  sizes="160px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
                <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </div>
            ) : (
              <div
                className="glass glass-hover group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[1.25rem] p-4"
                style={{ background: accentMap[card.accent].soft }}
              >
                <motion.span
                  className="h-1.5 w-8 rounded-full"
                  style={{ background: accentMap[card.accent].bg }}
                  animate={reduced ? undefined : { scaleX: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                />
                <p className="font-serif-italic text-sm leading-snug text-ink">
                  &ldquo;{card.text}&rdquo;
                </p>
                <span className="text-[0.55rem] uppercase tracking-[0.2em] text-ink-faint">
                  — {profile.firstName}
                </span>
              </div>
            )}
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
                desktopLayout[i] || "sm:col-span-1 sm:row-span-1"
              )}
            >
              {card.type === "photo" ? (
                <div className="glass glass-hover group relative h-full w-full overflow-hidden rounded-[1.25rem]">
                  <Image
                    src={card.src}
                    alt={card.alt}
                    fill
                    sizes="25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
                  <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </div>
              ) : (
                <div
                  className="glass glass-hover group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[1.25rem] p-5"
                  style={{ background: accentMap[card.accent].soft }}
                >
                  <motion.span
                    className="h-2 w-10 rounded-full"
                    style={{ background: accentMap[card.accent].bg }}
                    animate={reduced ? undefined : { scaleX: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  />
                  <p className="font-serif-italic text-lg leading-snug text-ink sm:text-xl lg:text-2xl">
                    &ldquo;{card.text}&rdquo;
                  </p>
                  <span className="text-[0.65rem] uppercase tracking-[0.2em] text-ink-faint">
                    — {profile.firstName}
                  </span>
                  <div
                    className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30"
                    style={{ background: accentMap[card.accent].bg }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
