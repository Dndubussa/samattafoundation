import { createClient } from "https://esm.sh/@supabase/supabase-js@2.87.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const CONTACT_EMAIL = Deno.env.get("CONTACT_EMAIL") ?? "hello@samattafoundation.or.tz";
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") ?? "Samatta Foundation <hello@samattafoundation.or.tz>";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

type FormType = "contact" | "newsletter" | "volunteer" | "program_application" | "donation";

const TABLE_MAP: Record<FormType, string> = {
  contact: "contact_submissions",
  newsletter: "newsletter_subscriptions",
  volunteer: "volunteer_registrations",
  program_application: "program_applications",
  donation: "donations",
};

const SUBJECT_MAP: Record<FormType, string> = {
  contact: "New Contact Form Submission",
  newsletter: "New Newsletter Subscription",
  volunteer: "New Volunteer Application",
  program_application: "New Program Application",
  donation: "New Donation Submission",
};

function formatPayloadHtml(type: FormType, payload: Record<string, unknown>): string {
  const rows = Object.entries(payload)
    .map(([key, value]) => {
      const label = key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      return `<tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:600;">${label}</td><td style="padding:8px;border:1px solid #e5e7eb;">${String(value ?? "-")}</td></tr>`;
    })
    .join("");

  return `
    <h2>${SUBJECT_MAP[type]}</h2>
    <p>Submitted via <a href="https://samattafoundation.or.tz">samattafoundation.or.tz</a></p>
    <table style="border-collapse:collapse;width:100%;max-width:640px;">${rows}</table>
  `;
}

function getReplyTo(payload: Record<string, unknown>): string | undefined {
  const candidates = ["email", "donor_email", "applicant_email"];
  for (const key of candidates) {
    const value = payload[key];
    if (typeof value === "string" && value.includes("@")) return value;
  }
  return undefined;
}

async function sendNotificationEmail(
  type: FormType,
  payload: Record<string, unknown>,
): Promise<{ sent: boolean; warning?: string }> {
  if (!RESEND_API_KEY) {
    return { sent: false, warning: "RESEND_API_KEY not configured - record saved but email not sent." };
  }

  const replyTo = getReplyTo(payload);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [CONTACT_EMAIL],
      reply_to: replyTo,
      subject: `[Samatta Foundation] ${SUBJECT_MAP[type]}`,
      html: formatPayloadHtml(type, payload),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Resend API error:", errorText);
    return { sent: false, warning: "Failed to send email notification." };
  }

  return { sent: true };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Missing Supabase service configuration");
    }

    const { type, payload } = await req.json() as { type: FormType; payload: Record<string, unknown> };

    if (!type || !payload || !TABLE_MAP[type]) {
      return new Response(JSON.stringify({ success: false, warning: "Invalid form submission" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const table = TABLE_MAP[type];

    const insertPayload = type === "newsletter"
      ? { email: payload.email, name: payload.name ?? null }
      : payload;

    const { data: record, error } = await supabase
      .from(table)
      .insert([insertPayload])
      .select()
      .single();

    if (error) {
      if (error.code === "23505" && type === "newsletter") {
        return new Response(
          JSON.stringify({ success: false, warning: "This email is already subscribed to our newsletter." }),
          { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      throw error;
    }

    const emailResult = await sendNotificationEmail(type, payload);

    return new Response(
      JSON.stringify({
        success: true,
        emailSent: emailResult.sent,
        record,
        warning: emailResult.warning,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("submit-form error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        warning: error instanceof Error ? error.message : "Internal server error",
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
