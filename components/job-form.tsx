"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { ArrowRight } from "@/components/icons";
import { createVideoJobAction } from "@/lib/actions/jobs";

const initialState = { error: "", success: "" };

const promptExamples = [
  "Cinematic launch teaser for a fitness app, energetic transitions, glowing UI overlays, 15s vertical video",
  "Storytelling scene of a founder in a studio at night, moody lighting, slow push in camera, 25s",
  "Product hero video for a smartwatch on reflective surface, premium lighting, smooth orbit motion",
];

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <motion.button
      type="submit"
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      disabled={pending}
      className="inline-flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-60"
      aria-label="Generate video"
    >
      {pending ? <span className="text-xs font-bold">...</span> : <ArrowRight className="size-5" />}
    </motion.button>
  );
}

export function JobForm() {
  const [state, formAction] = useFormState(createVideoJobAction, initialState);
  const [prompt, setPrompt] = useState("");
  const [fileName, setFileName] = useState("");

  return (
    <form action={formAction} className="space-y-4">
      <div className="rounded-3xl border border-border bg-card/80 p-4 md:p-5">
        <textarea
          required
          minLength={10}
          name="prompt"
          rows={5}
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          className="w-full resize-none bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
          placeholder="Describe the video you want to generate..."
        />

        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-secondary px-3 py-2 text-xs font-medium text-secondary-foreground">
            <input
              type="file"
              name="referenceImage"
              accept="image/*"
              className="hidden"
              onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
            />
            + Reference image
          </label>
          {fileName ? <span className="text-xs text-muted-foreground">{fileName}</span> : null}

          <select name="durationSeconds" className="input-dark !w-auto !py-2 text-xs" defaultValue="15">
            <option value="10">10s</option>
            <option value="15">15s</option>
            <option value="20">20s</option>
            <option value="25">25s</option>
            <option value="30">30s</option>
          </select>

          <select name="aspectRatio" className="input-dark !w-auto !py-2 text-xs" defaultValue="9:16">
            <option value="9:16">9:16</option>
            <option value="16:9">16:9</option>
            <option value="1:1">1:1</option>
          </select>

          <select name="style" className="input-dark !w-auto !py-2 text-xs" defaultValue="cinematic">
            <option value="cinematic">Cinematic</option>
            <option value="product">Product</option>
            <option value="anime">Anime</option>
            <option value="surreal">Surreal</option>
          </select>

          <div className="ml-auto">
            <SubmitButton />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {promptExamples.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => setPrompt(example)}
            className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs text-secondary-foreground"
          >
            Use example
          </button>
        ))}
      </div>

      <div>
        {state.error ? <p className="text-sm font-medium text-destructive">{state.error}</p> : null}
        {state.success ? <p className="text-sm font-medium text-primary">{state.success}</p> : null}
      </div>
    </form>
  );
}
