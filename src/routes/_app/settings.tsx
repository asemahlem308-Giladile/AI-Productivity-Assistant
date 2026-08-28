import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, ShieldCheck } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { AiDisclaimer } from "@/components/AiDisclaimer";
import { MASTER_PROMPT } from "@/lib/ai.functions";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({
    meta: [
      { title: "Settings & Responsible AI | InduTech Solutions" },
      {
        name: "description",
        content:
          "Platform configuration, technology architecture and the responsible AI safeguards applied across InduTech Solutions.",
      },
      { property: "og:title", content: "Settings & Responsible AI | InduTech Solutions" },
      {
        property: "og:description",
        content: "AI system prompt, limitations, validation requirements and technology stack.",
      },
    ],
  }),
  component: Settings,
});

const safeguards = [
  "The assistant answers only from the operational data supplied by the platform.",
  "Assumptions are stated explicitly when information is incomplete.",
  "Confidential business information stays within the workspace and is never used to train models.",
  "AI limitations, bias and uncertainty are surfaced with every recommendation.",
  "High-impact operational decisions require human review before implementation.",
];

const stack = [
  ["AI reasoning", "Lovable AI Gateway (Gemini class models)"],
  ["Business intelligence", "In-app dashboards, Power BI compatible exports"],
  ["Workflow automation", "Power Automate / API integrations"],
  ["Data capture", "Digital forms replacing paper sheets"],
  ["Data storage", "Structured operational database"],
  ["Analytics", "Industrial Engineering KPI engine"],
];

function Settings() {
  return (
    <>
      <PageHeader
        eyebrow="Platform"
        title="Settings, Architecture &amp; Responsible AI"
        description="How InduTech AI is configured, what technologies the platform demonstrates, and the safeguards that govern AI use."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-border bg-card p-5 shadow-panel">
          <h2 className="flex items-center gap-2 font-display text-base font-semibold">
            <ShieldCheck className="size-4 text-primary" /> Responsible AI safeguards
          </h2>
          <ul className="mt-4 space-y-2.5">
            {safeguards.map((s) => (
              <li key={s} className="flex gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                {s}
              </li>
            ))}
          </ul>
          <AiDisclaimer className="mt-4" />
        </section>

        <section className="rounded-xl border border-border bg-card p-5 shadow-panel">
          <h2 className="font-display text-base font-semibold">Technology architecture</h2>
          <dl className="mt-4 divide-y divide-border text-sm">
            {stack.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-2.5">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="text-right">{v}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <section className="rounded-xl border border-border bg-card p-5 shadow-panel">
        <h2 className="font-display text-base font-semibold">InduTech AI master system prompt</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Every AI feature on the platform is grounded in this instruction set.
        </p>
        <pre className="mt-4 max-h-96 overflow-auto whitespace-pre-wrap rounded-lg border border-border bg-secondary/40 p-4 font-mono text-[11px] leading-relaxed text-muted-foreground">
          {MASTER_PROMPT}
        </pre>
      </section>
    </>
  );
}
