import { TrendingDown, TrendingUp, Minus } from "lucide-react";

import { cn } from "@/lib/utils";

export function KpiCard({
  label,
  value,
  unit,
  delta,
  goodDirection = "up",
  hint,
}: {
  label: string;
  value: string | number;
  unit?: string;
  delta?: number;
  goodDirection?: "up" | "down";
  hint?: string;
}) {
  const dir = delta === undefined ? "flat" : delta > 0 ? "up" : delta < 0 ? "down" : "flat";
  const good = dir === "flat" ? null : dir === goodDirection;
  const Icon = dir === "up" ? TrendingUp : dir === "down" ? TrendingDown : Minus;

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-panel transition-colors hover:border-primary/50">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
      <div className="mt-2 flex items-end gap-1.5">
        <span className="font-display text-2xl font-semibold tabular-nums">{value}</span>
        {unit && <span className="pb-1 text-xs text-muted-foreground">{unit}</span>}
      </div>
      <div className="mt-2 flex items-center gap-2 text-xs">
        {delta !== undefined && (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 font-medium",
              good === null && "bg-muted text-muted-foreground",
              good === true && "bg-success/15 text-success",
              good === false && "bg-destructive/15 text-destructive",
            )}
          >
            <Icon className="size-3" />
            {delta > 0 ? "+" : ""}
            {delta}
          </span>
        )}
        {hint && <span className="truncate text-muted-foreground">{hint}</span>}
      </div>
    </div>
  );
}
