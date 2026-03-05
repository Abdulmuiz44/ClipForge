"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

type FormState = { error: string; success: string };

function getField(formData: FormData, field: string) {
  const value = formData.get(field);
  return typeof value === "string" ? value : "";
}

export async function signUpAction(_: FormState, formData: FormData): Promise<FormState> {
  const email = getField(formData, "email");
  const password = getField(formData, "password");
  const supabase = createServerSupabaseClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        email,
      },
    },
  });

  if (error) {
    return { error: error.message, success: "" };
  }

  return {
    error: "",
    success: "Account created. Check your inbox if email confirmation is enabled.",
  };
}

export async function signInAction(_: FormState, formData: FormData): Promise<FormState> {
  const email = getField(formData, "email");
  const password = getField(formData, "password");
  const supabase = createServerSupabaseClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message, success: "" };
  }

  redirect("/dashboard");
}

export async function forgotPasswordAction(_: FormState, formData: FormData): Promise<FormState> {
  const email = getField(formData, "email");
  const supabase = createServerSupabaseClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    return { error: error.message, success: "" };
  }

  return {
    error: "",
    success: "Password reset email sent if the address exists.",
  };
}
