import { supabase } from "@/lib/supabase/client";
import { ApiError } from "@/lib/api/base";
import type { FormSubmissionType } from "@/lib/schemas/forms";
import {
  contactApi,
  donationsApi,
  newsletterApi,
  programApi,
  volunteerApi,
} from "@/lib/api";

interface SubmitFormResponse {
  success: boolean;
  emailSent?: boolean;
  record?: unknown;
  warning?: string;
}

async function fallbackSubmit(type: FormSubmissionType, payload: Record<string, unknown>) {
  switch (type) {
    case "contact":
      return contactApi.submitDirect(payload as Parameters<typeof contactApi.submitDirect>[0]);
    case "newsletter":
      return newsletterApi.subscribeDirect(
        payload.email as string,
        payload.name as string | undefined,
      );
    case "volunteer":
      return volunteerApi.registerDirect(payload as Parameters<typeof volunteerApi.registerDirect>[0]);
    case "program_application":
      return programApi.applyDirect(payload as Parameters<typeof programApi.applyDirect>[0]);
    case "donation":
      return donationsApi.createDirect(payload as Parameters<typeof donationsApi.createDirect>[0]);
    default:
      throw new ApiError("Unsupported form type");
  }
}

/**
 * Submits a form via the Supabase Edge Function (persists + emails hello@samattafoundation.or.tz).
 * Falls back to direct database insert when the edge function is unavailable.
 */
export async function submitForm(type: FormSubmissionType, payload: Record<string, unknown>) {
  const { data, error } = await supabase.functions.invoke<SubmitFormResponse>("submit-form", {
    body: { type, payload },
  });

  if (error) {
    console.warn(`[submit-form] Edge function unavailable for "${type}", using database fallback.`, error);
    const record = await fallbackSubmit(type, payload);
    return { success: true, emailSent: false, record, warning: "Email notification could not be sent." };
  }

  if (!data?.success) {
    throw new ApiError(data?.warning ?? "Form submission failed");
  }

  return data;
}
