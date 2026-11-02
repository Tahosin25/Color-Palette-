"use client";

import { useMemo, useState } from "react";
import { PALETTES } from "@/lib/palettes";
import PaletteCard from "@/components/PaletteCard";
import AdSense from "@/components/AdSense";

type SortKey = "popular" | "newest" | "random";

function seededShuffle<T>(items: T[], seed: number): T[] {
  const result = [...items];
  let state = seed + 1;
  for (let i = result.length - 1; i > 0; i--) {
    state = (state * 1664525 + 1013904223) % 4294967296;
    const j = Math.floor((state / 4294967296) * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>("popular");
  const [seed, setSeed] = useState(0);

  const allTags = useMemo(
    () => Array.from(new Set(PALETTES.flatMap((p) => p.tags))).sort(),
    [],
  );

  const filtered = useMemo(() => {
    let result = PALETTES.filter((p) => {
      const matchesQuery =
        !query.trim() ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
        p.colors.some((c) => c.toLowerCase().includes(query.toLowerCase()));
      const matchesTag = !activeTag || p.tags.includes(activeTag);
      return matchesQuery && matchesTag;
    });

    if (sort === "popular") {
      result = [...result].sort((a, b) => b.likes - a.likes);
    } else if (sort === "newest") {
      result = [...result].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    } else {
      result = seededShuffle(result, seed);
    }
    return result;
  }, [query, activeTag, sort, seed]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Explore palettes</h1>
        <p className="mt-1 text-zinc-500 dark:text-zinc-400">
          {filtered.length} color palette{filtered.length === 1 ? "" : "s"} to
          inspire your next project.
        </p>
      </header>

      <div className="mb-6 flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 sm:max-w-xs">
            <svg
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
            <input
              type="search"
              placeholder="Search by name, tag, or hex…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-lg border border-black/10 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-zinc-400 dark:border-white/15 dark:bg-zinc-900 dark:focus:border-zinc-500"
            />
          </div>

          <div className="flex items-center gap-1 rounded-lg border border-black/10 p-1 dark:border-white/15">
            {(
              [
                ["popular", "Popular"],
                ["newest", "Newest"],
                ["random", "Random"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setSort(key);
                  if (key === "random") setSeed((s) => s + 1);
                }}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  sort === key
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                    : "hover:bg-black/5 dark:hover:bg-white/10"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              activeTag === null
                ? "border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-900"
                : "border-black/10 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                activeTag === tag
                  ? "border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-900"
                  : "border-black/10 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-black/15 py-16 text-center dark:border-white/15">
          <p className="text-lg font-medium">No palettes found</p>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Try a different search or tag.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveTag(null);
            }}
            className="mt-4 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-zinc-900"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.slice(0, 6).map((palette) => (
              <PaletteCard key={palette.id} palette={palette} />
            ))}
          </div>
          <AdSense slot="1234567891" className="my-6" format="fluid" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.slice(6).map((palette) => (
              <PaletteCard key={palette.id} palette={palette} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
