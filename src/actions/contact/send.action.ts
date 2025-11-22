import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { sendEmail } from "@/lib/email";

export const sendContactEmail = defineAction({
  accept: "json",
  input: z.object({
    name: z.string().min(1, "El nombre es requerido."),
    email: z.string().email("Email inválido."),
    subject: z.string().min(1, "El asunto es requerido."),
    message: z.string().min(1, "El mensaje es requerido."),
  }),
  handler: async ({ name, email, subject, message }) => {
    // Sanitización básica
    const safeName = String(name).replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const safeEmail = String(email).replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const safeSubject = String(subject)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    const safeMessage = String(message)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    const html = `<p><strong>Nombre:</strong> ${safeName}</p>
    <p><strong>Email:</strong> ${safeEmail}</p>
    <p><strong>Asunto:</strong> ${safeSubject}</p>
    <p><strong>Mensaje:</strong><br/>${safeMessage}</p>`;

    const result = await sendEmail({
      to: "bs.alvarado21@gmail.com",
      subject: `Contacto Animera TV: ${safeSubject}`,
      html,
    });

    if (result.success) {
      return { success: true };
    } else {
      let errorMsg = "Error al enviar el correo.";
      if (typeof result.error === "string") {
        errorMsg = result.error;
      } else if (
        result.error &&
        typeof result.error === "object" &&
        "message" in result.error
      ) {
        errorMsg = (result.error as any).message || errorMsg;
      }
      throw new Error(errorMsg);
    }
  },
});
