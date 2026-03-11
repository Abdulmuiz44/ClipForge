"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { createVideoJobAction } from "@/lib/actions/jobs";

const initialState = { error: "", success: "" };

const promptExamples = [
  {
    label: "Product promo",
    value: "Product reveal shot of a wireless headset on a black reflective table, cinematic lighting, smooth camera orbit",
  },
  {
    label: "Social ad",
    value: "Energetic social ad scene of a coffee brand launch, warm morning light, fast motion graphics feel",
  },
  {
    label: "Story scene",
    value: "Storytelling scene of a founder walking into a neon-lit studio at night, dramatic atmosphere, slow push-in",
  },
];

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <motion.button
      type="submit"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      disabled={pending}
      className="button-primary w-full md:w-auto disabled:opacity-60"
    >
      {pending ? "Generating clip..." : "Generate video clip"}
    </motion.button>
  );
}

export function JobForm() {
  const [state, formAction] = useFormState(createVideoJobAction, initialState);
  const [prompt, setPrompt] = useState("");

  return (
    <form action={formAction} className="grid gap-6">
      <div className="space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-foreground">Prompt</span>
          <textarea
            required
            minLength={10}
            name="prompt"
            rows={4}
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            className="input-dark resize-none"
            placeholder="Describe what should happen in this 10 to 30 second clip. Include subject, setting, style, and motion."
          />
          <p className="mt-2 text-xs text-muted-foreground">Tip: Specific camera motion + lighting details usually produce stronger results.</p>
        </label>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Quick prompt starters</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {promptExamples.map((example) => (
              <button
                key={example.label}
                type="button"
                onClick={() => setPrompt(example.value)}
                className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs text-secondary-foreground transition hover:border-primary/40"
              >
                {example.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-foreground">Clip length</span>
            <select name="durationSeconds" className="input-dark" defaultValue="10">
              <option value="10">10 seconds (fast hook)</option>
              <option value="15">15 seconds (social standard)</option>
              <option value="20">20 seconds (product spot)</option>
              <option value="25">25 seconds (story beat)</option>
              <option value="30">30 seconds (full short scene)</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-foreground">Aspect ratio</span>
            <select name="aspectRatio" className="input-dark" defaultValue="16:9">
              <option value="16:9">16:9 landscape (ads, web, YouTube)</option>
              <option value="9:16">9:16 vertical (Reels, Shorts, TikTok)</option>
              <option value="1:1">1:1 square (feed posts)</option>
            </select>
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-foreground">Visual style</span>
          <select name="style" className="input-dark" defaultValue="cinematic">
            <option value="cinematic">Cinematic</option>
            <option value="product">Product</option>
            <option value="anime">Anime</option>
            <option value="surreal">Surreal</option>
          </select>
        </label>
      </div>

      <div className="rounded-xl border border-border bg-muted/30 p-4">
        <p className="text-sm font-bold text-foreground">Generation notes</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Free demo clips are watermarked. Paid clips reserve credits at queue time and automatically refund on failures.
        </p>
      </div>

      <div className="flex flex-col gap-4 border-t pt-6">
        <div>
          {state.error ? <p className="text-sm font-medium text-destructive">{state.error}</p> : null}
          {state.success ? <p className="text-sm font-medium text-primary">{state.success}</p> : null}
        </div>
        <SubmitButton />
      </div>
    </form>
  );
}
