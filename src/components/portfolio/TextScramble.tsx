"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/<>{}[]!";

type QueueItem = { from: string; to: string; start: number; end: number; char?: string };

/**
 * Scrambler — module-level helper that owns the impure animation logic
 * (Math.random, requestAnimationFrame). Kept out of the component so the
 * React purity rules don't flag it as render-time work.
 */
class Scrambler {
  private frame = 0;
  private queue: QueueItem[] = [];
  private raf: number | null = null;
  private resolveCount = 0;
  private current = "";
  private onUpdate: (html: string) => void;
  private onDone: () => void;

  constructor(onUpdate: (html: string) => void, onDone: () => void) {
    this.onUpdate = onUpdate;
    this.onDone = onDone;
  }

  scramble(text: string) {
    if (this.raf !== null) cancelAnimationFrame(this.raf);
    const oldText = this.current;
    const length = Math.max(oldText.length, text.length);
    const queue: QueueItem[] = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] ?? "";
      const to = text[i] ?? "";
      const start = Math.floor(Math.random() * 6);
      const end = start + Math.floor(Math.random() * 6) + 1;
      queue.push({ from, to, start, end });
    }
    this.queue = queue;
    this.frame = 0;
    this.resolveCount = 0;
    this.current = text;
    this.raf = requestAnimationFrame(this.tick);
  }

  private tick = () => {
    let output = "";
    let complete = 0;
    for (let i = 0; i < this.queue.length; i++) {
      const item = this.queue[i];
      let { char } = item;
      if (this.frame >= item.end) {
        complete++;
        output += item.to;
      } else if (this.frame >= item.start) {
        if (!char || Math.random() < 0.28) {
          char = CHARS[Math.floor(Math.random() * CHARS.length)];
          this.queue[i].char = char;
        }
        output += `<span style="opacity:${0.55 + Math.random() * 0.45}">${char}</span>`;
      } else {
        output += item.from;
      }
    }
    this.onUpdate(output);
    if (complete === this.queue.length) {
      this.resolveCount += 1;
      if (this.resolveCount > 4) {
        this.raf = null;
        this.onUpdate(this.current);
        this.onDone();
        return;
      }
    }
    this.frame += 1;
    this.raf = requestAnimationFrame(this.tick);
  };

  stop() {
    if (this.raf !== null) cancelAnimationFrame(this.raf);
    this.raf = null;
  }
}

type TextScrambleProps = {
  text: string;
  className?: string;
  /** trigger: 'hover' scrambles on hover, 'mount' scrambles once on mount */
  trigger?: "hover" | "mount";
  as?: "span" | "h1" | "h2" | "p";
};

/**
 * TextScramble — scrambles text then resolves back to the original.
 * Used on the hero name (hover) and section labels (mount).
 */
export function TextScramble({
  text,
  className,
  trigger = "hover",
  as = "span",
}: TextScrambleProps) {
  const [display, setDisplay] = useState(text);
  const [hovering, setHovering] = useState(false);
  const scramblerRef = useRef<Scrambler | null>(null);
  const Tag = as as "span";

  // lazily create the scrambler (in an effect, not during render)
  useEffect(() => {
    const scrambler = new Scrambler(setDisplay, () => {});
    scramblerRef.current = scrambler;
    return () => {
      scrambler.stop();
      scramblerRef.current = null;
    };
  }, []);

  // mount trigger
  useEffect(() => {
    if (trigger !== "mount") return;
    const t = setTimeout(() => scramblerRef.current?.scramble(text), 120);
    return () => clearTimeout(t);
  }, [trigger, text]);

  if (trigger === "hover") {
    return (
      <Tag
        className={cn("cursor-pointer", className)}
        onMouseEnter={() => {
          setHovering(true);
          scramblerRef.current?.scramble(text);
        }}
        onMouseLeave={() => setHovering(false)}
        data-hovering={hovering}
        dangerouslySetInnerHTML={{ __html: display }}
      />
    );
  }

  return (
    <Tag className={className} dangerouslySetInnerHTML={{ __html: display }} />
  );
}
