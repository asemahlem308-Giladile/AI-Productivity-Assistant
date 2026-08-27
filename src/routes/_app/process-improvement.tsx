import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/PageHeader";
import { AiTool } from "@/components/AiTool";

export const Route = createFileRoute("/_app/process-improvement")({
  head: () => ({
    meta: [
      { title: "Process Improvement Analyzer | InduTech Solutions" },
      {
        name: "description",
        content:
          "Describe an existing business process and get an Industrial Engineering analysis of waste, bottlenecks, digital solutions and expected benefits.",
      },
      { property: "og:title", content: "Process Improvement Analyzer | InduTech Solutions" },
      {
        property: "og:description",
        content: "AI-supported waste, bottleneck and digital workflow analysis for any business process.",
      },
    ],
  }),
  component: ProcessImprovement,
});

function ProcessImprovement() {
  return (
    <>
      <PageHeader
        eyebrow="Industrial Engineering"
        title="Process Improvement Analyzer"
        description="Describe how the work is done today. InduTech AI maps the current process, identifies waste and bottlenecks, and recommends a digital workflow with expected benefits."
      />
      <AiTool
        mode="process"
        title="Describe the current process"
        description="Include who does what, in what order, using which tools, and how long it takes."
        placeholder="e.g. Employees complete paper production sheets and supervisors manually capture the information into Excel every afternoon."
        examples={[
          "Employees complete paper production sheets and supervisors capture them into Excel every afternoon.",
          "Stock is counted weekly on a clipboard and typed into a spreadsheet the next day.",
          "Quality inspectors write defects in a notebook and email a summary on Fridays.",
        ]}
        cta="Analyse process"
      />
    </>
  );
}
