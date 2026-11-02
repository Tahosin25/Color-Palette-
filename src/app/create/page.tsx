"use client";

import { useCallback, useEffect, useState } from "react";
import { getContrastColor } from "@/lib/utils";
import CopyButton from "@/components/CopyButton";

function randomHex(): string {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`.toUpperCase();
}

function hslToHex(h: number, s: number, l: number): string {
  const sat = s / 100;
  const lig = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = sat * Math.min(lig, 1 - lig);
  const f = (n: number) =>
    lig - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = (x: number) =>
    Math.round(255 * x)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`.toUpperCase();
}

function generateHarmonious(): string[] {
  const baseHue = Math.floor(Math.random() * 360);
  const schemes = [
    [0, 30, 60, 90],
    [0, 120, 240, 300],
    [0, 180, 30, 210],
    [0, 15, 180, 195],
  ];
  const scheme = schemes[Math.floor(Math.random() * schemes.length)];
  return scheme.map((offset, i) =>
    hslToHex(
      (baseHue + offset) % 360,
      55 + Math.random() * 35,
      35 + i * 12 + Math.random() * 10,
    ),
  );
}

export default function CreatePage() {
  const [colors, setColors] = useState<string[]>([
    "#FF6B6B",
    "#4ECDC4",
    "#FFE66D",
    "#1A535C",
  ]);
  const [editing, setEditing] = useState<number | null>(null);
  const [draft, setDraft] = useState("");

  const generate = useCallback(() => {
    setColors(Math.random() > 0.35 ? generateHarmonious() : [randomHex(), randomHex(), randomHex(), randomHex()]);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" && e.target === document.body) {
        e.preventDefault();
        generate();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [generate]);

  function updateColor(index: number, value: string) {
    setColors((prev) => prev.map((c, i) => (i === index ? value.toUpperCase() : c)));
  }

  function commitDraft(index: number) {
    const value = draft.trim();
    if (/^#?[0-9a-fA-F]{6}$/.test(value)) {
      updateColor(index, value.startsWith("#") ? value : `#${value}`);
    }
    setEditing(null);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Palette generator</h1>
        <p className="mt-1 text-zinc-500 dark:text-zinc-400">
          Generate harmonious color palettes and copy the hex codes instantly.
        </p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-black/10 shadow-sm dark:border-white/10">
        <div className="grid grid-cols-2 sm:grid-cols-4">
          {colors.map((color, i) => {
            const text = getContrastColor(color);
            return (
              <div
                key={i}
                className="relative flex h-52 flex-col items-center justify-center gap-3 p-3 sm:h-72"
                style={{ backgroundColor: color, color: text }}
              >
                {editing === i ? (
                  <input
                    autoFocus
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onBlur={() => commitDraft(i)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") commitDraft(i);
                      if (e.key === "Escape") setEditing(null);
                    }}
                    maxLength={7}
                    aria-label="Edit hex color"
                    className="w-24 rounded-md border border-current/30 bg-white/20 px-2 py-1 text-center font-mono text-sm uppercase outline-none backdrop-blur"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setDraft(color);
                      setEditing(i);
                    }}
                    className="font-mono text-lg font-semibold tracking-wider hover:underline"
                  >
                    {color}
                  </button>
                )}

                <label className="relative inline-flex cursor-pointer items-center justify-center rounded-md border border-current/25 bg-white/10 px-2 py-1 text-xs font-medium backdrop-blur transition-colors hover:bg-white/20">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => updateColor(i, e.target.value.toUpperCase())}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    aria-label={`Pick color ${i + 1}`}
                  />
                  Pick
                </label>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={generate}
          className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Generate palette <span className="ml-1 text-xs opacity-60">(Space)</span>
        </button>
        <CopyButton
          value={colors.join(", ")}
          label="Copy all colors"
          variant="solid"
          className="rounded-full px-6 py-3 text-sm"
        />
      </div>

      <section className="mt-12 rounded-xl border border-black/10 p-6 dark:border-white/10">
        <h2 className="text-lg font-bold">How to use the palette generator</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
          <li>Press <strong>Generate palette</strong> or hit the space bar for a new random palette.</li>
          <li>Click a hex code to type an exact value, or use <strong>Pick</strong> to open the color picker.</li>
          <li>Use <strong>Copy all colors</strong> to grab every hex code for Figma, CSS, or Photoshop.</li>
        </ol>
      </section>
    </div>
  );
}
