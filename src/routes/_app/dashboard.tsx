import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { KpiCard } from "@/components/KpiCard";
import { PageHeader } from "@/components/PageHeader";
import { AiDisclaimer } from "@/components/AiDisclaimer";
import {
  alerts,
  defectPareto,
  downtimeReasons,
  efficiencyTrend,
  kpis,
  outputByDepartment,
  productionRecords,
} from "@/lib/sample-data";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [
      { title: "Operations Dashboard | InduTech Solutions" },
      {
        name: "description",
        content:
          "Business-intelligence dashboard for production efficiency, quality, downtime, inventory and improvement opportunities.",
      },
      { property: "og:title", content: "Operations Dashboard | InduTech Solutions" },
      {
        property: "og:description",
        content: "Live KPI cards, trends and alerts for data-driven operational decisions.",
      },
    ],
  }),
  component: Dashboard,
});

const chartColors = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

const tooltipStyle = {
  background: "var(--color-card)",
  border: "1px solid var(--color-border)",
  borderRadius: 8,
  fontSize: 12,
  color: "var(--color-foreground)",
};

function Dashboard() {
  return (
    <>
      <PageHeader
        eyebrow="Business Intelligence"
        title="Operations Dashboard"
        description="Kwazi Manufacturing (demo client) — production efficiency has declined from 91% to 78% over six weeks. Investigate output, downtime, quality and inventory in one view."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <KpiCard label="Production Efficiency" value={kpis.efficiency} unit="%" delta={-13} goodDirection="up" hint="vs W29" />
        <KpiCard label="Production Target" value={kpis.target.toLocaleString()} unit="units" hint="6-week plan" />
        <KpiCard label="Actual Production" value={kpis.actual.toLocaleString()} unit="units" delta={-920} goodDirection="up" hint="behind plan" />
        <KpiCard label="Quality Rate" value={kpis.qualityRate} unit="%" delta={-3.3} goodDirection="up" hint="vs W29" />
        <KpiCard label="Defect Rate" value={kpis.defectRate} unit="%" delta={3.3} goodDirection="down" hint="rising" />
        <KpiCard label="Inventory Health" value={kpis.inventoryHealth} unit="%" delta={-6} goodDirection="up" hint="2 items low" />
        <KpiCard label="Downtime" value={kpis.downtimeHours} unit="hrs" delta={7.4} goodDirection="down" hint="Machine 3 driven" />
        <KpiCard label="Productivity" value={kpis.productivity} unit="units/hr" delta={-6.1} goodDirection="up" />
        <KpiCard label="Open Issues" value={kpis.openIssues} delta={2} goodDirection="down" hint="quality" />
        <KpiCard label="Improvement Opportunities" value={kpis.improvementOpportunities} hint="identified" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="rounded-xl border border-border bg-card p-5 shadow-panel lg:col-span-2">
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Efficiency, quality &amp; downtime trend
          </h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={efficiencyTrend}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
                <XAxis dataKey="week" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="efficiency" name="Efficiency %" stroke="var(--color-chart-1)" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="quality" name="Quality rate %" stroke="var(--color-chart-3)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="downtime" name="Downtime hrs" stroke="var(--color-chart-5)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-5 shadow-panel">
          <h2 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            <AlertTriangle className="size-4 text-warning" /> Alerts
          </h2>
          <ul className="mt-4 space-y-3">
            {alerts.map((a) => (
              <li key={a.title + a.message} className="rounded-lg border border-border bg-secondary/40 p-3">
                <div className="flex items-center gap-2">
                  <span
                    className={
                      a.level === "High"
                        ? "rounded-full bg-destructive/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-destructive"
                        : a.level === "Medium"
                          ? "rounded-full bg-warning/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-warning"
                          : "rounded-full bg-muted px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                    }
                  >
                    {a.title}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">{a.message}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="rounded-xl border border-border bg-card p-5 shadow-panel lg:col-span-2">
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Target vs actual output by department
          </h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={outputByDepartment}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
                <XAxis dataKey="department" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-secondary)" }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="target" name="Target" fill="var(--color-chart-4)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" name="Actual" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-5 shadow-panel">
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Downtime by reason
          </h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={downtimeReasons} dataKey="hours" nameKey="reason" innerRadius={48} outerRadius={82} paddingAngle={3}>
                  {downtimeReasons.map((_, i) => (
                    <Cell key={i} fill={chartColors[i % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 10 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-border bg-card p-5 shadow-panel">
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Defect Pareto (by category)
          </h2>
          <div className="mt-4 h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={defectPareto} layout="vertical">
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
                <XAxis type="number" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis type="category" dataKey="category" width={90} stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-secondary)" }} />
                <Bar dataKey="count" name="Defects" fill="var(--color-chart-2)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-5 shadow-panel">
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Latest production runs
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="pb-2 font-medium">Run</th>
                  <th className="pb-2 font-medium">Product</th>
                  <th className="pb-2 text-right font-medium">Target</th>
                  <th className="pb-2 text-right font-medium">Actual</th>
                  <th className="pb-2 text-right font-medium">Achv.</th>
                </tr>
              </thead>
              <tbody>
                {productionRecords.slice(-6).reverse().map((r) => (
                  <tr key={r.id} className="border-b border-border/50">
                    <td className="py-2 font-mono text-[11px] text-muted-foreground">{r.id}</td>
                    <td className="py-2">{r.product}</td>
                    <td className="py-2 text-right tabular-nums">{r.target}</td>
                    <td className="py-2 text-right tabular-nums">{r.actual}</td>
                    <td
                      className={
                        r.actual / r.target >= 0.95
                          ? "py-2 text-right tabular-nums text-success"
                          : r.actual / r.target >= 0.85
                            ? "py-2 text-right tabular-nums text-warning"
                            : "py-2 text-right tabular-nums text-destructive"
                      }
                    >
                      {Math.round((r.actual / r.target) * 100)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <AiDisclaimer />
    </>
  );
}
