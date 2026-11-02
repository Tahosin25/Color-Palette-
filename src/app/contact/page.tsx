import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the ColorHunt team with questions, feedback, or partnership inquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Contact us</h1>
      <p className="mt-2 text-zinc-500 dark:text-zinc-400">
        We’d love to hear from you. Reach out with feedback, bug reports, or
        partnership ideas.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-black/10 p-6 dark:border-white/10">
          <h2 className="font-semibold">Email</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            For general inquiries and support:
          </p>
          <a
            href="mailto:hello@example.com"
            className="mt-2 inline-block text-sm font-medium underline"
          >
            hello@example.com
          </a>
        </div>
        <div className="rounded-xl border border-black/10 p-6 dark:border-white/10">
          <h2 className="font-semibold">Partnerships</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Interested in collaborating or advertising with us?
          </p>
          <a
            href="mailto:partners@example.com"
            className="mt-2 inline-block text-sm font-medium underline"
          >
            partners@example.com
          </a>
        </div>
      </div>

      <div className="mt-8 rounded-xl bg-zinc-50 p-6 text-sm text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
        <p>
          <strong>Note:</strong> Replace the placeholder email addresses above
          with your own before submitting the site to Google AdSense. AdSense
          requires a reachable contact method.
        </p>
      </div>
    </div>
  );
}
