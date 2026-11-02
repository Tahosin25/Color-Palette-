import { type Palette } from "@/types/palette";
import { getContrastColor } from "@/lib/utils";
import CopyButton from "./CopyButton";
import LikeButton from "./LikeButton";

type PaletteViewerProps = {
  palette: Palette;
};

export default function PaletteViewer({ palette }: PaletteViewerProps) {
  return (
    <section>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {palette.colors.map((color, i) => (
          <div
            key={`${color}-${i}`}
            className="flex flex-col overflow-hidden rounded-xl border border-black/10 shadow-sm dark:border-white/10"
          >
            <div className="flex h-48 items-center justify-center sm:h-56">
              <div
                className="flex h-full w-full flex-col items-center justify-center gap-3"
                style={{ backgroundColor: color, color: getContrastColor(color) }}
              >
                <span className="font-mono text-lg font-semibold tracking-wider">
                  {color.toUpperCase()}
                </span>
                <CopyButton
                  value={color}
                  label={`Copy ${color.toUpperCase()}`}
                  variant="solid"
                  className="border border-current/20"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <CopyButton
          value={palette.colors.join(", ")}
          label="Copy all colors"
          variant="solid"
          className="px-4 py-2 text-sm"
        />
        <LikeButton paletteId={palette.id} baseLikes={palette.likes} />
      </div>
    </section>
  );
}
