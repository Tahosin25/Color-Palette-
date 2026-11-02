import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PALETTES, getPaletteById, getRelatedPalettes } from "@/lib/palettes";
import PaletteViewer from "@/components/PaletteViewer";
import PaletteCard from "@/components/PaletteCard";
import AdSense from "@/components/AdSense";

type PalettePageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return PALETTES.map((palette) => ({ id: palette.id }));
}

export async function generateMetadata({
  params,
}: PalettePageProps): Promise<Metadata> {
  const { id } = await params;
  const palette = getPaletteById(id);
  if (!palette) return { title: "Palette not found" };

  const title = `${palette.name} — ${palette.colors.join(", ")} Color Palette`;
  const description = `Color palette "${palette.name}" with hex codes ${palette.colors.join(", ")}. Tags: ${palette.tags.join(", ")}.`;

  return {
    title,
    description,
    alternates: { canonical: `/palette/${palette.id}` },
    openGraph: {
      title,
      description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function PalettePage({ params }: PalettePageProps) {
  const { id } = await params;
  const palette = getPaletteById(id);
  if (!palette) notFound();

  const related = getRelatedPalettes(id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${palette.name} Color Palette`,
    description: `A ${palette.colors.length}-color palette with hex codes ${palette.colors.join(", ")}.`,
    keywords: palette.tags.join(", "),
    dateCreated: palette.createdAt,
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/explore" className="hover:underline">Palettes</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-900 dark:text-zinc-100">{palette.name}</span>
      </nav>

      <header className="mb-6">
        <h1 className="text-3xl font-bold">{palette.name}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <span>♥ {palette.likes.toLocaleString()} likes</span>
          <span>·</span>
          <time dateTime={palette.createdAt}>
            {new Date(palette.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
          <span>·</span>
          <div className="flex flex-wrap gap-1.5">
            {palette.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="rounded-full border border-black/10 px-2 py-0.5 text-xs hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <PaletteViewer palette={palette} />

      <AdSense slot="1234567892" className="my-8" format="auto" />

      <section className="mt-10">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-xl font-bold">Related palettes</h2>
          <Link href="/explore" className="text-sm font-medium hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((p) => (
            <PaletteCard key={p.id} palette={p} />
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-xl border border-black/10 p-6 dark:border-white/10">
        <h2 className="text-lg font-bold">About this palette</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          <strong>{palette.name}</strong> is a{" "}
          {palette.tags.join(", ")} color palette featuring the hex codes{" "}
          {palette.colors.map((c, i) => (
            <span key={c}>
              <code className="rounded bg-black/5 px-1.5 py-0.5 font-mono text-xs dark:bg-white/10">
                {c.toUpperCase()}
              </code>
              {i < palette.colors.length - 1 ? ", " : ""}
            </span>
          ))}
          . Click any swatch to copy its hex code, or use “Copy all colors” to
          copy the full palette for Figma, CSS, or your design tool of choice.
        </p>
      </section>
    </div>
  );
}
