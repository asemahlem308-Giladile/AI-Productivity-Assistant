import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Cpu,
  Database,
  FileSpreadsheet,
  Gauge,
  LineChart,
  ShieldCheck,
  Workflow,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { AiDisclaimer } from "@/components/AiDisclaimer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "InduTech Solutions | Digital Industrial Engineering Platform" },
      {
        name: "description",
        content:
          "InduTech Solutions helps businesses digitize, optimize and automate operations using Industrial Engineering, data analytics and AI.",
      },
      { property: "og:title", content: "InduTech Solutions | Digital Industrial Engineering" },
      {
        property: "og:description",
        content:
          "Engineering smarter operations through data, AI and technology — dashboards, production tracking, quality, automation and AI decision support.",
      },
    ],
  }),
  component: Landing,
});

const services = [
  {
    icon: FileSpreadsheet,
    title: "Digital Process Transformation",
    body: "Convert paper-based and manual processes into reliable digital workflows.",
  },
  {
    icon: Workflow,
    title: "Industrial Engineering",
    body: "Analyze processes, productivity, capacity, waste and operational performance.",
  },
  {
    icon: BarChart3,
    title: "Data & Business Intelligence",
    body: "Transform operational data into meaningful dashboards and insights.",
  },
  {
    icon: Bot,
    title: "AI Solutions",
    body: "Use artificial intelligence to analyze information and support decision-making.",
  },
  {
    icon: Cpu,
    title: "Process Automation",
    body: "Identify repetitive tasks and recommend digital automation solutions.",
  },
  {
    icon: LineChart,
    title: "Operational Improvement",
    body: "Find bottlenecks, waste, inefficiencies and continuous improvement opportunities.",
  },
];

const pillars = [
  { step: "01", title: "Digitize", body: "Replace paper forms and manual capture with digital workflows." },
  { step: "02", title: "Measure", body: "Track production, stock, quality, downtime and productivity." },
  { step: "03", title: "Analyze", body: "Dashboards that show what is really happening in the business." },
  { step: "04", title: "Improve", body: "Apply IE principles to remove waste and bottlenecks." },
  { step: "05", title: "Automate", body: "Cut repetitive admin work with the right technology." },
  { step: "06", title: "Decide", body: "AI-supported insight for faster, better decisions." },
];

const problems = [
  "Lost or inaccurate information",
  "Data-entry errors and duplicate work",
  "Slow reporting and poor visibility",
  "Production inefficiencies and excessive waste",
  "Poor inventory visibility and stock-outs",
  "Quality problems and unnecessary downtime",
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-md bg-primary-gradient font-display text-sm font-bold text-primary-foreground">
              iT
            </span>
            <div className="leading-tight">
              <p className="font-display text-sm font-semibold">InduTech Solutions</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                Digitize. Analyze. Optimize. Automate.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <a href="#services">Solutions</a>
            </Button>
            <Button asChild size="sm">
              <Link to="/dashboard">
                Open Platform <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-hero-gradient">
        <div className="absolute inset-0 bg-blueprint opacity-70" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
            Digital Industrial Engineering
          </span>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.05] sm:text-6xl">
            InduTech Solutions
          </h1>
          <p className="mt-4 max-w-2xl font-display text-lg text-primary-glow sm:text-2xl">
            Engineering Smarter Operations Through Data, AI &amp; Technology
          </p>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground">
            Helping businesses digitize, optimize and automate their operations using Industrial Engineering,
            data, artificial intelligence and modern technology.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="shadow-glow">
              <Link to="/dashboard">
                Start Improving Operations <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#services">Explore Solutions</a>
            </Button>
          </div>

          <dl className="mt-14 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              ["Efficiency tracked", "Real-time"],
              ["Modules", "12"],
              ["AI workplace tools", "5"],
              ["Paper forms", "Zero"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-border/60 bg-card/60 p-3">
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {label}
                </dt>
                <dd className="mt-1 font-display text-xl font-semibold text-primary">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">The business problem</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Many businesses still depend on manual processes, paper forms, spreadsheets, disconnected systems
              and repetitive administrative work. The cost shows up everywhere:
            </p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {problems.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-2 rounded-md border border-border bg-card p-3 text-sm"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-destructive" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">The InduTech method</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              One platform to capture data, understand performance, find waste, improve processes, automate
              tasks and decide faster.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {pillars.map((p) => (
                <div key={p.step} className="rounded-lg border border-border bg-card p-4 shadow-panel">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-primary">{p.step}</span>
                  <h3 className="mt-1 font-display text-base font-semibold">{p.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="border-y border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Our services</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Industrial Engineering methods combined with digital technology and AI.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <article
                key={s.title}
                className="group rounded-xl border border-border bg-card p-5 shadow-panel transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-glow"
              >
                <span className="grid size-10 place-items-center rounded-lg bg-primary/12 text-primary">
                  <s.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Built for operations teams</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { icon: Gauge, title: "Operations dashboard", body: "KPIs, trends, alerts and performance cards in a BI-style view.", to: "/dashboard" as const },
            { icon: ShieldCheck, title: "Quality & production", body: "Capture, calculate and analyse defects, downtime and output.", to: "/quality" as const },
            { icon: Database, title: "AI decision support", body: "Assistant, planner, research and meeting tools grounded in your data.", to: "/ai-assistant" as const },
          ].map((c) => (
            <Link
              key={c.title}
              to={c.to}
              className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/60"
            >
              <c.icon className="size-5 text-primary" />
              <h3 className="mt-3 font-display text-base font-semibold">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.body}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs text-primary">
                Open <ArrowRight className="size-3" />
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-8 max-w-3xl">
          <AiDisclaimer />
        </div>
      </section>

      <footer className="border-t border-border bg-card/40">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 text-xs text-muted-foreground sm:px-6 lg:px-8">
          <p className="font-display text-sm text-foreground">
            InduTech Solutions — Engineering Smarter Operations Through Data, AI &amp; Technology
          </p>
          <p>Digitize. Analyze. Optimize. Automate. © {new Date().getFullYear()} InduTech Solutions.</p>
        </div>
      </footer>
    </div>
  );
}
