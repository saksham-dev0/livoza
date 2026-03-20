export type BookNowLead = {
  roomType: string;
  fullName: string;
  phoneNumber: string;
  emailAddress?: string;
};

export type ContactLead = {
  fullName: string;
  phoneNumber: string;
  emailAddress?: string;
  message?: string;
};

function escapeHtml(text: string) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function getToEmail(): string {
  return process.env.SMTP_TO_EMAIL ?? "reztrosoftteam@gmail.com";
}

export function getFromEmailHeader(): string {
  const fromEmail = process.env.SMTP_FROM_EMAIL?.trim() ?? "reztrosoftteam@gmail.com";
  const fromName = process.env.SMTP_FROM_NAME ?? "Livoza";
  return `${fromName} <${fromEmail}>`;
}

export function buildBookNowEmail(lead: BookNowLead): { subject: string; html: string } {
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
  return { subject, html };
}

export function buildContactEmail(lead: ContactLead): { subject: string; html: string } {
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
  return { subject, html };
}

