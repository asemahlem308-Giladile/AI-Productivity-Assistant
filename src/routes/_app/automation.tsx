import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/PageHeader";
import { AiTool } from "@/components/AiTool";

export const Route = createFileRoute("/_app/automation")({
  head: () => ({
    meta: [
      { title: "Automation Opportunity Finder | InduTech Solutions" },
      {
        name: "description",
        content:
          "Enter a repetitive business process and get automation opportunities plus recommended technologies such as Power Automate, Power BI, digital forms and APIs.",
      },
      { property: "og:title", content: "Automation Opportunity Finder | InduTech Solutions" },
      {
        property: "og:description",
        content: "AI-powered analysis of repetitive admin work and how to automate it.",
      },
    ],
  }),
  component: Automation,
});

function Automation() {
  return (
    <>
      <PageHeader
        eyebrow="Digital Transformation"
        title="Automation Opportunity Finder"
        description="Identify repetitive activities, duplicate work and manual data entry, then get technology recommendations explained in plain business language."
      />
      <AiTool
        mode="automation"
        title="Describe the repetitive process"
        description="Explain the routine task exactly as it happens today, including frequency and tools used."
        placeholder="e.g. Every morning an employee downloads production data from Excel, copies it into another spreadsheet, calculates totals and emails a report to the manager."
        examples={[
          "Every morning an employee copies production data between spreadsheets and emails a report.",
          "Purchase requests are captured on paper, retyped into Excel and emailed for approval.",
          "Weekly downtime totals are calculated by hand from shift sheets.",
        ]}
        cta="Find automation opportunities"
      />
    </>
  );
}
