import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { PageHeader } from "@/components/PageHeader";
import { AiTool } from "@/components/AiTool";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/_app/email-assistant")({
  head: () => ({
    meta: [
      { title: "Business Email Assistant | InduTech Solutions" },
      {
        name: "description",
        content:
          "Generate professional business emails for clients, managers, employees, suppliers and production teams with the right tone and purpose.",
      },
      { property: "og:title", content: "Business Email Assistant | InduTech Solutions" },
      {
        property: "og:description",
        content: "AI business communication assistant for operations teams.",
      },
    ],
  }),
  component: EmailAssistant,
});

const audiences = ["Client", "Manager", "Employee", "Supplier", "Production Team", "Business Partner"];
const tones = ["Formal", "Professional", "Persuasive", "Friendly"];
const purposes = ["Request", "Update", "Follow-up", "Complaint", "Proposal", "Meeting"];

function EmailAssistant() {
  const [audience, setAudience] = useState(audiences[1]);
  const [tone, setTone] = useState(tones[1]);
  const [purpose, setPurpose] = useState(purposes[1]);

  return (
    <>
      <PageHeader
        eyebrow="AI Workplace Tool"
        title="Business Communication Assistant"
        description="Draft professional operational emails in seconds — choose the audience, tone and purpose, then describe what needs to be communicated."
      />
      <AiTool
        mode="email"
        title="Email brief"
        description="Describe the message, the key facts and any dates or names that must be included."
        placeholder="e.g. Inform the supplier that Raw Material A delivery is late and request a confirmed delivery date by Thursday."
        cta="Generate email"
        buildInput={(raw) =>
          `Audience: ${audience}\nTone: ${tone}\nPurpose: ${purpose}\n\nMessage brief: ${raw}`
        }
        extra={
          <div className="grid gap-3 sm:grid-cols-3">
            {(
              [
                ["Audience", audience, setAudience, audiences],
                ["Tone", tone, setTone, tones],
                ["Purpose", purpose, setPurpose, purposes],
              ] as const
            ).map(([label, value, setter, options]) => (
              <div key={label} className="grid gap-1">
                <Label className="text-xs text-muted-foreground">{label}</Label>
                <select
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  className="h-9 rounded-md border border-input bg-secondary/40 px-2 text-sm"
                >
                  {options.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        }
      />
    </>
  );
}
