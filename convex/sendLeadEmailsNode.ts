"use node";

import nodemailer from "nodemailer";
import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import {
  buildBookNowEmail,
  buildContactEmail,
  getFromEmailHeader,
  getToEmail,
} from "./sendLeadEmails";

function getSmtpTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      "Missing SMTP config. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS.",
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

async function sendEmail(subject: string, html: string) {
  const to = getToEmail();
  const from = getFromEmailHeader();
  const transporter = getSmtpTransporter();
  await transporter.sendMail({ from, to, subject, html });
}

export const sendBookNowEmail = internalAction({
  args: {
    roomType: v.string(),
    fullName: v.string(),
    phoneNumber: v.string(),
    emailAddress: v.optional(v.string()),
  },
  handler: async (_ctx, args) => {
    const { subject, html } = buildBookNowEmail(args);
    await sendEmail(subject, html);
    return null;
  },
});

export const sendContactEmail = internalAction({
  args: {
    fullName: v.string(),
    phoneNumber: v.string(),
    emailAddress: v.optional(v.string()),
    message: v.optional(v.string()),
  },
  handler: async (_ctx, args) => {
    const { subject, html } = buildContactEmail(args);
    await sendEmail(subject, html);
    return null;
  },
});
