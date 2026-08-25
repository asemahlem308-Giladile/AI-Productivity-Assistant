import { Fragment } from "react";

/** Lightweight renderer for the markdown-ish text InduTech AI returns. */
export function AiOutput({ text }: { text: string }) {
  const lines = text.split("\n");

  return (
    <div className="space-y-2 text-sm leading-relaxed text-foreground">
      {lines.map((raw, i) => {
        const line = raw.trimEnd();
        if (!line.trim()) return <div key={i} className="h-1" />;

        if (/^#{1,6}\s/.test(line)) {
          return (
            <h4
              key={i}
              className="pt-3 font-display text-xs font-semibold uppercase tracking-[0.18em] text-primary"
            >
              {inline(line.replace(/^#{1,6}\s/, ""))}
            </h4>
          );
        }

        if (line.trim().startsWith("|")) {
          const cells = line.split("|").slice(1, -1);
          if (cells.every((c) => /^\s*:?-{2,}:?\s*$/.test(c))) return null;
          return (
            <div
              key={i}
              className="grid gap-2 rounded-md border border-border/60 bg-secondary/40 px-3 py-2 text-xs"
              style={{ gridTemplateColumns: `repeat(${cells.length}, minmax(0,1fr))` }}
            >
              {cells.map((c, j) => (
                <span key={j} className="truncate">
                  {inline(c.trim())}
                </span>
              ))}
            </div>
          );
        }

        if (/^\s*([-*•]|\d+\.)\s+/.test(line)) {
          return (
            <div key={i} className="flex gap-2 pl-1">
              <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-primary" />
              <span>{inline(line.replace(/^\s*([-*•]|\d+\.)\s+/, ""))}</span>
            </div>
          );
        }

        return <p key={i}>{inline(line)}</p>;
      })}
    </div>
  );
}

function inline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-foreground">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}
