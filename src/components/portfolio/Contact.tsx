"use client";

import { useReducedMotion as fmReducedMotion } from "framer-motion";
import { Mail, Instagram, ArrowUpRight, ArrowUp } from "lucide-react";
import { profile, chapters } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { Magnetic } from "./Magnetic";

/**
 * Contact + Footer.
 * Footer is sticky to bottom via the page's flex column layout (mt-auto).
 */
export function Contact() {
  const reduced = fmReducedMotion();

  const go = (id: string) =>
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });

  return (
    <>
      {/* ---------- Contact CTA ---------- */}
      <section
        id="contact"
        data-section
        className="relative mx-auto w-full max-w-6xl px-6 py-12 sm:py-20 lg:py-28"
      >
        <Reveal>
          <div className="glass-strong relative overflow-hidden rounded-[1.5rem] p-6 sm:rounded-[2rem] sm:p-14">
            {/* glow */}
            <div
              className="absolute -left-20 -top-20 h-72 w-72 rounded-full opacity-50 blur-3xl"
              style={{ background: "var(--color-lime)" }}
            />
            <div
              className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full opacity-40 blur-3xl"
              style={{ background: "var(--color-coral)" }}
            />

            <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-faint">
                  Let&apos;s talk
                </span>
                <h2 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
                  Got something{" "}
                  <span className="font-serif-italic text-ink-soft">
                    worth building?
                  </span>
                </h2>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-soft">
                  I&apos;m a student, so my time&apos;s not infinite — but if
                  it&apos;s a small app, a poster, a lesson, or a club thing,
                  I&apos;d love to hear about it.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col">
                <Magnetic as="a" href={`mailto:${profile.email}`} strength={10}>
                  <a
                    href={`mailto:${profile.email}`}
                    className="glass glass-hover group flex items-center gap-3 rounded-full px-5 py-3 text-sm font-medium text-ink sm:text-base sm:px-6 sm:py-4"
                  >
                    <Mail size={18} />
                    {profile.email}
                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </Magnetic>

                <Magnetic as="a" href={profile.instagram.url} strength={10}>
                  <a
                    href={profile.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-full px-5 py-3 text-sm font-medium text-ink-soft transition-colors hover:text-ink sm:px-6 sm:py-4"
                  >
                    <Instagram size={18} />
                    {profile.instagram.handle}
                    <ArrowUpRight
                      size={16}
                      className="opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </Magnetic>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="mt-auto border-t border-line pb-16 sm:pb-10">
        <div className="mx-auto w-full max-w-6xl px-6 py-8 sm:py-10">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            {/* brand */}
            <div>
              <button
                onClick={() => go("home")}
                className="text-lg font-semibold tracking-tight text-ink hover:text-ink-soft transition-colors"
              >
                {profile.name}.
              </button>
            </div>

            {/* quick nav */}
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {chapters
                .filter((c) => c.id !== "home" && c.id !== "contact")
                .map((c) => (
                  <button
                    key={c.id}
                    onClick={() => go(c.id)}
                    className="text-sm text-ink-soft transition-colors hover:text-ink"
                  >
                    {c.label}
                  </button>
                ))}
            </nav>

            {/* socials */}
            <div className="flex flex-col gap-2">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink"
              >
                <Mail size={14} /> Email
              </a>
              <a
                href={profile.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink"
              >
                <Instagram size={14} /> Instagram
              </a>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-ink-faint">
              © {new Date().getFullYear()} {profile.name}.
            </p>
            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: reduced ? "auto" : "smooth",
                })
              }
              className="flex items-center gap-1.5 text-xs text-ink-soft transition-colors hover:text-ink"
            >
              Back to top <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
