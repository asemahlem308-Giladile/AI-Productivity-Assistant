import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/PageHeader";
import { AiTool } from "@/components/AiTool";

export const Route = createFileRoute("/_app/ai-task-planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner | InduTech Solutions" },
      {
        name: "description",
        content:
          "Turn a list of operational tasks into a prioritised daily or weekly plan with estimated times, delegation and automation suggestions.",
      },
      { property: "og:title", content: "AI Task Planner | InduTech Solutions" },
      {
        property: "og:description",
        content: "Industrial operations task planning with urgency, importance and time optimisation.",
      },
    ],
  }),
  component: TaskPlanner,
});

function TaskPlanner() {
  return (
    <>
      <PageHeader
        eyebrow="AI Workplace Tool"
        title="Industrial Operations Task Planner"
        description="Enter your tasks for the day or week. InduTech AI assesses urgency and importance, prioritises the work, estimates time and flags what can be delegated or automated."
      />
      <AiTool
        mode="planner"
        title="Your tasks"
        description="List everything you need to do — one per line or in a sentence."
        placeholder="e.g. Investigate machine downtime, review quality defects, update the production dashboard, meet with the production supervisor and complete the weekly report."
        examples={[
          "Investigate machine downtime, review quality defects, update the production dashboard, meet the supervisor and complete the weekly report.",
          "Plan next week's production schedule, close 3 open quality issues, run a stock count, train two operators.",
        ]}
        cta="Build my plan"
      />
    </>
  );
}
