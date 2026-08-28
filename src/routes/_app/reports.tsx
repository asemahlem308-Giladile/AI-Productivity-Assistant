import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { KpiCard } from "@/components/KpiCard";
import { AiTool } from "@/components/AiTool";
import {
  defectPareto,
  downtimeReasons,
  efficiencyTrend,
  inventoryItems,
  kpis,
  operationsContext,
  outputByDepartment,
} from "@/lib/sample-data";

export const Route = createFileRoute("/_app/reports")({
  head: () => ({
    meta: [
      { title: "Operational Reports | InduTech Solutions" },
      {
        name: "description",
        content:
          "Weekly operational performance reporting across production, quality, downtime and inventory with an AI-generated management summary.",
      },
      { property: "og:title", content: "Operational Reports | InduTech Solutions" },
      {
        property: "og:description",
        content: "Management reporting pack with AI executive summary and recommended priorities.",
      },
    ],
  }),
  component: Reports,
});

function Reports() {
  const lowStock = inventoryItems.filter((i) => i.stock < i.minimum);

  return (
    <>
      <PageHeader
        eyebrow="Business Intelligence"
        title="Operational Reports"
        description="Weekly performance pack for management — output, efficiency, quality, downtime and inventory, plus an AI executive summary."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Efficiency (W34)" value={kpis.efficiency} unit="%" delta={-3} goodDirection="up" />
        <KpiCard label="Output vs plan" value={`${Math.round((kpis.actual / kpis.target) * 100)}`} unit="%" />
        <KpiCard label="Quality rate" value={kpis.qualityRate} unit="%" delta={-0.7} goodDirection="up" />
        <KpiCard label="Downtime" value={kpis.downtimeHours} unit="hrs" delta={1.8} goodDirection="down" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-border bg-card p-5 shadow-panel">
          <h2 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            <FileBarChart className="size-4 text-primary" /> Weekly performance
          </h2>
          <table className="mt-4 w-full text-left text-xs">
            <thead className="text-muted-foreground">
              <tr className="border-b border-border">
                <th className="pb-2 font-medium">Week</th>
                <th className="pb-2 text-right font-medium">Efficiency %</th>
                <th className="pb-2 text-right font-medium">Quality %</th>
                <th className="pb-2 text-right font-medium">Downtime hrs</th>
              </tr>
            </thead>
            <tbody>
              {efficiencyTrend.map((w) => (
                <tr key={w.week} className="border-b border-border/50">
                  <td className="py-2">{w.week}</td>
                  <td className="py-2 text-right tabular-nums">{w.efficiency}</td>
                  <td className="py-2 text-right tabular-nums">{w.quality}</td>
                  <td className="py-2 text-right tabular-nums">{w.downtime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="rounded-xl border border-border bg-card p-5 shadow-panel">
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Department output &amp; key exceptions
          </h2>
          <table className="mt-4 w-full text-left text-xs">
            <thead className="text-muted-foreground">
              <tr className="border-b border-border">
                <th className="pb-2 font-medium">Department</th>
                <th className="pb-2 text-right font-medium">Target</th>
                <th className="pb-2 text-right font-medium">Actual</th>
                <th className="pb-2 text-right font-medium">Achv.</th>
              </tr>
            </thead>
            <tbody>
              {outputByDepartment.map((d) => (
                <tr key={d.department} className="border-b border-border/50">
                  <td className="py-2">{d.department}</td>
                  <td className="py-2 text-right tabular-nums">{d.target}</td>
                  <td className="py-2 text-right tabular-nums">{d.actual}</td>
                  <td className="py-2 text-right tabular-nums">
                    {Math.round((d.actual / d.target) * 100)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
            <p>
              <span className="text-foreground">Top downtime driver:</span> {downtimeReasons[0].reason} (
              {downtimeReasons[0].hours} hrs)
            </p>
            <p>
              <span className="text-foreground">Top defect category:</span> {defectPareto[0].category} (
              {defectPareto[0].count})
            </p>
            <p>
              <span className="text-foreground">Low stock items:</span>{" "}
              {lowStock.map((i) => i.name).join(", ")}
            </p>
          </div>
        </section>
      </div>

      <AiTool
        mode="assistant"
        title="AI management summary"
        description="Generate an executive summary of the reporting period from the operational dataset."
        placeholder="e.g. Write a management summary of this week's operational performance and the top three priorities."
        examples={[
          "Write a management summary of this week's performance.",
          "What are the top three operational priorities for next week?",
          "Summarise the risks management should escalate.",
        ]}
        context={operationsContext()}
        cta="Generate report summary"
      />
    </>
  );
}
