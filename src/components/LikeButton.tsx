"use client";

import { useSyncExternalStore } from "react";
import {
  getFavoritesServerSnapshot,
  getFavoritesSnapshot,
  subscribeFavorites,
  toggleFavorite,
} from "@/lib/storage";
import { cn } from "@/lib/utils";

type LikeButtonProps = {
  paletteId: string;
  baseLikes: number;
  className?: string;
};

export default function LikeButton({ paletteId, baseLikes, className }: LikeButtonProps) {
  const favorites = useSyncExternalStore(
    subscribeFavorites,
    getFavoritesSnapshot,
    getFavoritesServerSnapshot,
  );
  const liked = favorites.includes(paletteId);
  const count = baseLikes + (liked ? 1 : 0);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(paletteId)}
      aria-pressed={liked}
      aria-label={liked ? "Remove from favorites" : "Add to favorites"}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        liked
          ? "border-rose-300 bg-rose-50 text-rose-600 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-400"
          : "border-black/10 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10",
        className,
      )}
    >
      <svg
        className={cn("h-4 w-4 transition-transform", liked && "scale-110 fill-current")}
        viewBox="0 0 24 24"
        fill={liked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" />
      </svg>
      {count.toLocaleString()}
    </button>
  );
}
