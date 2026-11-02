import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ALL_TAGS, getPalettesByTag } from "@/lib/palettes";
import PaletteCard from "@/components/PaletteCard";
import AdSense from "@/components/AdSense";

type TagPageProps = {
  params: Promise<{ tag: string }>;
};

export function generateStaticParams() {
  return ALL_TAGS.map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const palettes = getPalettesByTag(tag);
  if (palettes.length === 0) return { title: "Tag not found" };

  const title = `${tag.charAt(0).toUpperCase() + tag.slice(1)} Color Palettes`;
  const description = `Browse ${palettes.length} ${tag} color palettes with hex codes. Perfect for websites, branding, and design projects.`;

  return {
    title,
    description,
    alternates: { canonical: `/tags/${tag}` },
    openGraph: { title, description, type: "website" },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const palettes = getPalettesByTag(tag);
  if (palettes.length === 0) notFound();

  const sorted = [...palettes].sort((a, b) => b.likes - a.likes);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <nav className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/explore" className="hover:underline">Palettes</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-900 dark:text-zinc-100">#{tag}</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl font-bold capitalize">{tag} color palettes</h1>
        <p className="mt-1 text-zinc-500 dark:text-zinc-400">
          {palettes.length} hand-picked palettes tagged “{tag}”. Copy any hex
          code or save the whole palette for later.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.slice(0, 6).map((palette) => (
          <PaletteCard key={palette.id} palette={palette} />
        ))}
      </div>

      {sorted.length > 6 && (
        <>
          <AdSense slot="1234567893" className="my-6" format="fluid" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.slice(6).map((palette) => (
              <PaletteCard key={palette.id} palette={palette} />
            ))}
          </div>
        </>
      )}

      <section className="mt-12">
        <h2 className="text-lg font-bold">Browse other tags</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {ALL_TAGS.filter((t) => t !== tag).map((t) => (
            <Link
              key={t}
              href={`/tags/${t}`}
              className="rounded-full border border-black/10 px-3 py-1 text-xs font-medium hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
            >
              {t}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
