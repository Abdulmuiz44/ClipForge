export type PlanTier = "FREE" | "STARTER" | "PRO" | "ENTERPRISE";
export type JobStatus = "QUEUED" | "PROCESSING" | "COMPLETED" | "FAILED";
export type PaymentType = "ONE_TIME" | "SUBSCRIPTION";

export type ProfileRow = {
  id: string;
  email: string;
  credits_balance: number;
  reserved_credits: number;
  trial_credits_granted: number;
  trial_credits_expires_at: string | null;
  trial_credits_consumed: number;
  plan_tier: PlanTier;
  has_paid_access: boolean;
  demo_generations_used: number;
  created_at: string;
  updated_at: string;
};

export type VideoJobRow = {
  id: string;
  user_id: string;
  prompt: string;
  duration_seconds: number;
  aspect_ratio: string;
  style: string;
  status: JobStatus;
  video_url: string | null;
  error_message: string | null;
  cost_credits: number;
  credits_reserved: number;
  is_demo: boolean;
  watermarked: boolean;
  provider_name: string;
  provider_job_id: string | null;
  attempts: number;
  last_polled_at: string | null;
  next_retry_at: string | null;
  created_at: string;
  updated_at: string;
};

export type PaymentRow = {
  id: string;
  user_id: string;
  lemonsqueezy_event_id: string;
  type: PaymentType;
  amount: number;
  currency: string;
  credits_added: number;
  plan_tier_after: PlanTier;
  raw_payload: unknown;
  created_at: string;
};
