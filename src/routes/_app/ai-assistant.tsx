import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Bot, Loader2, Send, User } from "lucide-react";
import { useState } from "react";

import { PageHeader } from "@/components/PageHeader";
import { AiOutput } from "@/components/AiOutput";
import { AiDisclaimer } from "@/components/AiDisclaimer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { askInduTechAI } from "@/lib/ai.functions";
import { operationsContext } from "@/lib/sample-data";

export const Route = createFileRoute("/_app/ai-assistant")({
  head: () => ({
    meta: [
      { title: "AI Operations Assistant | InduTech Solutions" },
      {
        name: "description",
        content:
          "Ask operational questions and get insight, possible causes, recommended actions, priority and expected impact grounded in your operational data.",
      },
      { property: "og:title", content: "InduTech AI Operations Assistant" },
      {
        property: "og:description",
        content: "Decision support for efficiency, downtime, defects, bottlenecks and automation priorities.",
      },
    ],
  }),
  component: Assistant,
});

const suggestions = [
  "Why is production efficiency decreasing?",
  "What is causing our high defect rate?",
  "Where are the biggest bottlenecks?",
  "How can we reduce waste?",
  "What should management prioritise?",
  "What process should we automate first?",
  "How can we improve productivity?",
  "What operational risks should we investigate?",
];

type Turn = { role: "user" | "ai"; text: string };

function Assistant() {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [value, setValue] = useState("");
  const call = useServerFn(askInduTechAI);

  const mutation = useMutation({
    mutationFn: (question: string) =>
      call({
        data: {
          mode: "assistant",
          input: `Conversation so far:\n${turns.map((t) => `${t.role === "user" ? "User" : "InduTech AI"}: ${t.text}`).join("\n\n") || "(none)"}\n\nNew question: ${question}`,
          context: operationsContext(),
        },
      }),
    onSuccess: (res) => setTurns((prev) => [...prev, { role: "ai", text: res.text }]),
  });

  const send = (question: string) => {
    const q = question.trim();
    if (!q || mutation.isPending) return;
    setTurns((prev) => [...prev, { role: "user", text: q }]);
    setValue("");
    mutation.mutate(q);
  };

  return (
    <>
      <PageHeader
        eyebrow="AI Workplace Tool"
        title="InduTech AI Operations Assistant"
        description="Grounded in the Kwazi Manufacturing operational dataset — efficiency, downtime, defects, output and inventory. Every answer returns insight, possible causes, recommended action, priority and expected impact."
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,280px)]">
        <section className="flex min-h-[520px] flex-col rounded-xl border border-border bg-card shadow-panel">
          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {turns.length === 0 && !mutation.isPending && (
              <div className="rounded-lg border border-border bg-secondary/40 p-4 text-sm text-muted-foreground">
                Ask an operational question. The assistant only uses the operational data loaded into the
                platform and will state its assumptions where information is incomplete.
              </div>
            )}

            {turns.map((t, i) => (
              <div key={i} className="flex gap-3">
                <span
                  className={
                    t.role === "user"
                      ? "grid size-8 shrink-0 place-items-center rounded-md bg-secondary text-muted-foreground"
                      : "grid size-8 shrink-0 place-items-center rounded-md bg-primary/15 text-primary"
                  }
                >
                  {t.role === "user" ? <User className="size-4" /> : <Bot className="size-4" />}
                </span>
                <div className="min-w-0 flex-1 rounded-lg border border-border bg-secondary/30 p-3">
                  {t.role === "user" ? <p className="text-sm">{t.text}</p> : <AiOutput text={t.text} />}
                </div>
              </div>
            ))}

            {mutation.isPending && (
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" /> InduTech AI is analysing the operational data…
              </p>
            )}

            {mutation.isError && (
              <p className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                {(mutation.error as Error).message}
              </p>
            )}
          </div>

          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <Textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(value);
                  }
                }}
                placeholder="Ask about efficiency, downtime, defects, bottlenecks, waste or automation priorities…"
                className="min-h-11 resize-none bg-secondary/40 text-sm"
              />
              <Button onClick={() => send(value)} disabled={mutation.isPending || !value.trim()}>
                <Send />
              </Button>
            </div>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-4 shadow-panel">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Suggested questions
            </h2>
            <div className="mt-3 space-y-1.5">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="w-full rounded-md border border-border bg-secondary/40 px-3 py-2 text-left text-xs text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <AiDisclaimer />
        </aside>
      </div>
    </>
  );
}
