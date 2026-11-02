import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about ColorHunt — a free collection of beautiful color palettes for designers and developers.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">About ColorHunt</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          ColorHunt is a free resource for designers, developers, and creators
          looking for beautiful color palettes. Every palette is hand-picked to
          help you find the perfect combination for your website, branding,
          illustration, or interior design project.
        </p>
        <p>
          Our mission is simple: make color selection effortless. Browse curated
          palettes, copy hex codes with one click, and generate your own
          harmonious schemes — all directly in your browser, with no sign-up
          required.
        </p>

        <h2 className="pt-4 text-xl font-bold text-zinc-900 dark:text-zinc-100">
          What you can do here
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Browse hundreds of curated four-color palettes.</li>
          <li>Filter by tags such as pastel, neon, nature, or vintage.</li>
          <li>Copy individual hex codes or full palettes instantly.</li>
          <li>Generate new palettes with our free browser-based tool.</li>
          <li>Save your favorites locally in your browser.</li>
        </ul>

        <h2 className="pt-4 text-xl font-bold text-zinc-900 dark:text-zinc-100">
          How the site is funded
        </h2>
        <p>
          ColorHunt is free to use and supported by advertising. Ads are served
          by Google AdSense. We do not sell your personal data. See our{" "}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>{" "}
          for details on cookies and advertising.
        </p>

        <h2 className="pt-4 text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Contact
        </h2>
        <p>
          Questions, feedback, or partnership inquiries?{" "}
          <Link href="/contact" className="underline">
            Get in touch
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
