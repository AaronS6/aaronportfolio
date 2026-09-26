"use client";

import { create } from "zustand";

type UiState = {
  /** Command palette (⌘K) */
  commandOpen: boolean;
  setCommandOpen: (v: boolean) => void;
  toggleCommand: () => void;

  /** Shortcuts help overlay (?) */
  shortcutsOpen: boolean;
  setShortcutsOpen: (v: boolean) => void;
  toggleShortcuts: () => void;

  /** Loader done — gates the intro animation */
  loaded: boolean;
  setLoaded: (v: boolean) => void;

  /** Currently focused section id (for chapter rail) */
  activeSection: string;
  setActiveSection: (id: string) => void;
};

export const useUiStore = create<UiState>((set, get) => ({
  commandOpen: false,
  setCommandOpen: (v) => set({ commandOpen: v }),
  toggleCommand: () => set({ commandOpen: !get().commandOpen }),

  shortcutsOpen: false,
  setShortcutsOpen: (v) => set({ shortcutsOpen: v }),
  toggleShortcuts: () => set({ shortcutsOpen: !get().shortcutsOpen }),

  loaded: false,
  setLoaded: (v) => set({ loaded: v }),

  activeSection: "home",
  setActiveSection: (id) => set({ activeSection: id }),
}));
