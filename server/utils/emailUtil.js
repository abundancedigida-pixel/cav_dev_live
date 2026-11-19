import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const COMPANY_NAME = "Cannon Avenue";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: Number(process.env.EMAIL_PORT) === 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ------------------------------------------
// HELPERS
// ------------------------------------------

// Brand colours (override via env if needed, otherwise defaults are used)
const BRAND = {
  primary: process.env.BRAND_PRIMARY || "#1f2a44", // header / headings
  accent: process.env.BRAND_ACCENT || "#c8a24a", // buttons / highlights
  soft: process.env.BRAND_SOFT || "#f4f1ea", // light background panels
};

const LOGO_CID = "cannon-avenue-logo";

const assertEmailConfig = () => {
  if (
    !process.env.EMAIL_HOST ||
    !process.env.EMAIL_USER ||
    !process.env.EMAIL_PASS
  ) {
    throw new Error("Email configuration is missing in environment variables");
  }
};

const fromAddress = () =>
  `"${COMPANY_NAME}" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`;

// HTML escape (keeps user-typed text safe)
const esc = (value = "") =>
  String(value).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));

// Attach the logo only if the file exists, otherwise a text header is used
const getLogoAttachment = () => {
  const logoPath =
    process.env.EMAIL_LOGO_PATH || path.join(__dirname, "../assets/Brand.png");

  if (!fs.existsSync(logoPath)) {
    console.warn("Email logo not found at:", logoPath);
    return null;
  }

  return {
    filename: path.basename(logoPath),
    path: logoPath,
    cid: LOGO_CID,
  };
};

// ------------------------------------------
// OTP EMAIL
// ------------------------------------------

