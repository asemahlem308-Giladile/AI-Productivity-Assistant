import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { PageHeader } from "@/components/PageHeader";
import { KpiCard } from "@/components/KpiCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { productionRecords, type ProductionRecord } from "@/lib/sample-data";

export const Route = createFileRoute("/_app/production")({
  head: () => ({
    meta: [
      { title: "Production Tracking | InduTech Solutions" },
      {
        name: "description",
        content:
          "Capture production runs and automatically calculate achievement, efficiency, defect rate, downtime and productivity.",
      },
      { property: "og:title", content: "Production Tracking | InduTech Solutions" },
      {
        property: "og:description",
        content: "Digital production capture with automatic Industrial Engineering calculations.",
      },
    ],
  }),
  component: Production,
});

const empty = {
  date: "2026-08-25",
  product: "",
  department: "Fabrication",
  target: "",
  actual: "",
  hours: "",
  downtime: "",
  defects: "",
  status: "Completed" as ProductionRecord["status"],
};

function metrics(r: ProductionRecord) {
  const achievement = (r.actual / r.target) * 100;
  const availableHours = r.hours;
  const efficiency = ((r.actual / r.target) * ((availableHours - r.downtime) / availableHours)) * 100;
  const defectRate = (r.defects / Math.max(r.actual, 1)) * 100;
  const downtimePct = (r.downtime / availableHours) * 100;
  const productivity = r.actual / Math.max(availableHours - r.downtime, 0.1);
  return { achievement, efficiency, defectRate, downtimePct, productivity };
}

function Production() {
  const [records, setRecords] = useState<ProductionRecord[]>(productionRecords);
  const [form, setForm] = useState(empty);

  const totals = useMemo(() => {
    const target = records.reduce((s, r) => s + r.target, 0);
    const actual = records.reduce((s, r) => s + r.actual, 0);
    const downtime = records.reduce((s, r) => s + r.downtime, 0);
    const hours = records.reduce((s, r) => s + r.hours, 0);
    const defects = records.reduce((s, r) => s + r.defects, 0);
    return {
      achievement: (actual / target) * 100,
      efficiency: (actual / target) * ((hours - downtime) / hours) * 100,
      defectRate: (defects / actual) * 100,
      downtimePct: (downtime / hours) * 100,
      productivity: actual / (hours - downtime),
    };
  }, [records]);

  const chartData = records.map((r) => ({
    run: r.id.replace("PR-", ""),
    target: r.target,
    actual: r.actual,
  }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const rec: ProductionRecord = {
      id: `PR-${1051 + records.length - productionRecords.length}`,
      date: form.date,
      product: form.product || "Unnamed product",
      department: form.department,
      target: Number(form.target) || 0,
      actual: Number(form.actual) || 0,
      hours: Number(form.hours) || 8,
      downtime: Number(form.downtime) || 0,
      defects: Number(form.defects) || 0,
      status: form.status,
    };
    if (!rec.target) return;
    setRecords((prev) => [...prev, rec]);
    setForm(empty);
  };

  return (
    <>
      <PageHeader
        eyebrow="Operations"
        title="Production Tracking"
        description="Replace paper production sheets with digital capture. Achievement, efficiency, defect rate, downtime and productivity are calculated automatically."
      />

      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <KpiCard label="Achievement" value={totals.achievement.toFixed(1)} unit="%" />
        <KpiCard label="Efficiency" value={totals.efficiency.toFixed(1)} unit="%" />
        <KpiCard label="Defect rate" value={totals.defectRate.toFixed(2)} unit="%" />
        <KpiCard label="Downtime" value={totals.downtimePct.toFixed(1)} unit="%" />
        <KpiCard label="Productivity" value={totals.productivity.toFixed(1)} unit="units/hr" />
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
        <form onSubmit={submit} className="rounded-xl border border-border bg-card p-5 shadow-panel">
          <h2 className="font-display text-base font-semibold">Capture production run</h2>
          <div className="mt-4 grid gap-3">
            {(
              [
                ["date", "Production date", "date"],
                ["product", "Product", "text"],
                ["department", "Department", "text"],
                ["target", "Target quantity", "number"],
                ["actual", "Actual quantity", "number"],
                ["hours", "Working hours", "number"],
                ["downtime", "Downtime (hrs)", "number"],
                ["defects", "Defects", "number"],
              ] as const
            ).map(([key, label, type]) => (
              <div key={key} className="grid gap-1.5">
                <Label htmlFor={key} className="text-xs text-muted-foreground">
                  {label}
                </Label>
                <Input
                  id={key}
                  type={type}
                  step="any"
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="bg-secondary/40"
                />
              </div>
            ))}
            <div className="grid gap-1.5">
              <Label htmlFor="status" className="text-xs text-muted-foreground">
                Production status
              </Label>
              <select
                id="status"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as ProductionRecord["status"] })}
                className="h-9 rounded-md border border-input bg-secondary/40 px-3 text-sm"
              >
                <option>Completed</option>
                <option>In Progress</option>
                <option>Delayed</option>
              </select>
            </div>
          </div>
          <Button type="submit" className="mt-4 w-full">
            Add production record
          </Button>
        </form>

        <div className="space-y-4">
          <section className="rounded-xl border border-border bg-card p-5 shadow-panel">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Target vs actual per run
            </h2>
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
                  <XAxis dataKey="run" stroke="var(--color-muted-foreground)" fontSize={11} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    cursor={{ fill: "var(--color-secondary)" }}
                  />
                  <Bar dataKey="target" fill="var(--color-chart-4)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="actual" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-5 shadow-panel">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Production register
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-xs">
                <thead className="text-muted-foreground">
                  <tr className="border-b border-border">
                    {["Run", "Date", "Product", "Dept", "Target", "Actual", "Achv %", "Eff %", "Defect %", "Status"].map(
                      (h) => (
                        <th key={h} className="pb-2 font-medium">
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {[...records].reverse().map((r) => {
                    const m = metrics(r);
                    return (
                      <tr key={r.id} className="border-b border-border/50">
                        <td className="py-2 font-mono text-[11px] text-muted-foreground">{r.id}</td>
                        <td className="py-2">{r.date}</td>
                        <td className="py-2">{r.product}</td>
                        <td className="py-2">{r.department}</td>
                        <td className="py-2 tabular-nums">{r.target}</td>
                        <td className="py-2 tabular-nums">{r.actual}</td>
                        <td className="py-2 tabular-nums">{m.achievement.toFixed(0)}%</td>
                        <td className="py-2 tabular-nums">{m.efficiency.toFixed(0)}%</td>
                        <td className="py-2 tabular-nums">{m.defectRate.toFixed(1)}%</td>
                        <td className="py-2">
                          <span
                            className={
                              r.status === "Completed"
                                ? "rounded-full bg-success/15 px-2 py-0.5 text-[10px] text-success"
                                : r.status === "Delayed"
                                  ? "rounded-full bg-destructive/15 px-2 py-0.5 text-[10px] text-destructive"
                                  : "rounded-full bg-warning/15 px-2 py-0.5 text-[10px] text-warning"
                            }
                          >
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
