"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion as fmReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { faq } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/**
 * Faq — accordion. Heading is just "Q&A".
 */
export function Faq() {
  const [open, setOpen] = useState<string | null>(null);
  const reduced = fmReducedMotion();

  return (
    <section
      id="faq"
      data-section
      className="relative mx-auto w-full max-w-4xl px-6 py-14 sm:py-20"
    >
      <Reveal>
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-faint">
          Questions
        </span>
        <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
          Q&amp;A
        </h2>
        <p className="mt-4 max-w-xl text-sm text-ink-soft sm:text-base">
          The stuff people actually ask me. If something&apos;s missing, the
          answer is probably &ldquo;send me a message.&rdquo;
        </p>
      </Reveal>

      <div className="mt-8 flex flex-col gap-3">
        {faq.map((item, i) => {
          const isOpen = open === item.id;
          return (
            <Reveal key={item.id} delay={i * 0.04}>
              <div
                className={cn(
                  "glass glass-hover overflow-hidden rounded-2xl transition-all duration-400",
                  isOpen && "ring-1 ring-lime/40"
                )}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-3 p-4 text-left sm:gap-4 sm:p-5"
                >
                  <span className="flex-1">
                    <span className="block text-sm font-semibold leading-snug tracking-tight text-ink sm:text-lg">
                      {item.q}
                    </span>
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="glass flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-soft sm:h-9 sm:w-9"
                  >
                    <Plus size={14} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={reduced ? undefined : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduced ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-4 text-sm leading-relaxed text-ink-soft sm:px-5 sm:pb-5 sm:text-[0.95rem]">
                        {item.a}
                      </p>
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