export const sendOtpEmail = async (email, otp) => {
  if (!email || !otp) {
    throw new Error("Email and OTP are required");
  }

  assertEmailConfig();

  const mailOptions = {
    from: fromAddress(),
    to: email,
    subject: `${COMPANY_NAME} - Password Reset OTP`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: ${BRAND.primary};">${COMPANY_NAME}</h2>

        <h3>Password Reset Verification</h3>

        <p>You requested to reset your ${COMPANY_NAME} account password.</p>

        <p>Your OTP verification code is:</p>

        <h1 style="letter-spacing: 8px; color: #222;">
          ${esc(otp)}
        </h1>

        <p>This OTP is valid for <strong>5 minutes</strong>.</p>

        <p>Do not share this OTP with anyone.</p>

        <p>If you did not request a password reset, please ignore this email.</p>

        <hr />

        <p style="font-size: 12px; color: #777;">
          This is an automated email from ${COMPANY_NAME}. Please do not reply.
        </p>
      </div>
    `,
  };

  try {
    const result = await transporter.sendMail(mailOptions);

    return {
      success: true,
      messageId: result.messageId,
    };
  } catch (error) {
    console.error("OTP email sending error:", error.message);
    throw new Error("Failed to send OTP email");
  }
};

// ------------------------------------------
// NEW ENQUIRY -> ADMIN NOTIFICATION EMAIL
// ------------------------------------------

export const sendEnquiryNotificationEmail = async (enquiry) => {
  assertEmailConfig();

  const to = process.env.ADMIN_NOTIFY_EMAIL || process.env.EMAIL_USER;

  const rows = [
    ["Full Name", enquiry.fullName],
    ["Phone", enquiry.phoneNumber],
    ["Email", enquiry.emailAddress],
    ["Company", enquiry.companyName],
    ["Product Category", enquiry.productCategory],
    ["Product", enquiry.product],
    ["Thickness", enquiry.preferredThickness],
    ["Colour", enquiry.preferredColour],
    ["Message", enquiry.message],
  ]
    .filter(([, v]) => v)
    .map(
      ([k, v]) => `
        <tr>
          <td style="padding:8px;border-bottom:1px solid #eee;color:#777;width:140px;vertical-align:top;">${esc(k)}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;color:#222;white-space:pre-line;">${esc(v)}</td>
        </tr>`
    )
    .join("");

  const adminLink = process.env.ADMIN_URL
    ? `<p style="margin-top:20px;"><a href="${esc(process.env.ADMIN_URL)}/admin/inquiries" style="background:${BRAND.accent};color:#fff;padding:10px 18px;border-radius:6px;text-decoration:none;font-size:13px;">View in Admin Panel</a></p>`
    : "";

  const subjectName = String(enquiry.fullName || "Customer").replace(/[\r\n]+/g, " ");

  await transporter.sendMail({
    from: fromAddress(),
    to,
    replyTo: enquiry.emailAddress,
    subject: `New Enquiry - ${subjectName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color:${BRAND.primary};margin-top:0;">New Enquiry Received</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">${rows}</table>
        ${adminLink}
        <p style="font-size:12px;color:#777;margin-top:24px;">
          Automated email from ${COMPANY_NAME}. Replying to this email goes directly to the customer.
        </p>
      </div>
    `,
  });
};

// ------------------------------------------
// NEW ENQUIRY -> CUSTOMER CONFIRMATION EMAIL (with logo)
// ------------------------------------------

export const sendEnquiryConfirmationEmail = async (enquiry) => {
  if (!enquiry.emailAddress) return;

  assertEmailConfig();

  const logo = getLogoAttachment();

  const summaryRows = [
    ["Product Category", enquiry.productCategory],
    ["Product", enquiry.product],
    ["Colour", enquiry.preferredColour],
    ["Thickness", enquiry.preferredThickness],
    ["Your Message", enquiry.message],
  ]
    .filter(([, v]) => v)
    .map(
      ([k, v]) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #e3dccd;color:#7a7568;width:130px;vertical-align:top;font-size:13px;">${esc(k)}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #e3dccd;color:${BRAND.primary};font-size:13px;white-space:pre-line;">${esc(v)}</td>
        </tr>`
    )
    .join("");

  const summaryBlock = summaryRows
    ? `
      <p style="margin:24px 0 8px;font-size:13px;font-weight:bold;color:${BRAND.primary};">Your enquiry summary</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.soft};border-radius:8px;border-collapse:separate;">
        ${summaryRows}
      </table>`
    : "";

  const headerContent = logo
    ? `<img src="cid:${LOGO_CID}" alt="${COMPANY_NAME}" width="150" style="display:block;margin:0 auto;max-width:150px;height:auto;border:0;" />`
    : `<span style="font-size:22px;font-weight:bold;letter-spacing:3px;color:#ffffff;">${COMPANY_NAME.toUpperCase()}</span>`;

  const contactLines = [
    process.env.COMPANY_PHONE && `Phone: ${esc(process.env.COMPANY_PHONE)}`,
    process.env.COMPANY_EMAIL && `Email: ${esc(process.env.COMPANY_EMAIL)}`,
    process.env.COMPANY_WEBSITE && `Web: ${esc(process.env.COMPANY_WEBSITE)}`,
  ]
    .filter(Boolean)
    .join("<br/>");

  const firstName = String(enquiry.fullName || "there").trim().split(" ")[0];

  await transporter.sendMail({
    from: fromAddress(),
    to: enquiry.emailAddress,
    replyTo: process.env.ADMIN_NOTIFY_EMAIL || process.env.EMAIL_USER,
    subject: `We received your enquiry - ${COMPANY_NAME}`,
    attachments: logo ? [logo] : [],
    html: `
      <div style="background:#eeeae1;padding:24px 12px;font-family:Arial,Helvetica,sans-serif;">
        <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #ddd5c4;">
          <tr>
            <td align="center" style="background:${BRAND.primary};padding:28px 20px;">
              ${headerContent}
            </td>
          </tr>
          <tr>
            <td style="padding:28px 28px 8px;">
              <h2 style="margin:0 0 12px;font-size:20px;color:${BRAND.primary};">Thank you, ${esc(firstName)}!</h2>
              <p style="margin:0;font-size:14px;line-height:1.7;color:#444;">
                We have received your enquiry${
                  enquiry.product ? ` about <b>${esc(enquiry.product)}</b>` : ""
                }. Our team will review the details and contact you shortly.
              </p>
              ${summaryBlock}
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 28px;">
              <p style="margin:20px 0 0;font-size:13px;line-height:1.7;color:#444;">
                Regards,<br/><b style="color:${BRAND.primary};">${COMPANY_NAME} Team</b>
              </p>
            </td>
          </tr>
          <tr>
            <td style="background:${BRAND.soft};padding:16px 28px;font-size:12px;line-height:1.7;color:#7a7568;text-align:center;">
              ${contactLines ? `${contactLines}<br/>` : ""}
              This is an automated confirmation. You can reply to this email if you need help.
            </td>
          </tr>
        </table>
      </div>
    `,
  });
};


// ------------------------------------------
// ADMIN -> CUSTOMER ENQUIRY REPLY EMAIL
// ------------------------------------------

export const sendEnquiryReplyEmail = async ({
  email,
  fullName,
  subject,
  message,
}) => {
  if (!email || !subject?.trim() || !message?.trim()) {
    throw new Error("Customer email, subject and message are required");
  }

  assertEmailConfig();

  const safeSubject = subject.trim().replace(/[\r\n]+/g, " ");

  const firstName = String(fullName || "Customer")
    .trim()
    .split(" ")[0];

  const htmlMessage = esc(message.trim()).replace(/\r?\n/g, "<br/>");

  try {
    const result = await transporter.sendMail({
      from: fromAddress(),
      to: email,
      replyTo: process.env.ADMIN_NOTIFY_EMAIL || process.env.EMAIL_USER,
      subject: safeSubject,
      text: `Dear ${firstName},\n\n${message.trim()}\n\nRegards,\n${COMPANY_NAME} Team`,
      html: `
        <div style="background:#eeeae1;padding:24px 12px;font-family:Arial,Helvetica,sans-serif;">
          <table align="center" width="100%" cellpadding="0" cellspacing="0"
            style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #ddd5c4;">

            <tr>
              <td align="center" style="background:${BRAND.primary};padding:24px;">
                <h2 style="color:#ffffff;margin:0;">${COMPANY_NAME}</h2>
              </td>
            </tr>

            <tr>
              <td style="padding:28px;">
                <h3 style="color:${BRAND.primary};">
                  Dear ${esc(firstName)},
                </h3>

                <div style="font-size:14px;line-height:1.8;color:#444;">
                  ${htmlMessage}
                </div>

                <p style="margin-top:24px;font-size:14px;color:#444;">
                  Regards,<br/>
                  <strong style="color:${BRAND.primary};">
                    ${COMPANY_NAME} Team
                  </strong>
                </p>
              </td>
            </tr>

            <tr>
              <td style="background:${BRAND.soft};padding:16px;text-align:center;font-size:12px;color:#777;">
                ${COMPANY_NAME}
              </td>
            </tr>

          </table>
        </div>
      `,
    });

    return {
      success: true,
      messageId: result.messageId,
    };
  } catch (error) {
    console.error("Enquiry reply email error:", error.message);
    throw new Error("Failed to send enquiry email");
  }
};