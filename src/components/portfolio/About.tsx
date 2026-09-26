"use client";

import Image from "next/image";
import { motion, useReducedMotion as fmReducedMotion } from "framer-motion";
import { profile } from "@/data/portfolio";
import { Reveal } from "./Reveal";

/**
 * About — portrait + text + pull-quote + tags.
 * No "Working palette" section.
 */
export function About() {
  const reduced = fmReducedMotion();

  return (
    <section
      id="about"
      data-section
      className="relative mx-auto w-full max-w-6xl px-6 py-12 sm:py-16 lg:py-20"
    >
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* ---------- portrait ---------- */}
        <Reveal className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative mx-auto w-fit">
            <div
              className="absolute -inset-3 rounded-[2rem] opacity-50 blur-2xl"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-peach), var(--color-coral), var(--color-grape))",
              }}
            />
            <div className="glass relative h-[280px] w-[240px] overflow-hidden rounded-[1.5rem] sm:h-[380px] sm:w-[330px] sm:rounded-[1.75rem]">
              <Image
                src="/images/real/about-portrait.jpg"
                alt={`${profile.name} portrait`}
                fill
                sizes="340px"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>

        {/* ---------- text ---------- */}
        <div>
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-faint">
              About
            </span>
            <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Building things,{" "}
              <span className="font-serif-italic text-ink-soft">
                mostly for the people around me.
              </span>
            </h2>
          </Reveal>

          <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-ink-soft sm:text-lg">
            {profile.longBio.map((para, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p>{para}</p>
              </Reveal>
            ))}
          </div>

          {/* pull quote */}
          <Reveal delay={0.1}>
            <figure className="glass relative mt-10 overflow-hidden rounded-[1.5rem] p-7 sm:p-8">
              <div
                className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-40 blur-2xl"
                style={{ background: "var(--color-lime)" }}
              />
              <blockquote className="relative font-serif-italic text-2xl leading-snug text-ink sm:text-3xl">
                &ldquo;{profile.pullQuote}&rdquo;
              </blockquote>
              <figcaption className="relative mt-4 text-sm text-ink-faint">
                {profile.name} · {profile.school}
              </figcaption>
            </figure>
          </Reveal>

          {/* tags */}
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-2">
              {profile.tags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
