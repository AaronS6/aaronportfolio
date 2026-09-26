"use client";

import { motion, useReducedMotion as fmReducedMotion } from "framer-motion";
import { timeline, accentMap, type AccentKey } from "@/data/portfolio";
import { Reveal } from "./Reveal";

/**
 * Timeline — modern card-based layout.
 * Uses accent colors only for decorative elements (bar, dot, glow),
 * NOT for the period badge background+text. Text is always ink-colored
 * for maximum readability.
 */
export function Timeline() {
  const reduced = fmReducedMotion();

  return (
    <section
      id="timeline"
      data-section
      className="relative mx-auto w-full max-w-6xl px-6 py-12 sm:py-16 lg:py-20"
    >
      <Reveal>
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-faint">
          The path
        </span>
        <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
          Where I&apos;ve been{" "}
          <span className="font-serif-italic text-ink-soft">putting my time.</span>
        </h2>
        <p className="mt-4 max-w-xl text-sm text-ink-soft sm:text-base">
          Leadership roles I&apos;ve taken on alongside school.
        </p>
      </Reveal>

      {/* Modern grid layout */}
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {timeline.map((item, i) => {
          const accent = accentMap[item.accent as AccentKey];
          return (
            <Reveal key={item.id} delay={i * 0.05}>
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={reduced ? undefined : { y: -6 }}
                className="glass glass-hover group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] p-4 sm:p-5"
              >
                {/* accent bar at top — grows on hover */}
                <motion.div
                  className="absolute left-0 top-0 h-1 origin-left"
                  style={{ background: accent.bg }}
                  whileHover={{ scaleX: 1.2 }}
                  animate={{ width: "100%" }}
                />

                {/* period + dot */}
                <div className="mb-3 flex items-center gap-2">
                  <motion.span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ background: accent.bg }}
                    animate={reduced ? undefined : { scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                  <span className="font-mono text-xs font-medium text-ink-soft">
                    {item.period}
                  </span>
                </div>

                {/* role */}
                <h3 className="text-lg font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-ink">
                  {item.role}
                </h3>

                {/* org */}
                <p className="mt-1 text-sm font-medium text-ink-soft">
                  {item.org}
                </p>

                {/* description */}
                <p className="mt-3 text-sm leading-relaxed text-ink-faint">
                  {item.description}
                </p>

                {/* decorative accent glow on hover */}
                <motion.div
                  className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full opacity-0 blur-2xl"
                  style={{ background: accent.bg }}
                  whileHover={reduced ? undefined : { opacity: 0.4 }}
                />
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
