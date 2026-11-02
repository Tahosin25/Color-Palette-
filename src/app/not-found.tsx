import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <div className="flex h-20 w-20 overflow-hidden rounded-2xl shadow-lg">
        <span className="h-full w-1/4 bg-[#FF6B6B]" />
        <span className="h-full w-1/4 bg-[#4ECDC4]" />
        <span className="h-full w-1/4 bg-[#FFE66D]" />
        <span className="h-full w-1/4 bg-[#1A535C]" />
      </div>
      <h1 className="mt-6 text-4xl font-extrabold">404</h1>
      <p className="mt-2 text-zinc-500 dark:text-zinc-400">
        This palette doesn’t exist — but plenty of others do.
      </p>
      <div className="mt-6 flex gap-3">
        <Link
          href="/"
          className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-zinc-900"
        >
          Go home
        </Link>
        <Link
          href="/explore"
          className="rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold dark:border-white/20"
        >
          Explore palettes
        </Link>
      </div>
    </div>
  );
}
