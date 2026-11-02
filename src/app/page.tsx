import Link from "next/link";
import { PALETTES } from "@/lib/palettes";
import PaletteCard from "@/components/PaletteCard";
import AdSense from "@/components/AdSense";

const trending = [...PALETTES].sort((a, b) => b.likes - a.likes).slice(0, 9);
const recent = [...PALETTES]
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  .slice(0, 9);

const FEATURES = [
  {
    title: "Curated palettes",
    body: "Hand-picked color combinations for web, branding, and illustration.",
    icon: "🎨",
  },
  {
    title: "One-click copy",
    body: "Copy hex codes individually or grab an entire palette in seconds.",
    icon: "📋",
  },
  {
    title: "Create your own",
    body: "Generate harmonious palettes with our free browser-based tool.",
    icon: "✨",
  },
];

export default function Home() {
  return (
    <div>
      <section className="border-b border-black/10 bg-gradient-to-b from-zinc-50 to-white dark:border-white/10 dark:from-zinc-900 dark:to-zinc-950">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:py-24">
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            Beautiful color palettes for your next{" "}
            <span className="bg-gradient-to-r from-rose-500 to-teal-500 bg-clip-text text-transparent">
              big idea
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-zinc-600 dark:text-zinc-400">
            Browse hand-picked color combinations, copy hex codes instantly, and
            create your own palettes — all free, in your browser.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/explore"
              className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Explore palettes
            </Link>
            <Link
              href="/create"
              className="rounded-full border border-black/15 px-6 py-3 text-sm font-semibold transition-colors hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
            >
              Create a palette
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        <section className="py-12">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold">Trending palettes</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Most-loved color combinations this week
              </p>
            </div>
            <Link href="/explore" className="text-sm font-medium hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {trending.map((palette) => (
              <PaletteCard key={palette.id} palette={palette} />
            ))}
          </div>
        </section>

        <AdSense slot="1234567890" className="my-6" format="fluid" />

        <section className="py-12">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold">Fresh arrivals</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                The newest palettes added to the collection
              </p>
            </div>
            <Link href="/explore" className="text-sm font-medium hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((palette) => (
              <PaletteCard key={palette.id} palette={palette} />
            ))}
          </div>
        </section>

        <section className="py-12">
          <h2 className="text-center text-2xl font-bold">Why ColorHunt?</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-black/10 p-6 text-center dark:border-white/10"
              >
                <div className="text-3xl">{feature.icon}</div>
                <h3 className="mt-3 font-semibold">{feature.title}</h3>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  {feature.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="my-12 overflow-hidden rounded-2xl bg-zinc-900 px-6 py-12 text-center text-white dark:bg-zinc-800">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Get inspired. Start creating.
          </h2>
          <p className="mx-auto mt-2 max-w-md text-zinc-300">
            Find the perfect colors for your website, brand, or artwork in
            minutes.
          </p>
          <Link
            href="/explore"
            className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-200"
          >
            Browse all palettes
          </Link>
        </section>
      </div>
    </div>
  );
}
