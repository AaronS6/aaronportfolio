"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion as fmReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { awards, accentMap, type AccentKey } from "@/data/portfolio";
import { Reveal } from "./Reveal";

export function Awards() {
  const reduced = fmReducedMotion();
  const [activeAward, setActiveAward] = useState<number | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const openAward = useCallback((index: number) => {
    setActiveAward(index);
    setPhotoIndex(0);
  }, []);

  const closeAward = useCallback(() => {
    setActiveAward(null);
  }, []);

  const nextPhoto = useCallback(() => {
    if (activeAward === null) return;
    const gallery = awards[activeAward].gallery;
    setPhotoIndex((prev) => (prev + 1) % gallery.length);
  }, [activeAward]);

  const prevPhoto = useCallback(() => {
    if (activeAward === null) return;
    const gallery = awards[activeAward].gallery;
    setPhotoIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  }, [activeAward]);

  // Keyboard nav + body scroll lock
  useEffect(() => {
    if (activeAward === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAward();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [activeAward, closeAward, nextPhoto, prevPhoto]);

  // Touch swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const dx = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) > 50) {
      if (dx > 0) prevPhoto();
      else nextPhoto();
    }
  };

  return (
    <section
      id="awards"
      data-section
      className="relative mx-auto w-full max-w-6xl px-6 py-12 sm:py-16 lg:py-20"
    >
      <Reveal>
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-faint">
          Recognition
        </span>
        <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
          Awards &{" "}
          <span className="font-serif-italic text-ink-soft">
            milestones.
          </span>
        </h2>
        <p className="mt-4 max-w-xl text-sm text-ink-soft sm:text-base">
          Tap any card to see the full gallery.
        </p>
      </Reveal>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {awards.map((a, i) => {
          const accent = accentMap[a.accent as AccentKey];
          return (
            <Reveal key={a.id} delay={i * 0.05}>
              <motion.button
                onClick={() => openAward(i)}
                whileHover={reduced ? undefined : { y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex h-[180px] w-full flex-col overflow-hidden rounded-[1.25rem] text-left sm:h-[280px]"
              >
                {/* Award photo */}
                {a.image && (
                  <Image
                    src={a.image}
                    alt={a.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                  />
                )}

                {/* gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* shimmer effect on hover */}
                <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                {/* accent dot */}
                <motion.div
                  className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full ring-2 ring-white/30"
                  style={{ background: accent.bg }}
                  animate={reduced ? undefined : { scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                />

                {/* content at bottom */}
                <div className="relative mt-auto p-3 sm:p-4">
                  <span className="text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-white/60 sm:text-[0.65rem]">
                    {a.org} · {a.year}
                  </span>
                  <h3 className="mt-1 text-xs font-bold leading-snug text-white sm:text-sm">
                    {a.title}
                  </h3>
                  {a.gallery.length > 1 && (
                    <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[0.6rem] font-medium text-white/80 backdrop-blur-sm sm:text-[0.65rem]">
                      {a.gallery.length} photos →
                    </span>
                  )}
                </div>
              </motion.button>
            </Reveal>
          );
        })}
      </div>

      {/* ========== Award modal / lightbox ========== */}
      <AnimatePresence>
        {activeAward !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-md sm:p-4 sm:bg-black/60"
            onClick={closeAward}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex w-full flex-col overflow-hidden bg-black shadow-2xl sm:max-w-2xl sm:rounded-[1.5rem]"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {/* Header bar */}
              <div className="flex items-center justify-between px-4 py-3 sm:px-5" onClick={(e) => e.stopPropagation()}>
                <div className="min-w-0 flex-1">
                  <span className="text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-white/50 sm:text-[0.65rem]">
                    {awards[activeAward].org} · {awards[activeAward].year}
                  </span>
                  <h3 className="mt-0.5 truncate text-sm font-bold text-white sm:text-base">
                    {awards[activeAward].title}
                  </h3>
                </div>
                <div className="flex shrink-0 items-center gap-3 pl-3">
                  {awards[activeAward].gallery.length > 1 && (
                    <span className="font-mono text-xs text-white/40">
                      {String(photoIndex + 1).padStart(2, "0")}/{String(awards[activeAward].gallery.length).padStart(2, "0")}
                    </span>
                  )}
                  <button
                    onClick={closeAward}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 active:scale-90"
                    aria-label="Close gallery"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Image stage — fills screen on mobile, fixed height on desktop */}
              <div
                className="relative flex flex-1 items-center justify-center overflow-hidden bg-black"
                style={{ minHeight: "50vh" }}
                onClick={(e) => e.stopPropagation()}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={photoIndex}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="relative h-full w-full"
                  >
                    <Image
                      src={awards[activeAward].gallery[photoIndex]}
                      alt={`${awards[activeAward].title} — photo ${photoIndex + 1}`}
                      fill
                      sizes="100vw"
                      className="object-contain p-2 sm:p-4"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* prev / next arrows — always visible, touch-friendly */}
                {awards[activeAward].gallery.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
                      className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/25 active:scale-90 sm:left-3 sm:h-11 sm:w-11"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft size={22} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
                      className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/25 active:scale-90 sm:right-3 sm:h-11 sm:w-11"
                      aria-label="Next photo"
                    >
                      <ChevronRight size={22} />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail strip at bottom */}
              {awards[activeAward].gallery.length > 1 && (
                <div
                  className="flex justify-center gap-2 overflow-x-auto px-4 py-3"
                  onClick={(e) => e.stopPropagation()}
                  style={{ scrollbarWidth: "none" }}
                >
                  {awards[activeAward].gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => { e.stopPropagation(); setPhotoIndex(idx); }}
                      className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-lg ring-2 transition-all active:scale-90 ${
                        idx === photoIndex ? "ring-white" : "ring-transparent opacity-40 hover:opacity-70"
                      }`}
                    >
                      <Image src={img} alt="" fill sizes="48px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
