import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-black/10 bg-zinc-50 dark:border-white/10 dark:bg-zinc-950">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 text-lg font-bold">
            <span className="flex h-6 w-6 overflow-hidden rounded-md">
              <span className="h-full w-1/2 bg-[#FF6B6B]" />
              <span className="h-full w-1/2 bg-[#4ECDC4]" />
            </span>
            ColorHunt
          </div>
          <p className="mt-2 max-w-xs text-sm text-zinc-500 dark:text-zinc-400">
            Discover, create, and share beautiful color palettes. Free tools for
            designers and developers.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Explore</h3>
          <ul className="mt-3 space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
            <li><Link href="/" className="hover:underline">Trending palettes</Link></li>
            <li><Link href="/explore" className="hover:underline">All palettes</Link></li>
            <li><Link href="/create" className="hover:underline">Palette generator</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Company</h3>
          <ul className="mt-3 space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
            <li><Link href="/about" className="hover:underline">About</Link></li>
            <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-black/10 py-4 text-center text-xs text-zinc-500 dark:border-white/10 dark:text-zinc-400">
        © {new Date().getFullYear()} ColorHunt. All rights reserved.
      </div>
    </footer>
  );
}
