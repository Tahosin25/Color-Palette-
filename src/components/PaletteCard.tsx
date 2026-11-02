import Link from "next/link";
import { type Palette } from "@/types/palette";
import { getContrastColor } from "@/lib/utils";
import CopyButton from "./CopyButton";

type PaletteCardProps = {
  palette: Palette;
};

export default function PaletteCard({ palette }: PaletteCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-white/10 dark:bg-zinc-900">
      <Link href={`/palette/${palette.id}`} className="block">
        <div className="flex h-36 w-full">
          {palette.colors.map((color) => (
            <div
              key={color}
              className="flex-1 transition-transform duration-200 group-hover:flex-[1.08]"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </Link>
      <div className="flex items-center justify-between gap-2 px-3 py-2.5">
        <div className="min-w-0">
          <Link
            href={`/palette/${palette.id}`}
            className="block truncate text-sm font-semibold hover:underline"
          >
            {palette.name}
          </Link>
          <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
            {palette.tags.slice(0, 3).join(" · ")}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            ♥ {palette.likes.toLocaleString()}
          </span>
          <CopyButton
            value={palette.colors.join(", ")}
            label="Copy"
            className="ml-1"
          />
        </div>
      </div>
      <ul className="flex border-t border-black/5 dark:border-white/5">
        {palette.colors.map((color) => (
          <li
            key={color}
            className="flex flex-1 justify-center py-1 text-[10px] font-mono"
            style={{
              backgroundColor: color,
              color: getContrastColor(color),
            }}
          >
            {color.slice(1).toUpperCase()}
          </li>
        ))}
      </ul>
    </article>
  );
}
