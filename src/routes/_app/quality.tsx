import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { PageHeader } from "@/components/PageHeader";
import { KpiCard } from "@/components/KpiCard";
import { AiTool } from "@/components/AiTool";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { qualityRecords, type QualityRecord } from "@/lib/sample-data";

export const Route = createFileRoute("/_app/quality")({
  head: () => ({
    meta: [
      { title: "Quality Management | InduTech Solutions" },
      {
        name: "description",
        content:
          "Record defects, root causes and corrective actions, then analyse Pareto trends and recurring quality issues with AI support.",
      },
      { property: "og:title", content: "Quality Management | InduTech Solutions" },
      {
        property: "og:description",
        content: "Defect capture, Pareto analysis and AI-recommended corrective actions.",
      },
    ],
  }),
  component: Quality,
});

const empty = {
  date: "2026-08-25",
  product: "",
  defect: "",
  category: "Dimensional",
  department: "Machining",
  severity: "Major" as QualityRecord["severity"],
  rootCause: "",
  action: "",
  status: "Open" as QualityRecord["status"],
};

function Quality() {
  const [records, setRecords] = useState<QualityRecord[]>(qualityRecords);
  const [form, setForm] = useState(empty);

  const pareto = useMemo(() => {
    const map = new Map<string, number>();
    records.forEach((r) => map.set(r.category, (map.get(r.category) ?? 0) + 1));
    return [...map.entries()]
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);
  }, [records]);

  const open = records.filter((r) => r.status !== "Closed").length;
  const critical = records.filter((r) => r.severity === "Critical").length;

  const recurring = useMemo(() => {
    const map = new Map<string, number>();
    records.forEach((r) => map.set(`${r.product} — ${r.defect}`, (map.get(`${r.product} — ${r.defect}`) ?? 0) + 1));
    return [...map.entries()].filter(([, n]) => n > 1);
  }, [records]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.product || !form.defect) return;
    setRecords((prev) => [...prev, { id: `QC-${307 + prev.length - qualityRecords.length}`, ...form }]);
    setForm(empty);
  };

  return (
    <>
      <PageHeader
        eyebrow="Operations"
        title="Quality Management"
        description="Capture defects with root cause and corrective action, then use Pareto analysis and AI to focus on the vital few problems."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Recorded defects" value={records.length} />
        <KpiCard label="Open issues" value={open} delta={open} goodDirection="down" />
        <KpiCard label="Critical severity" value={critical} goodDirection="down" />
        <KpiCard label="Recurring issues" value={recurring.length} goodDirection="down" />
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
        <form onSubmit={submit} className="rounded-xl border border-border bg-card p-5 shadow-panel">
          <h2 className="font-display text-base font-semibold">Record quality issue</h2>
          <div className="mt-3 grid gap-2.5">
            {(
              [
                ["date", "Date", "date"],
                ["product", "Product", "text"],
                ["defect", "Defect", "text"],
                ["category", "Defect category", "text"],
                ["department", "Department", "text"],
                ["rootCause", "Root cause", "text"],
                ["action", "Corrective action", "text"],
              ] as const
            ).map(([key, label, type]) => (
              <div key={key} className="grid gap-1">
                <Label className="text-xs text-muted-foreground">{label}</Label>
                <Input
                  type={type}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="bg-secondary/40"
                />
              </div>
            ))}
            <div className="grid grid-cols-2 gap-2">
              <div className="grid gap-1">
                <Label className="text-xs text-muted-foreground">Severity</Label>
                <select
                  value={form.severity}
                  onChange={(e) => setForm({ ...form, severity: e.target.value as QualityRecord["severity"] })}
                  className="h-9 rounded-md border border-input bg-secondary/40 px-2 text-sm"
                >
                  <option>Critical</option>
                  <option>Major</option>
                  <option>Minor</option>
                </select>
              </div>
              <div className="grid gap-1">
                <Label className="text-xs text-muted-foreground">Status</Label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as QualityRecord["status"] })}
                  className="h-9 rounded-md border border-input bg-secondary/40 px-2 text-sm"
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Closed</option>
                </select>
              </div>
            </div>
            <Button type="submit" className="mt-1">
              Add quality record
            </Button>
          </div>
        </form>

        <div className="space-y-4">
          <section className="rounded-xl border border-border bg-card p-5 shadow-panel">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Pareto analysis — defects by category
            </h2>
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pareto}>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
                  <XAxis dataKey="category" stroke="var(--color-muted-foreground)" fontSize={11} />
                  <YAxis allowDecimals={false} stroke="var(--color-muted-foreground)" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    cursor={{ fill: "var(--color-secondary)" }}
                  />
                  <Bar dataKey="count" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {recurring.length > 0 && (
              <div className="mt-3 rounded-md border border-warning/40 bg-warning/10 p-3 text-xs">
                <p className="font-mono uppercase tracking-widest text-warning">Recurring issues</p>
                <ul className="mt-1 space-y-0.5 text-muted-foreground">
                  {recurring.map(([label, n]) => (
                    <li key={label}>
                      {label} — {n} occurrences
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          <section className="rounded-xl border border-border bg-card p-5 shadow-panel">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Quality register
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-xs">
                <thead className="text-muted-foreground">
                  <tr className="border-b border-border">
                    {["ID", "Date", "Product", "Defect", "Severity", "Root cause", "Action", "Status"].map((h) => (
                      <th key={h} className="pb-2 font-medium">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...records].reverse().map((r) => (
                    <tr key={r.id} className="border-b border-border/50">
                      <td className="py-2 font-mono text-[11px] text-muted-foreground">{r.id}</td>
                      <td className="py-2">{r.date}</td>
                      <td className="py-2">{r.product}</td>
                      <td className="py-2">{r.defect}</td>
                      <td className="py-2">
                        <span
                          className={
                            r.severity === "Critical"
                              ? "rounded-full bg-destructive/15 px-2 py-0.5 text-[10px] text-destructive"
                              : r.severity === "Major"
                                ? "rounded-full bg-warning/15 px-2 py-0.5 text-[10px] text-warning"
                                : "rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground"
                          }
                        >
                          {r.severity}
                        </span>
                      </td>
                      <td className="py-2 text-muted-foreground">{r.rootCause}</td>
                      <td className="py-2 text-muted-foreground">{r.action}</td>
                      <td className="py-2">{r.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>

      <AiTool
        mode="quality"
        title="AI quality analysis"
        description="InduTech AI reviews the recorded defects, identifies recurring problems and recommends corrective actions."
        placeholder="e.g. What is driving our defect rate and which corrective action should we implement first?"
        examples={[
          "What is driving our high defect rate?",
          "Which recurring defect should we fix first?",
          "What corrective actions do you recommend for Machine 3?",
        ]}
        context={JSON.stringify({ records, pareto }, null, 1)}
      />
    </>
  );
}
