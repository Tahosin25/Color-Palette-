import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for ColorHunt — how we handle cookies, advertising, and your data.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <section>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">1. Information we collect</h2>
          <p className="mt-2">
            ColorHunt is a browser-based website. We do not require accounts and
            do not collect names, email addresses, or payment information. Your
            favorite palettes are stored locally in your browser using
            localStorage and never leave your device.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">2. Advertising and cookies</h2>
          <p className="mt-2">
            We use Google AdSense to display advertisements. Google, as a
            third-party vendor, uses cookies to serve ads on this site. Google’s
            use of advertising cookies enables it and its partners to serve ads
            to you based on your visit to this site and/or other sites on the
            Internet.
          </p>
          <p className="mt-2">
            You may opt out of personalized advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              className="underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              Google Ads Settings
            </a>{" "}
            or{" "}
            <a
              href="https://www.aboutads.info/choices/"
              className="underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              www.aboutads.info
            </a>
            . Third-party vendors may also use cookies for interest-based
            advertising. For more information, see{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              className="underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              How Google uses data when you use our partners’ sites or apps
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">3. Analytics</h2>
          <p className="mt-2">
            We may use privacy-respecting analytics to understand aggregate site
            usage. Any analytics data is anonymized and does not identify
            individual visitors.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">4. Third-party links</h2>
          <p className="mt-2">
            Our site may contain links to third-party websites. We are not
            responsible for the privacy practices or content of those sites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">5. Children’s privacy</h2>
          <p className="mt-2">
            Our site is not directed to children under 13. We do not knowingly
            collect personal information from children.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">6. Changes to this policy</h2>
          <p className="mt-2">
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page with an updated date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">7. Contact</h2>
          <p className="mt-2">
            If you have questions about this Privacy Policy, please contact us
            via the <a href="/contact" className="underline">contact page</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
