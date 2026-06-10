import { useState } from 'react';
import { Sparkles, X } from 'lucide-react';

export default function PromoBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative z-50 bg-transparent">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-2 text-sm">
          <Sparkles className="h-4 w-4 shrink-0 text-shine-text" />
          <span className="truncate text-shine-text">
            <span className="font-semibold text-shine-text">$20 off</span> your first detail — limited time
          </span>
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="shrink-0 rounded p-1 text-shine-text transition hover:bg-brand/10 hover:text-brand"
          aria-label="Dismiss offer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
