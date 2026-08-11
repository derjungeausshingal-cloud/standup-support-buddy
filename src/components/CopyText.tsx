import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyText({ text, tone = "default" }: { text: string; tone?: "default" | "soft" }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* Kopieren nicht möglich */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Satz kopieren"
      className={`card-tile grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-4 text-left ${
        tone === "soft" ? "bg-muted/60" : ""
      }`}
    >
      <span className="min-w-0 text-sm leading-snug">„{text}“</span>
      <span
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${
          copied ? "bg-success-soft text-success" : "bg-primary-soft text-primary"
        }`}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </span>
    </button>
  );
}
