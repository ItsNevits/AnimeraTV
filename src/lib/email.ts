import { Resend } from "resend";

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Resend API key not configured");
  }
  const resend = new Resend(apiKey);
  try {
    const { error } = await resend.emails.send({
      from: "no-reply@utilipad.com",
      to,
      subject,
      html,
    });
    if (error) throw error;
    return { success: true };
  } catch (err) {
    return { success: false, error: err };
  }
}
