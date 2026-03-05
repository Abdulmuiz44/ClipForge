"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createVideoJobAction } from "@/lib/actions/jobs";

const initialState = { error: "", success: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white disabled:opacity-60"
    >
      {pending ? "Creating..." : "Create video"}
    </button>
  );
}

export function JobForm() {
  const [state, formAction] = useFormState(createVideoJobAction, initialState);

  return (
    <form action={formAction} className="grid gap-4 md:grid-cols-2">
      <label className="block md:col-span-2">
        <span className="mb-2 block text-sm font-medium">Prompt</span>
        <textarea
          required
          minLength={10}
          name="prompt"
          rows={5}
          className="w-full rounded-[24px] border border-black/10 bg-white/80 px-4 py-3 outline-none focus:border-black/30"
          placeholder="A mirrored speedboat slicing through sunset mist, fashion-campaign energy."
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-medium">Duration</span>
        <select
          name="durationSeconds"
          className="w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 outline-none"
          defaultValue="10"
        >
          <option value="10">10 seconds</option>
          <option value="15">15 seconds</option>
          <option value="20">20 seconds</option>
          <option value="25">25 seconds</option>
          <option value="30">30 seconds</option>
        </select>
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-medium">Aspect ratio</span>
        <select
          name="aspectRatio"
          className="w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 outline-none"
          defaultValue="16:9"
        >
          <option value="16:9">16:9</option>
          <option value="9:16">9:16</option>
          <option value="1:1">1:1</option>
        </select>
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-medium">Style</span>
        <select
          name="style"
          className="w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 outline-none"
          defaultValue="cinematic"
        >
          <option value="cinematic">Cinematic</option>
          <option value="product">Product</option>
          <option value="anime">Anime</option>
          <option value="surreal">Surreal</option>
        </select>
      </label>
      <div className="md:col-span-2 flex items-center justify-between gap-4">
        <div>
          {state.error ? <p className="text-sm text-red-600">{state.error}</p> : null}
          {state.success ? <p className="text-sm text-moss">{state.success}</p> : null}
        </div>
        <SubmitButton />
      </div>
    </form>
  );
}
