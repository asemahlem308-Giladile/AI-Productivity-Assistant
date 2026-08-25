import { Info } from "lucide-react";

import { cn } from "@/lib/utils";

export function AiDisclaimer({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "flex items-start gap-2 rounded-md border border-border/70 bg-secondary/40 p-3 text-xs leading-relaxed text-muted-foreground",
        className,
      )}
    >
      <Info className="mt-0.5 size-3.5 shrink-0 text-primary" />
      InduTech AI provides data-driven insights and recommendations to support operational decision-making.
      AI-generated recommendations should be reviewed and validated by qualified professionals before
      implementation.
    </p>
  );
}
