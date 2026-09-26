"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion as fmReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { projects, accentMap, type AccentKey } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/**
 * Works — 5 expandable project accordions.
 * Bright photos (no dim filter), animated expand, accent per project.
 */
export function Works() {
  const [open, setOpen] = useState<string | null>(null);
  const reduced = fmReducedMotion();

  return (
    <section
      id="works"
      data-section
      className="relative mx-auto w-full max-w-6xl px-6 py-12 sm:py-16 lg:py-20"
    >
      <Reveal>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-faint">
              Featured work
            </span>
            <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Five things I made{" "}
              <span className="font-serif-italic text-ink-soft">
                that I&apos;m proud of.
              </span>
            </h2>
          </div>
          <p className="max-w-xs text-sm text-ink-faint">
            Tap a row to expand. Each one taught me something I still use.
          </p>
        </div>
      </Reveal>

      <div className="mt-8 flex flex-col gap-3">
        {projects.map((p, i) => {
          const isOpen = open === p.id;
          const accent = accentMap[p.accent as AccentKey];
          return (
            <Reveal key={p.id} delay={i * 0.05}>
              <div
                className={cn(
                  "glass glass-hover overflow-hidden rounded-[1.5rem] transition-all duration-500",
                  isOpen && "ring-1"
                )}
                style={isOpen ? { boxShadow: `0 0 0 1px ${accent.bg}` } : undefined}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : p.id)}
                  aria-expanded={isOpen}
                  className="group/btn flex w-full items-center gap-3 p-3 text-left transition-colors sm:gap-5 sm:p-5"
                >
                  {/* number */}
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-sm font-medium transition-colors sm:flex"
                    style={{
                      background: accent.soft,
                      color: "var(--ink)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </motion.span>

                  {/* cover thumb */}
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg transition-transform duration-300 group-hover/btn:scale-105 sm:h-16 sm:w-16 sm:rounded-xl">
                    <div
                      className="absolute inset-0"
                      style={{ background: accent.soft }}
                    />
                    <Image
                      src={p.cover}
                      alt={p.title}
                      fill
                      sizes="64px"
                      className="object-cover transition-transform duration-500 group-hover/btn:scale-110"
                    />
                  </div>

                  {/* title + meta */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3 className="text-base font-semibold tracking-tight text-ink sm:text-lg">
                        {p.title}
                      </h3>
                      <span className="text-xs text-ink-faint">{p.year}</span>
                    </div>
                    {/* Show full blurb when expanded, truncated when collapsed */}
                    <p
                      className={cn(
                        "mt-0.5 text-sm text-ink-soft sm:text-[0.95rem]",
                        !isOpen && "line-clamp-1"
                      )}
                    >
                      {p.blurb}
                    </p>
                    <div className="mt-2 hidden flex-wrap gap-1.5 sm:flex">
                      {p.tags.map((t) => (
                        <span key={t} className="chip text-[0.65rem]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* expand icon */}
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="glass flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-soft"
                  >
                    <Plus size={16} />
                  </motion.span>
                </button>

                {/* expanded panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={reduced ? undefined : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduced ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-5 p-3 pt-2 sm:grid-cols-2 sm:p-6 sm:pt-2">
                        {/* big cover */}
                        <div className="relative h-48 overflow-hidden rounded-2xl sm:h-64">
                          <div
                            className="absolute inset-0"
                            style={{ background: accent.soft }}
                          />
                          <Image
                            src={p.cover}
                            alt={p.title}
                            fill
                            sizes="(max-width: 640px) 100vw, 50vw"
                            className="object-cover"
                          />
                        </div>

                        {/* details */}
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2 text-sm text-ink-faint">
                            <span className="font-medium text-ink-soft">
                              {p.role}
                            </span>
                            <span>·</span>
                            <span>{p.year}</span>
                          </div>

                          <ul className="mt-4 flex flex-col gap-2.5">
                            {p.details.map((d, j) => (
                              <li
                                key={j}
                                className="flex gap-3 text-sm leading-relaxed text-ink-soft"
                              >
                                <span
                                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                                  style={{ background: accent.bg }}
                                />
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>

                          <div
                            className="mt-5 rounded-2xl p-4"
                            style={{ background: accent.soft }}
                          >
                            <p className="text-xs uppercase tracking-[0.2em] text-ink-faint">
                              Takeaway
                            </p>
                            <p className="mt-1.5 font-serif-italic text-lg leading-snug text-ink">
                              {p.takeaway}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
