"use client";

import { motion, useReducedMotion as fmReducedMotion } from "framer-motion";
import { skillRows } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/**
 * Skills — three marquee rows (alternating direction).
 * No speed toggle. Pauses on hover.
 */
export function Skills() {
  const reduced = fmReducedMotion();

  return (
    <section
      id="skills"
      data-section
      className="relative w-full overflow-hidden py-20 sm:py-28"
    >
      <Reveal>
        <div className="mx-auto mb-10 max-w-6xl px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-faint">
            Tools & habits
          </span>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
            What I reach for{" "}
            <span className="font-serif-italic text-ink-soft">
              when I&apos;m making something.
            </span>
          </h2>
        </div>
      </Reveal>

      <div className="flex flex-col gap-4">
        {skillRows.map((row, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className="marquee-pause relative flex overflow-hidden">
              {/* edge fades */}
              <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-bg to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-bg to-transparent" />

              <div
                className={cn(
                  "marquee-track gap-3",
                  row.direction === "right" && "marquee-track-reverse",
                  reduced && "[animation-play-state:paused]"
                )}
              >
                {[...row.skills, ...row.skills, ...row.skills, ...row.skills].map((skill, j) => (
                  <motion.span
                    key={`${skill}-${j}`}
                    whileHover={reduced ? undefined : { y: -6, scale: 1.05 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="glass glass-hover flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-ink-soft hover:text-ink"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-lime to-coral" />
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <p className="mx-auto mt-10 max-w-md px-6 text-center text-sm text-ink-faint">
          Mostly leadership stuff. The coding is just Python, Java, and Git.
        </p>
      </Reveal>
    </section>
  );
}
