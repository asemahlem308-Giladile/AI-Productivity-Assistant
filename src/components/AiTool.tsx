import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Sparkles, ShieldAlert } from "lucide-react";
import { useState, type ReactNode } from "react";

import { askInduTechAI } from "@/lib/ai.functions";
import { AiOutput } from "@/components/AiOutput";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AiDisclaimer } from "@/components/AiDisclaimer";

type Props = {
  mode: string;
  title: string;
  description: string;
  placeholder: string;
  examples?: string[];
  context?: string;
  cta?: string;
  extra?: ReactNode;
  buildInput?: (raw: string) => string;
};

export function AiTool({
  mode,
  title,
  description,
  placeholder,
  examples = [],
  context,
  cta = "Run InduTech AI",
  extra,
  buildInput,
}: Props) {
  const [value, setValue] = useState("");
  const call = useServerFn(askInduTechAI);

  const mutation = useMutation({
    mutationFn: (input: string) => call({ data: { mode, input, context } }),
  });

  const run = () => {
    const raw = value.trim();
    if (!raw) return;
    mutation.mutate(buildInput ? buildInput(raw) : raw);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      <section className="rounded-xl border border-border bg-card p-5 shadow-panel">
        <h2 className="font-display text-lg font-semibold">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>

        {extra ? <div className="mt-4">{extra}</div> : null}

        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="mt-4 min-h-44 resize-y bg-secondary/40 text-sm"
        />

        {examples.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {examples.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => setValue(ex)}
                className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
              >
                {ex}
              </button>
            ))}
          </div>
        )}

        <Button onClick={run} disabled={mutation.isPending || !value.trim()} className="mt-4 w-full">
          {mutation.isPending ? (
            <>
              <Loader2 className="animate-spin" /> Analysing…
            </>
          ) : (
            <>
              <Sparkles /> {cta}
            </>
          )}
        </Button>

        <AiDisclaimer className="mt-4" />
      </section>

      <section className="rounded-xl border border-border bg-card p-5 shadow-panel">
        <div className="flex items-center justify-between gap-3 border-b border-border pb-3">
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            InduTech AI Output
          </h3>
          <span className="rounded-full bg-primary/15 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-primary">
            {mode}
          </span>
        </div>

        <div className="mt-4 min-h-64">
          {mutation.isPending && (
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" /> InduTech AI is analysing your input…
            </p>
          )}

          {mutation.isError && (
            <p className="flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive-foreground">
              <ShieldAlert className="mt-0.5 size-4 shrink-0" />
              {(mutation.error as Error).message}
            </p>
          )}

          {!mutation.isPending && !mutation.isError && !mutation.data && (
            <p className="text-sm text-muted-foreground">
              Enter your details on the left and run the analysis. Results are structured for operational
              decision-making.
            </p>
          )}

          {mutation.data && <AiOutput text={mutation.data.text} />}
        </div>
      </section>
    </div>
  );
}
