"use client";

import { useFormState, useFormStatus } from "react-dom";
import { forgotPasswordAction, signInAction, signUpAction } from "@/lib/actions/auth";

const initialState = { error: "", success: "" };

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white disabled:opacity-60"
    >
      {pending ? "Submitting..." : label}
    </button>
  );
}

export function AuthForm({ mode }: { mode: "signin" | "signup" | "forgot-password" }) {
  const action =
    mode === "signin" ? signInAction : mode === "signup" ? signUpAction : forgotPasswordAction;
  const [state, formAction] = useFormState(action, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <label className="block">
        <span className="mb-2 block text-sm font-medium">Email</span>
        <input
          required
          type="email"
          name="email"
          className="w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 outline-none focus:border-black/30"
          placeholder="founder@promptclips.app"
        />
      </label>
      {mode !== "forgot-password" ? (
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Password</span>
          <input
            required
            minLength={8}
            type="password"
            name="password"
            className="w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 outline-none focus:border-black/30"
            placeholder="Minimum 8 characters"
          />
        </label>
      ) : null}
      {state.error ? <p className="text-sm text-red-600">{state.error}</p> : null}
      {state.success ? <p className="text-sm text-moss">{state.success}</p> : null}
      <SubmitButton
        label={
          mode === "signin"
            ? "Sign in"
            : mode === "signup"
              ? "Create account"
              : "Send reset link"
        }
      />
    </form>
  );
}
