import { Resend } from "@convex-dev/resend";
import { components } from "./_generated/api";
import type { MutationCtx } from "./_generated/server";

type BookNowLead = {
  roomType: string;
  fullName: string;
  phoneNumber: string;
  emailAddress?: string;
};

type ContactLead = {
  fullName: string;
  phoneNumber: string;
  emailAddress?: string;
  message?: string;
};

const resend: Resend = new Resend(components.resend, {
  // We want real delivery to your mailbox.
  // Ensure RESEND_API_KEY + RESEND_FROM_EMAIL are configured in your Convex deployment.
  testMode: false,
});

function escapeHtml(text: string) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getToEmail(): string {
  return process.env.RESEND_TO_EMAIL ?? "reztrosoftteam@gmail.com";
}

function getFromEmailHeader(): string {
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  if (!fromEmail) {
    throw new Error(
      "Missing RESEND_FROM_EMAIL. Set it to a verified sender email in Resend.",
    );
  }
  const fromName = process.env.RESEND_FROM_NAME ?? "Livoza";
  return `${fromName} <${fromEmail}>`;
}

export async function queueBookNowEmail(
  ctx: MutationCtx,
  lead: BookNowLead,
) {
  const to = getToEmail();
  const from = getFromEmailHeader();

  const subject = `Livoza - New Book Now Request`;
  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.4;">
      <h2 style="margin: 0 0 12px 0;">BOOK NOW Request</h2>
      <p style="margin: 0 0 16px 0;">A user just booked a room in your landing page.</p>

      <table style="border-collapse: collapse;">
        <tbody>
          <tr><td style="padding: 6px 10px; border: 1px solid #eee;"><b>Room Type</b></td><td style="padding: 6px 10px; border: 1px solid #eee;">${escapeHtml(
            lead.roomType,
          )}</td></tr>
          <tr><td style="padding: 6px 10px; border: 1px solid #eee;"><b>Full Name</b></td><td style="padding: 6px 10px; border: 1px solid #eee;">${escapeHtml(
            lead.fullName,
          )}</td></tr>
          <tr><td style="padding: 6px 10px; border: 1px solid #eee;"><b>Phone Number</b></td><td style="padding: 6px 10px; border: 1px solid #eee;">${escapeHtml(
            lead.phoneNumber,
          )}</td></tr>
          <tr><td style="padding: 6px 10px; border: 1px solid #eee;"><b>Email Address</b></td><td style="padding: 6px 10px; border: 1px solid #eee;">${
            lead.emailAddress ? escapeHtml(lead.emailAddress) : "-"
          }</td></tr>
        </tbody>
      </table>
    </div>
  `;

  await resend.sendEmail(ctx, {
    from,
    to,
    subject,
    html,
  });
}

export async function queueContactEmail(
  ctx: MutationCtx,
  lead: ContactLead,
) {
  const to = getToEmail();
  const from = getFromEmailHeader();

  const subject = `Livoza - New Contact Callback Request`;
  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.4;">
      <h2 style="margin: 0 0 12px 0;">CONTACT Request</h2>
      <p style="margin: 0 0 16px 0;">A user filled out the contact form.</p>

      <table style="border-collapse: collapse;">
        <tbody>
          <tr><td style="padding: 6px 10px; border: 1px solid #eee;"><b>Full Name</b></td><td style="padding: 6px 10px; border: 1px solid #eee;">${escapeHtml(
            lead.fullName,
          )}</td></tr>
          <tr><td style="padding: 6px 10px; border: 1px solid #eee;"><b>Phone Number</b></td><td style="padding: 6px 10px; border: 1px solid #eee;">${escapeHtml(
            lead.phoneNumber,
          )}</td></tr>
          <tr><td style="padding: 6px 10px; border: 1px solid #eee;"><b>Email Address</b></td><td style="padding: 6px 10px; border: 1px solid #eee;">${
            lead.emailAddress ? escapeHtml(lead.emailAddress) : "-"
          }</td></tr>
          <tr><td style="padding: 6px 10px; border: 1px solid #eee;"><b>Message</b></td><td style="padding: 6px 10px; border: 1px solid #eee;">${
            lead.message ? escapeHtml(lead.message) : "-"
          }</td></tr>
        </tbody>
      </table>
    </div>
  `;

  await resend.sendEmail(ctx, {
    from,
    to,
    subject,
    html,
  });
}

