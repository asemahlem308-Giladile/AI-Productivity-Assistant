import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/PageHeader";
import { AiTool } from "@/components/AiTool";

export const Route = createFileRoute("/_app/meeting-summarizer")({
  head: () => ({
    meta: [
      { title: "Operations Meeting Summarizer | InduTech Solutions" },
      {
        name: "description",
        content:
          "Paste operations meeting notes and get a summary, key points, decisions and an action table with owners, deadlines and priorities.",
      },
      { property: "og:title", content: "Operations Meeting Summarizer | InduTech Solutions" },
      {
        property: "og:description",
        content: "Turn messy meeting notes into decisions and accountable action items.",
      },
    ],
  }),
  component: MeetingSummarizer,
});

function MeetingSummarizer() {
  return (
    <>
      <PageHeader
        eyebrow="AI Workplace Tool"
        title="Operations Meeting Summarizer"
        description="Paste your meeting notes. InduTech AI extracts the summary, key points, decisions and an action table with responsible person, deadline and priority — using only what is in the notes."
      />
      <AiTool
        mode="meeting"
        title="Meeting notes"
        description="Paste raw notes, bullet points or a transcript."
        placeholder={
          "e.g. Production meeting 24 Aug. Machine 3 downtime up again, maintenance to investigate by Friday. Quality manager to review valve housing defects by Thursday. IE to update production dashboard next Monday. Agreed to trial digital production sheets in Fabrication."
        }
        cta="Summarize meeting"
      />
    </>
  );
}
