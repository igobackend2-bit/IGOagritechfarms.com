/**
 * sendFormEmail.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Shared email utility for all IGO Agritech website forms.
 * Uses Formsubmit.co — free, unlimited, zero API key required.
 *
 * FIRST-TIME SETUP (one time per email address):
 *   1. Submit any form on the website once.
 *   2. Check the target inbox for a verification email from Formsubmit.
 *   3. Click "Activate Form" in that email.
 *   4. Done — all future submissions to that address arrive automatically.
 *
 * Email routing:
 *   Contact / Project Enquiry  → bd2@igogroups.com           (BD Team, via Formsubmit)
 *   Career Application         → hr.admin@igogroups.com      (HR Team, via Formsubmit)
 *   IGO Academy Enrollment     → igoacademy2026@gmail.com    (Academy Team, via Formsubmit)
 *   Agri Startup Enquiry       → precisionfarming152@gmail.com (Startup Cell, via Formsubmit)
 *   Homepage Enquiry           → igoagritechfarms@gmail.com  (Front Desk, via mail-service — real Gmail SMTP)
 *
 * Homepage Enquiry is sent through our own mail-service (see /mail-service in
 * this repo) instead of Formsubmit, so it's delivered via real Gmail SMTP.
 * Set VITE_MAIL_SERVICE_URL to that service's deployed URL. If it's unset
 * (e.g. not deployed yet), this falls back to Formsubmit so nothing breaks.
 *
 * Formsubmit AJAX docs: https://formsubmit.co/ajax-documentation
 * ─────────────────────────────────────────────────────────────────────────────
 */

// Per-form recipient routing
const FORM_RECIPIENTS: Record<string, string> = {
  "Contact Enquiry":       "precisionfarming152@gmail.com",
  "Career Application":    "hr.admin@igogroups.com",
  "IGO Academy Enrollment":"igoacademy2026@gmail.com",
  "Agri Startup Enquiry":  "precisionfarming152@gmail.com",
  "Homepage Enquiry":      "igoagritechfarms@gmail.com",
};

export type FormType =
  | "Contact Enquiry"
  | "Agri Startup Enquiry"
  | "IGO Academy Enrollment"
  | "Career Application"
  | "Homepage Enquiry";

export interface EmailPayload {
  formType: FormType;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  enquiryType?: string;     // Contact form
  subjectArea?: string;     // Contact form — project/interest area
  interestArea?: string;    // Startup enquiry
  course?: string;          // Academy enrollment
  department?: string;      // Career application
  position?: string;        // Career application
  project?: string;         // Homepage enquiry
  service?: string;         // Homepage enquiry
  message?: string;
}

/**
 * Sends a formatted email for the given form. Returns { success: boolean, error?: string }
 */
export async function sendFormEmail(payload: EmailPayload): Promise<{ success: boolean; error?: string }> {
  const mailServiceUrl = import.meta.env.VITE_MAIL_SERVICE_URL as string | undefined;

  if (payload.formType === "Homepage Enquiry" && mailServiceUrl) {
    return sendViaMailService(payload, mailServiceUrl);
  }
  return sendViaFormsubmit(payload);
}

/**
 * Sends via our own mail-service (real Gmail SMTP, see /mail-service).
 */
