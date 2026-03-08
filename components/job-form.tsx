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
      className="button-primary disabled:opacity-60"
    >
      {pending ? "Queueing render..." : "Generate clip"}
    </motion.button>
  );
}

export function JobForm() {
  const [state, formAction] = useFormState(createVideoJobAction, initialState);

  return (
    <form action={formAction} className="grid gap-4 lg:grid-cols-2">
      <label className="block lg:col-span-2">
        <span className="mb-2 block text-sm font-medium text-white">Prompt brief</span>
        <textarea
          required
          minLength={10}
          name="prompt"
          rows={6}
          className="textarea-dark"
          placeholder="Describe the scene, camera style, lighting, and subject motion."
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-white">Duration</span>
        <select name="durationSeconds" className="select-dark" defaultValue="10">
          <option value="10">10 seconds</option>
          <option value="15">15 seconds</option>
          <option value="20">20 seconds</option>
          <option value="25">25 seconds</option>
          <option value="30">30 seconds</option>
        </select>
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-white">Aspect ratio</span>
        <select name="aspectRatio" className="select-dark" defaultValue="16:9">
          <option value="16:9">16:9 landscape</option>
          <option value="9:16">9:16 vertical</option>
          <option value="1:1">1:1 square</option>
        </select>
      </label>
      <label className="block lg:col-span-1">
        <span className="mb-2 block text-sm font-medium text-white">Style</span>
        <select name="style" className="select-dark" defaultValue="cinematic">
          <option value="cinematic">Cinematic</option>
          <option value="product">Product</option>
          <option value="anime">Anime</option>
          <option value="surreal">Surreal</option>
        </select>
      </label>
      <div className="soft-card flex flex-col justify-between px-4 py-4 lg:col-span-1">
        <div>
          <p className="text-sm font-medium text-white">Render notes</p>
          <p className="mt-2 text-sm leading-6 text-[#8fa3bd]">
            Demo generations are watermarked. Paid renders reserve credits immediately and release them on failure.
          </p>
        </div>
      </div>
      <div className="lg:col-span-2 flex flex-col gap-4 border-t border-white/10 pt-4 md:flex-row md:items-center md:justify-between">
        <div>
          {state.error ? <p className="text-sm text-[#ff8e9d]">{state.error}</p> : null}
          {state.success ? <p className="text-sm text-[#7be0c3]">{state.success}</p> : null}
        </div>
        <SubmitButton />
      </div>
    </form>
  );
}
