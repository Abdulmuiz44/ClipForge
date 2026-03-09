"use client";

import { motion } from "framer-motion";
import { useFormState, useFormStatus } from "react-dom";
import { createVideoJobAction } from "@/lib/actions/jobs";

const initialState = { error: "", success: "" };

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
      {pending ? "Queueing render..." : "Generate clip"}
    </motion.button>
  );
}

export function JobForm() {
  const [state, formAction] = useFormState(createVideoJobAction, initialState);

  return (
    <form action={formAction} className="grid gap-6">
      <div className="space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-foreground">Prompt brief</span>
          <textarea
            required
            minLength={10}
            name="prompt"
            rows={4}
            className="input-dark resize-none"
            placeholder="Describe the scene, camera style, lighting, and subject motion."
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-foreground">Duration</span>
            <select name="durationSeconds" className="input-dark" defaultValue="10">
              <option value="10">10 seconds</option>
              <option value="15">15 seconds</option>
              <option value="20">20 seconds</option>
              <option value="25">25 seconds</option>
              <option value="30">30 seconds</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-foreground">Aspect ratio</span>
            <select name="aspectRatio" className="input-dark" defaultValue="16:9">
              <option value="16:9">16:9 landscape</option>
              <option value="9:16">9:16 vertical</option>
              <option value="1:1">1:1 square</option>
            </select>
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-foreground">Style</span>
          <select name="style" className="input-dark" defaultValue="cinematic">
            <option value="cinematic">Cinematic</option>
            <option value="product">Product</option>
            <option value="anime">Anime</option>
            <option value="surreal">Surreal</option>
          </select>
        </label>
      </div>

      <div className="rounded-xl bg-muted/30 p-4 border border-border">
        <p className="text-sm font-bold text-foreground">Render notes</p>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
          Demo renders are watermarked. Paid renders reserve credits immediately and release them on failure.
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
