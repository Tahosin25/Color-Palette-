"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type CopyButtonProps = {
  value: string;
  label?: string;
  className?: string;
  variant?: "solid" | "ghost";
};

export default function CopyButton({
  value,
  label,
  className,
  variant = "ghost",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy ${value}`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
        variant === "solid"
          ? "bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20"
          : "border border-black/10 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10",
        className,
      )}
    >
      {copied ? (
        <>
          <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z"
              clipRule="evenodd"
            />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7 3a2 2 0 00-2 2v10a2 2 0 002 2h6a2 2 0 002-2V5a2 2 0 00-2-2H7z" />
            <path d="M4 6a1 1 0 012 0v8a1 1 0 01-2 0V6z" />
          </svg>
          {label ?? value.toUpperCase()}
        </>
      )}
    </button>
  );
}
