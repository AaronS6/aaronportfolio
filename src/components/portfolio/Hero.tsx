"use client";

import Image from "next/image";
import { motion, useReducedMotion as fmReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/portfolio";
import { TextScramble } from "./TextScramble";
import { Magnetic } from "./Magnetic";

/**
 * Hero — text LEFT, photo RIGHT (desktop). Photo below text on mobile.
 * Floating photo, scroll cue, animated entrance.
 */
export function Hero() {
  const reduced = fmReducedMotion();

  const scrollTo = (id: string) =>
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });

  return (
    <section
      id="home"
      data-section
      className="relative mx-auto flex min-h-[85vh] w-full max-w-6xl flex-col justify-center px-6 pb-16 pt-28 sm:pt-32 lg:flex-row lg:items-center lg:gap-16"
    >
      {/* ---------- LEFT: text ---------- */}
      <div className="order-2 flex-1 lg:order-1">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full glass px-3 py-1.5"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
          </span>
          <span className="text-xs font-medium text-ink-soft">
            Welcome to my portfolio
          </span>
        </motion.div>

        <motion.h1
          className="text-[2.5rem] font-semibold leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-[5rem]"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          <span className="block">
            <TextScramble
              text={profile.firstName}
              trigger="hover"
              as="span"
              className="hover:text-ink-soft transition-colors"
            />
          </span>
          <span className="block">
            <TextScramble
              text={profile.lastName + "."}
              trigger="hover"
              as="span"
              className="text-gradient-warm hover:opacity-90 transition-opacity"
            />
          </span>
        </motion.h1>

        <motion.p
          className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg lg:text-xl"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
        >
          {profile.intro}
        </motion.p>

        <motion.div
          className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
        >
          <Magnetic as="button" strength={12}>
            <button
              onClick={() => scrollTo("works")}
              className="glass glass-hover group flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-ink"
            >
              See my work
              <ArrowDown
                size={16}
                className="transition-transform group-hover:translate-y-0.5"
              />
            </button>
          </Magnetic>

          <Magnetic as="button" strength={12}>
            <button
              onClick={() => scrollTo("contact")}
              className="group flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              Let&apos;s talk
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </Magnetic>
        </motion.div>
      </div>

      {/* ---------- RIGHT: photo ---------- */}
      <div className="order-1 mb-10 flex justify-center lg:order-2 lg:mb-0 lg:flex-shrink-0">
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="relative"
        >
          {/* luminous ring — animated rotation */}
          <motion.div
            className="absolute -inset-3 rounded-[2rem] opacity-60 blur-2xl"
            style={{
              background:
                "conic-gradient(from 180deg, var(--color-lime), var(--color-sun), var(--color-coral), var(--color-grape), var(--color-lime))",
            }}
            animate={reduced ? undefined : { rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          {/* floating photo */}
          <motion.div
            animate={reduced ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="glass relative h-[220px] w-[220px] overflow-hidden rounded-[1.5rem] sm:h-[300px] sm:w-[300px] sm:rounded-[1.75rem] lg:h-[320px] lg:w-[320px]"
          >
            <Image
              src="/images/real/hero-portrait.jpg"
              alt="Aaron Shan portrait"
              fill
              priority
              sizes="320px"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.button
        onClick={() => scrollTo("intro")}
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-ink-faint lg:flex"
        aria-label="Scroll to explore"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={reduced ? undefined : { y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.button>
    </section>
  );
}
