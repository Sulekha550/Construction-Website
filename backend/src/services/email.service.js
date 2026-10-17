
import "dotenv/config";
import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY?.trim();

console.log("Resend API key loaded:", Boolean(apiKey));

const resend = apiKey ? new Resend(apiKey) : null;

export async function sendInquiryEmail({
  name,
  email,
  phone,
  inquiry,
  message,
}) {
  if (!resend) {
    throw new Error(
      "RESEND_API_KEY is missing in backend/.env"
    );
  }

  const adminEmail = process.env.CONTACT_RECEIVER_EMAIL;
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

  if (!adminEmail) {
    throw new Error(
      "CONTACT_RECEIVER_EMAIL is missing in backend/.env"
    );
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email || "Not provided");
  const safePhone = escapeHtml(phone);
  const safeInquiry = escapeHtml(inquiry || "Not specified");
  const safeMessage = escapeHtml(message);

  const result = await resend.emails.send({
    from: `Vardha Builders <${fromEmail}>`,
    to: [adminEmail],
    subject: `New ${inquiry || "Contact"} Inquiry — ${name}`,
    ...(email ? { replyTo: email } : {}),

    html: `
      <div style="font-family:Arial,sans-serif;padding:24px;background:#f3f4f6">
        <div style="max-width:600px;margin:auto;background:#fff;border-radius:10px;overflow:hidden;color:#172033">
          <div style="background:#101b2b;padding:24px">
            <h2 style="color:#d6b574;margin:0">VARDHA BUILDERS</h2>
            <p style="color:white">New Website Inquiry</p>
          </div>
          <div style="padding:24px">
            <p><b>Name:</b> ${safeName}</p>
            <p><b>Email:</b> ${safeEmail}</p>
            <p><b>Phone:</b> ${safePhone}</p>
            <p><b>Inquiry:</b> ${safeInquiry}</p>
            <h3>Message</h3>
            <p style="white-space:pre-wrap">${safeMessage}</p>
          </div>
        </div>
      </div>
    `,

    text: `Name: ${name}
Email: ${email || "Not provided"}
Phone: ${phone}
Inquiry: ${inquiry || "Not specified"}

Message:
${message}`,
  });

  if (result.error) {
    console.error("Resend email error:", result.error);
    throw new Error(result.error.message);
  }

  console.log("Inquiry email sent:", result.data?.id);
  return result;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
