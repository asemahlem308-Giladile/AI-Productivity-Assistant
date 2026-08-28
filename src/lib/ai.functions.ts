import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { MASTER_PROMPT, MODE_PROMPTS } from "./ai-prompts";

const Input = z.object({
  mode: z.string(),
  input: z.string().min(1),
  context: z.string().optional(),
});

export const askInduTechAI = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => Input.parse(data))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("AI is not configured for this workspace.");

    const modeInstruction = MODE_PROMPTS[data.mode] ?? MODE_PROMPTS.assistant;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": key,
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: "google/gemini-3.7-flash",
        messages: [
          { role: "system", content: `${MASTER_PROMPT}\n\nTASK MODE INSTRUCTIONS:\n${modeInstruction}` },
          ...(data.context
            ? [{ role: "system", content: `OPERATIONAL DATA (the only factual data you may rely on):\n${data.context}` }]
            : []),
          { role: "user", content: data.input },
        ],
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      if (res.status === 429) throw new Error("AI is busy right now (rate limit). Please try again shortly.");
      if (res.status === 402) throw new Error("AI credits are exhausted for this workspace. Please add credits to continue.");
      throw new Error(`AI request failed (${res.status}): ${body.slice(0, 300)}`);
    }

    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const text = json.choices?.[0]?.message?.content?.trim();
    if (!text) throw new Error("The AI returned an empty response. Please try rephrasing your request.");
    return { text };
  });
