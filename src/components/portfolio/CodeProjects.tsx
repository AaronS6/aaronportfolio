"use client";

import Image from "next/image";
import { motion, useReducedMotion as fmReducedMotion } from "framer-motion";
import { ExternalLink, Terminal, Circle } from "lucide-react";
import { codeProjects, accentMap, type AccentKey } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { Magnetic } from "./Magnetic";
import { cn } from "@/lib/utils";

/**
 * CodeProjects — StudyOS + ClubHub.
 * Code-editor card aesthetic (window dots, line numbers) but NO monospace font.
 */
export function CodeProjects() {
  const reduced = fmReducedMotion();

  return (
    <section
      id="code"
      data-section
      className="relative mx-auto w-full max-w-6xl px-6 py-12 sm:py-16 lg:py-20"
    >
      <Reveal>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-faint">
              Coding Projects
            </span>
            <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
              What I&apos;m{" "}
              <span className="font-serif-italic text-ink-soft">building.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm text-ink-faint">
            Two products I&apos;ve designed, built, and keep working on.
          </p>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-5 lg:grid-cols-2 sm:gap-6">
        {codeProjects.map((p, i) => {
          const accent = accentMap[p.accent as AccentKey];
          return (
            <Reveal key={p.id} delay={i * 0.1}>
              <motion.div
                whileHover={reduced ? undefined : { y: -4 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="glass glass-hover group relative overflow-hidden rounded-[1.5rem]"
              >
                {/* accent glow on hover */}
                <div
                  className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
                  style={{ background: accent.bg }}
                />

                {/* editor chrome */}
                <div className="flex items-center gap-3 border-b border-line px-5 py-3.5">
                  <div className="flex items-center gap-1.5">
                    <Circle size={11} className="text-coral/80" fill="currentColor" />
                    <Circle size={11} className="text-sun/80" fill="currentColor" />
                    <Circle size={11} className="text-lime/80" fill="currentColor" />
                  </div>
                  <div className="flex flex-1 items-center gap-2">
                    <Terminal size={14} className="text-ink-faint" />
                    <span className="text-sm font-medium text-ink-soft">
                      {p.name.toLowerCase()}.tsx
                    </span>
                  </div>
                  <span
                    className="hidden text-xs text-ink-faint sm:inline"
                  >
                    {p.stack.length} deps
                  </span>
                </div>

                {/* body */}
                <div className="p-6 sm:p-7">
                  {/* Screenshot */}
                  {p.screenshot && (
                    <div className="mb-6 overflow-hidden rounded-xl border border-line">
                      <Image
                        src={p.screenshot}
                        alt={`${p.name} screenshot`}
                        width={1152}
                        height={864}
                        className="w-full object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                        {p.name}
                      </h3>
                      <p className="mt-1 text-sm text-ink-faint">{p.tagline}</p>
                    </div>
                    <span
                      className="flex h-2.5 w-2.5 shrink-0 items-center justify-center rounded-full"
                      style={{ background: accent.bg }}
                      title={`accent: ${p.accent}`}
                    />
                  </div>

                  <p className="mt-5 text-[0.95rem] leading-relaxed text-ink-soft">
                    {p.description}
                  </p>

                  {/* "code lines" — styled as code but in the sans font */}
                  <div
                    className="mt-6 rounded-2xl p-4"
                    style={{ background: "var(--glass-bg-strong)" }}
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: accent.bg }}
                      />
                      <span className="text-xs uppercase tracking-[0.2em] text-ink-faint">
                        What it does
                      </span>
                    </div>
                    <ul className="flex flex-col gap-2">
                      {p.features.map((f, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-sm leading-relaxed text-ink-soft"
                        >
                          <span className="select-none text-ink-faint">
                            {String(j + 1).padStart(2, "0")}
                          </span>
                          <span className="select-none text-ink-faint">→</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* stack */}
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {p.stack.map((s) => (
                      <span key={s} className="chip text-[0.7rem]">
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* live link */}
                  <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
                    <span className="text-xs uppercase tracking-[0.2em] text-ink-faint">
                      Status
                    </span>
                    <Magnetic as="a" href={p.liveUrl} strength={8}>
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "group flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-ink transition-colors"
                        )}
                        style={{ background: accent.soft }}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full animate-pulse-soft"
                          style={{ background: accent.bg }}
                        />
                        Open live
                        <ExternalLink
                          size={14}
                          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </a>
                    </Magnetic>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
