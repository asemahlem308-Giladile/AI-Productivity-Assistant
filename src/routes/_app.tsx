import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  Boxes,
  Bot,
  BrainCircuit,
  CalendarCheck,
  ClipboardList,
  Cpu,
  FileBarChart,
  Gauge,
  Home,
  Library,
  Settings,
  ShieldCheck,
  Workflow,
  Menu,
} from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

const groups = [
  {
    label: "Operations",
    items: [
      { to: "/dashboard", label: "Dashboard", icon: Gauge },
      { to: "/production", label: "Production", icon: Activity },
      { to: "/inventory", label: "Inventory", icon: Boxes },
      { to: "/quality", label: "Quality", icon: ShieldCheck },
    ],
  },
  {
    label: "Industrial Engineering",
    items: [
      { to: "/process-improvement", label: "Process Improvement", icon: Workflow },
      { to: "/automation", label: "Automation", icon: Cpu },
    ],
  },
  {
    label: "AI Workplace Tools",
    items: [
      { to: "/ai-task-planner", label: "AI Task Planner", icon: ClipboardList },
      { to: "/meeting-summarizer", label: "Meeting Summarizer", icon: CalendarCheck },
      { to: "/research-assistant", label: "Research Assistant", icon: Library },
      { to: "/ai-assistant", label: "AI Operations Assistant", icon: Bot },
      { to: "/email-assistant", label: "Email Assistant", icon: BrainCircuit },
    ],
  },
  {
    label: "Business",
    items: [
      { to: "/reports", label: "Reports", icon: FileBarChart },
      { to: "/settings", label: "Settings", icon: Settings },
    ],
  },
] as const;

function AppLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[264px_minmax(0,1fr)]">
      <aside
        className={cn(
          "z-40 border-r border-sidebar-border bg-sidebar lg:sticky lg:top-0 lg:block lg:h-screen lg:overflow-y-auto",
          open ? "block" : "hidden",
        )}
      >
        <div className="flex items-center gap-2 border-b border-sidebar-border px-5 py-4">
          <span className="grid size-8 place-items-center rounded-md bg-primary-gradient font-display text-sm font-bold text-primary-foreground">
            iT
          </span>
          <div className="leading-tight">
            <p className="font-display text-sm font-semibold text-sidebar-foreground">InduTech Solutions</p>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
              Digital Industrial Engineering
            </p>
          </div>
        </div>

        <nav className="space-y-5 px-3 py-4">
          <Link
            to="/"
            className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
            onClick={() => setOpen(false)}
          >
            <Home className="size-4" /> Home
          </Link>

          {groups.map((group) => (
            <div key={group.label}>
              <p className="px-3 pb-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                {group.label}
              </p>
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
                    activeProps={{
                      className:
                        "bg-sidebar-accent text-sidebar-foreground border-l-2 border-primary font-medium",
                    }}
                  >
                    <item.icon className="size-4" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      <div className="flex min-h-screen flex-col">
        <div className="flex items-center justify-between border-b border-border bg-card/60 px-4 py-3 lg:hidden">
          <span className="font-display text-sm font-semibold">InduTech Solutions</span>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-md border border-border p-2 text-muted-foreground"
            aria-label="Toggle navigation"
          >
            <Menu className="size-4" />
          </button>
        </div>

        <main className="mx-auto w-full max-w-7xl flex-1 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>

        <footer className="border-t border-border px-6 py-4 text-xs text-muted-foreground">
          InduTech AI provides data-driven insights and recommendations to support operational
          decision-making. AI-generated recommendations should be reviewed and validated by qualified
          professionals before implementation.
        </footer>
      </div>
    </div>
  );
}
