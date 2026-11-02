"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/create", label: "Create" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-zinc-950/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <span className="flex h-7 w-7 overflow-hidden rounded-md">
            <span className="h-full w-1/2 bg-[#FF6B6B]" />
            <span className="h-full w-1/2 bg-[#4ECDC4]" />
          </span>
          ColorHunt
        </Link>

        <div className="hidden items-center gap-1 sm:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/10",
                pathname === link.href && "bg-black/5 dark:bg-white/10",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/create"
            className="ml-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            + Create Palette
          </Link>
        </div>

        <button
          type="button"
          className="rounded-md p-2 sm:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-black/10 px-4 py-2 sm:hidden dark:border-white/10">
          <div className="flex flex-col">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/create"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-zinc-900 px-3 py-2 text-center text-sm font-medium text-white dark:bg-white dark:text-zinc-900"
            >
              + Create Palette
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