async function sendViaMailService(
  payload: EmailPayload,
  mailServiceUrl: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const subject = buildSubject(payload);
    const messageBody = buildMessageBody(payload);

    const response = await fetch(`${mailServiceUrl.replace(/\/$/, "")}/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject,
        text: messageBody,
        replyTo: payload.email || undefined,
      }),
    });

    const result = await response.json();
    if (response.ok && result.success) {
      return { success: true };
    }
    return { success: false, error: result.error || "Unknown error from mail service" };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Network error" };
  }
}

/**
 * Sends a formatted email via Formsubmit.co.
 */
async function sendViaFormsubmit(payload: EmailPayload): Promise<{ success: boolean; error?: string }> {
  try {
    const subject = buildSubject(payload);
    const messageBody = buildMessageBody(payload);

    const recipientEmail = FORM_RECIPIENTS[payload.formType] ?? "precisionfarming152@gmail.com";
    const endpoint = `https://formsubmit.co/ajax/${recipientEmail}`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        // Core fields Formsubmit uses
        name: payload.name,
        email: payload.email,
        message: messageBody,

        // Formsubmit control fields
        _subject: subject,
        _captcha: "false",       // Disable captcha (we handle spam at form level)
        _template: "table",      // Clean table format in email
        _replyto: payload.email, // Reply goes back to visitor
        _honey: "",              // Honeypot field for spam prevention
      }),
    });

    const result = await response.json();
    console.log(`[FormSubmit] Response for ${payload.formType}:`, result);

    if (result.success === "true" || result.success === true || response.ok) {
      return { success: true };
    } else {
      return { success: false, error: result.message || "Unknown error from email service" };
    }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Network error" };
  }
}

// ─── Form type heading config ─────────────────────────────────────────────────

const FORM_HEADERS: Record<FormType, { tag: string; heading: string; icon: string }> = {
  "Contact Enquiry":      { tag: "CONTACT ENQUIRY",       heading: "New Contact / General Enquiry",      icon: "📬" },
  "Agri Startup Enquiry": { tag: "AGRI STARTUP ENQUIRY",  heading: "New Agri Startup Enquiry",           icon: "🚀" },
  "IGO Academy Enrollment":{ tag: "IGO ACADEMY ENROLLMENT",heading: "New Course Enrollment / Enquiry",   icon: "🎓" },
  "Career Application":   { tag: "CAREER APPLICATION",    heading: "New Job Application",                icon: "💼" },
  "Homepage Enquiry":     { tag: "HOMEPAGE ENQUIRY",       heading: "New Homepage Enquiry",               icon: "🌾" },
};

// ─── Subject line ─────────────────────────────────────────────────────────────

function buildSubject(p: EmailPayload): string {
  const { tag } = FORM_HEADERS[p.formType] ?? { tag: "WEBSITE SUBMISSION" };
  switch (p.formType) {
    case "Contact Enquiry":
      return `[${tag}] ${p.enquiryType || "General"} — ${p.name}`;
    case "Agri Startup Enquiry":
      return `[${tag}] ${p.interestArea || "General"} — ${p.name}`;
    case "IGO Academy Enrollment":
      return `[${tag}] ${p.course || "Course Enquiry"} — ${p.name}`;
    case "Career Application":
      return `[${tag}] ${p.department || "General"} — ${p.name}`;
    case "Homepage Enquiry":
      return `[${tag}] ${p.project || "General"} — ${p.name}`;
    default:
      return `[IGO WEBSITE] New Submission — ${p.name}`;
  }
}

// ─── Message body builder ─────────────────────────────────────────────────────

function buildMessageBody(p: EmailPayload): string {
  const { tag, heading, icon } = FORM_HEADERS[p.formType] ?? { tag: "WEBSITE SUBMISSION", heading: "New Submission", icon: "📋" };
  const line = (label: string, value?: string) =>
    value && value.trim() ? `${label}: ${value.trim()}` : "";

  const rows: string[] = [
    // ── Header ──
    `${icon} ${tag}`,
    `${heading}`,
    `----------------------------------------------------`,
    ``,
    // ── Sender details ──
    line("Name",          p.name),
    line("Email",         p.email),
    line("Phone",         p.phone),
    line("Location",      p.location),
    // ── Form-specific fields ──
    line("Enquiry Type",  p.enquiryType),
    line("Interest Area", p.subjectArea || p.interestArea),
    line("Course",        p.course),
    line("Department",    p.department),
    line("Position",      p.position),
    line("Project",       p.project),
    line("Service",       p.service),
    ``,
    `----------------------------------------------------`,
    // ── Message ──
    p.message ? `${p.message}` : "(No message provided)",
    `----------------------------------------------------`,
    ``,
    `Submitted at: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST`,
    `Source: IGO Agritech Website`,
  ];

  return rows.filter(r => r !== undefined).join("\n");
}
