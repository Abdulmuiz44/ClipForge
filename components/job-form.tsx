"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
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

function ProgressFeedback() {
  const { pending } = useFormStatus();

  return (
    <p className="text-xs text-muted-foreground" aria-live="polite">
      {pending ? "Submitting... your clip will move to queued/processing shortly." : "Press Enter to send. Use Shift+Enter for a new line."}
    </p>
  );
}

function SendButton() {
  const { pending } = useFormStatus();

  return (
    <motion.button
      type="submit"
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      disabled={pending}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      aria-label={pending ? "Submitting" : "Send prompt"}
      title={pending ? "Submitting" : "Send prompt"}
    >
      {pending ? "…" : "➤"}
    </motion.button>
  );
}

export function JobForm() {
  const [state, formAction] = useFormState(createVideoJobAction, initialState);
  const [prompt, setPrompt] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-foreground">Describe the video you want to generate</span>
        <textarea
          required
          minLength={10}
          name="prompt"
          rows={12}
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              formRef.current?.requestSubmit();
            }
          }}
          className="input-dark min-h-[360px] resize-y text-base leading-7"
          placeholder="Describe the clip you want to generate. Include subject, setting, style, and motion..."
        />
      </label>

      <div className="flex flex-wrap gap-2">
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

      <details className="rounded-xl border border-border/70 bg-muted/20 p-3">
        <summary className="cursor-pointer text-sm font-medium text-foreground">Advanced options</summary>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Duration</span>
            <select name="durationSeconds" className="input-dark" defaultValue="10">
              <option value="10">10 sec</option>
              <option value="15">15 sec</option>
              <option value="20">20 sec</option>
              <option value="25">25 sec</option>
              <option value="30">30 sec</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Aspect</span>
            <select name="aspectRatio" className="input-dark" defaultValue="16:9">
              <option value="16:9">16:9</option>
              <option value="9:16">9:16</option>
              <option value="1:1">1:1</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Style</span>
            <select name="style" className="input-dark" defaultValue="cinematic">
              <option value="cinematic">Cinematic</option>
              <option value="product">Product</option>
              <option value="anime">Anime</option>
              <option value="surreal">Surreal</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Output size</span>
            <select name="renderSize" className="input-dark" defaultValue="standard">
              <option value="standard">Standard</option>
              <option value="high">High quality</option>
            </select>
          </label>
        </div>
      </details>

      <div className="flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-muted/20 px-3 py-2">
        <div className="flex items-center gap-2">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-border/70 px-2 py-1 text-xs text-muted-foreground hover:border-primary/50">
            <input type="file" className="hidden" disabled />
            Upload
          </label>
          <button type="button" className="rounded-md border border-border/70 px-2 py-1 text-xs text-muted-foreground hover:border-primary/50">
            Options
          </button>
        </div>
        <SendButton />
      </div>

      <ProgressFeedback />

      {state.error ? <p className="text-sm font-medium text-destructive">{state.error}</p> : null}
      {state.success ? (
        <p className="text-sm font-medium text-primary">Queued successfully. Track processing progress in Recent clip generations.</p>
      ) : null}
    </form>
  );
}
