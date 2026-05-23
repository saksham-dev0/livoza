export type BookNowLead = {
  roomType: string;
  fullName: string;
  phoneNumber: string;
  emailAddress?: string;
  pgLocation?: string;
};

export type ReferralLead = {
  referrerName: string;
  referrerEmail?: string;
  refereeName: string;
  refereePhone: string;
  refereeEmail?: string;
  preferredCity: string;
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
          <tr><td style="padding: 6px 10px; border: 1px solid #eee;"><b>PG Location</b></td><td style="padding: 6px 10px; border: 1px solid #eee;">${
            lead.pgLocation ? escapeHtml(lead.pgLocation) : "-"
          }</td></tr>
        </tbody>
      </table>
    </div>
  `;
  return { subject, html };
}

export function buildReferralEmail(lead: ReferralLead): { subject: string; html: string } {
  const subject = `Livoza - New Referral by ${escapeHtml(lead.referrerName)}`;
  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.4; max-width: 600px;">
      <div style="background: #154f4c; color: #fff; padding: 20px 24px; border-radius: 8px 8px 0 0;">
        <p style="margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.7;">Referral by</p>
        <h2 style="margin: 4px 0 0; font-size: 22px;">${escapeHtml(lead.referrerName)}</h2>
        ${lead.referrerEmail ? `<p style="margin: 4px 0 0; font-size: 13px; opacity: 0.75;">${escapeHtml(lead.referrerEmail)}</p>` : ""}
      </div>
      <div style="border: 1px solid #eee; border-top: none; padding: 20px 24px; border-radius: 0 0 8px 8px;">
        <p style="margin: 0 0 16px 0; color: #444;">A new referral has been submitted. Here are the referee details:</p>
        <table style="border-collapse: collapse; width: 100%;">
          <tbody>
            <tr><td style="padding: 8px 12px; border: 1px solid #eee; background: #f9f9f9; width: 140px;"><b>Name</b></td><td style="padding: 8px 12px; border: 1px solid #eee;">${escapeHtml(lead.refereeName)}</td></tr>
            <tr><td style="padding: 8px 12px; border: 1px solid #eee; background: #f9f9f9;"><b>Phone</b></td><td style="padding: 8px 12px; border: 1px solid #eee;">${escapeHtml(lead.refereePhone)}</td></tr>
            <tr><td style="padding: 8px 12px; border: 1px solid #eee; background: #f9f9f9;"><b>Email</b></td><td style="padding: 8px 12px; border: 1px solid #eee;">${lead.refereeEmail ? escapeHtml(lead.refereeEmail) : "-"}</td></tr>
            <tr><td style="padding: 8px 12px; border: 1px solid #eee; background: #f9f9f9;"><b>PG Location</b></td><td style="padding: 8px 12px; border: 1px solid #eee;">${escapeHtml(lead.preferredCity)}</td></tr>
          </tbody>
        </table>
      </div>
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

