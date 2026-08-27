import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/PageHeader";
import { AiTool } from "@/components/AiTool";

export const Route = createFileRoute("/_app/research-assistant")({
  head: () => ({
    meta: [
      { title: "Industrial Engineering Research Assistant | InduTech Solutions" },
      {
        name: "description",
        content:
          "Explain Lean, Six Sigma, bottleneck analysis, capacity planning and digital transformation topics with practical business application.",
      },
      { property: "og:title", content: "IE Research Assistant | InduTech Solutions" },
      {
        property: "og:description",
        content: "Plain-language Industrial Engineering research with actions and expected benefits.",
      },
    ],
  }),
  component: ResearchAssistant,
});

const topics = [
  "Lean Manufacturing",
  "Six Sigma",
  "Process Optimization",
  "Industrial Automation",
  "Digital Transformation",
  "Supply Chain Optimization",
  "Waste Reduction",
  "Bottleneck Analysis",
  "Capacity Planning",
  "Quality Management",
];

function ResearchAssistant() {
  return (
    <>
      <PageHeader
        eyebrow="AI Workplace Tool"
        title="Industrial Engineering Research Assistant"
        description="Research improvement methods in simple language, with key insights, business application, recommended actions and the limitations you should verify."
      />
      <AiTool
        mode="research"
        title="Research topic"
        description="Enter an Industrial Engineering or business improvement topic, or a specific question about it."
        placeholder="e.g. Lean Manufacturing — how do we apply it in a small fabrication workshop?"
        examples={topics}
        cta="Research topic"
      />
    </>
  );
}
