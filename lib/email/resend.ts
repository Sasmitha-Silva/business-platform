import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_FROM_EMAIL || 'Rotaract Network <onboarding@resend.dev>';

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

/**
 * Base email layout wrapper with modern Rotaract branding
 */
function emailLayout({
  title,
  preheader,
  contentHtml,
}: {
  title: string;
  preheader: string;
  contentHtml: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;">
  <span style="display:none;font-size:0;line-height:0;max-height:0;mso-hide:all;">${preheader}</span>
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" border="0" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:16px;border:1px solid #e2e8f0;overflow:hidden;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
          <!-- Header Bar -->
          <tr>
            <td style="background-color:#D41367;padding:24px 32px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:800;letter-spacing:-0.5px;">Rotaract Business Network</h1>
              <p style="margin:4px 0 0 0;color:#fce7f3;font-size:12px;font-weight:500;">Official B2B &amp; Professional Directory</p>
            </td>
          </tr>
          <!-- Body Content -->
          <tr>
            <td style="padding:32px;">
              ${contentHtml}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#f8fafc;padding:20px 32px;border-top:1px solid #f1f5f9;text-align:center;font-size:12px;color:#64748b;">
              <p style="margin:0;">&copy; ${new Date().getFullYear()} Rotaract Business Network &bull; Vocational Service</p>
              <p style="margin:6px 0 0 0;">This is an automated notification. Please do not reply directly to this email.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * 1. Business Registration & Welcome Email
 */
export async function sendWelcomeEmail({
  to,
  fullName,
  businessName,
}: {
  to: string;
  fullName: string;
  businessName: string;
}) {
  if (!resend) return { success: false, error: 'Resend not configured' };

  try {
    const html = emailLayout({
      title: 'Welcome to Rotaract Business Network',
      preheader: `Your business ${businessName} has been registered successfully.`,
      contentHtml: `
        <h2 style="font-size:18px;font-weight:700;color:#0f172a;margin-top:0;">Welcome, ${fullName}!</h2>
        <p style="font-size:14px;line-height:1.6;color:#334155;">
          Thank you for registering <strong>${businessName}</strong> on the Rotaract Business Network directory.
        </p>
        <p style="font-size:14px;line-height:1.6;color:#334155;">
          Your listing is currently in <strong>Review</strong>. Once our District Moderators verify your Rotaract affiliation, your business will be published publicly across the directory.
        </p>
        <div style="margin:24px 0;text-align:center;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/business-dashboard" style="display:inline-block;background-color:#D41367;color:#ffffff;font-size:14px;font-weight:700;padding:12px 28px;border-radius:10px;text-decoration:none;">
            Go to Business Dashboard
          </a>
        </div>
      `,
    });

    const data = await resend.emails.send({
      from: fromEmail,
      to,
      subject: `Registration Confirmed: ${businessName} — Rotaract Business Network`,
      html,
    });

    return { success: true, data };
  } catch (error: any) {
    console.error('Error sending welcome email:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 2. Verification Approved Email
 */
export async function sendVerificationApprovedEmail({
  to,
  fullName,
  businessName,
  tierLevel,
}: {
  to: string;
  fullName: string;
  businessName: string;
  tierLevel: number;
}) {
  if (!resend) return { success: false, error: 'Resend not configured' };

  const tierLabel = tierLevel === 2 ? 'DRR Verified (Level 2)' : 'GST Verified (Level 1)';

  try {
    const html = emailLayout({
      title: 'Verification Approved',
      preheader: `Congratulations! ${businessName} is now ${tierLabel}.`,
      contentHtml: `
        <h2 style="font-size:18px;font-weight:700;color:#0f172a;margin-top:0;">Congratulations, ${fullName}!</h2>
        <p style="font-size:14px;line-height:1.6;color:#334155;">
          Your verification documents for <strong>${businessName}</strong> have been officially reviewed and approved by the District Moderation Team.
        </p>
        <div style="background-color:#fdf2f8;border:1px solid #fbcfe8;border-radius:12px;padding:16px;margin:20px 0;text-align:center;">
          <span style="font-size:15px;font-weight:800;color:#D41367;">Badge Awarded: ${tierLabel}</span>
        </div>
        <p style="font-size:14px;line-height:1.6;color:#334155;">
          Your verified badge is now displayed proudly on your public business page, ranking you higher in search and filter results.
        </p>
      `,
    });

    const data = await resend.emails.send({
      from: fromEmail,
      to,
      subject: `Verified Badge Awarded: ${businessName}`,
      html,
    });

    return { success: true, data };
  } catch (error: any) {
    console.error('Error sending verification approval email:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 3. Verification Revision / Rejection Email
 */
export async function sendVerificationRejectedEmail({
  to,
  fullName,
  businessName,
  docType,
  reason,
}: {
  to: string;
  fullName: string;
  businessName: string;
  docType: string;
  reason: string;
}) {
  if (!resend) return { success: false, error: 'Resend not configured' };

  try {
    const html = emailLayout({
      title: 'Verification Update Needed',
      preheader: `Action required for your ${docType.toUpperCase()} document on ${businessName}.`,
      contentHtml: `
        <h2 style="font-size:18px;font-weight:700;color:#0f172a;margin-top:0;">Hello, ${fullName}</h2>
        <p style="font-size:14px;line-height:1.6;color:#334155;">
          Our District Moderators reviewed your <strong>${docType.toUpperCase()}</strong> verification submission for <strong>${businessName}</strong>.
        </p>
        <div style="background-color:#fff1f2;border:1px solid #fecdd3;border-radius:12px;padding:16px;margin:20px 0;">
          <strong style="color:#9f1239;font-size:13px;display:block;margin-bottom:4px;">Moderator Feedback / Reason:</strong>
          <p style="margin:0;font-size:14px;color:#881337;">${reason}</p>
        </div>
        <p style="font-size:14px;line-height:1.6;color:#334155;">
          Please re-upload a clear and valid document via your owner workspace.
        </p>
        <div style="margin:24px 0;text-align:center;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/business-dashboard/verification" style="display:inline-block;background-color:#D41367;color:#ffffff;font-size:14px;font-weight:700;padding:12px 28px;border-radius:10px;text-decoration:none;">
            Re-Upload Document
          </a>
        </div>
      `,
    });

    const data = await resend.emails.send({
      from: fromEmail,
      to,
      subject: `Verification Action Required: ${businessName}`,
      html,
    });

    return { success: true, data };
  } catch (error: any) {
    console.error('Error sending verification rejected email:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 4. New Customer Enquiry Notification Email
 */
export async function sendNewEnquiryEmail({
  to,
  ownerName,
  businessName,
  fromName,
  fromContact,
  fromOrganization,
  serviceRequested,
  message,
}: {
  to: string;
  ownerName: string;
  businessName: string;
  fromName: string;
  fromContact: string;
  fromOrganization?: string;
  serviceRequested?: string;
  message: string;
}) {
  if (!resend) return { success: false, error: 'Resend not configured' };

  try {
    const html = emailLayout({
      title: 'New Business Lead Received',
      preheader: `You received a new inquiry from ${fromName} for ${businessName}.`,
      contentHtml: `
        <h2 style="font-size:18px;font-weight:700;color:#0f172a;margin-top:0;">Hello, ${ownerName}</h2>
        <p style="font-size:14px;line-height:1.6;color:#334155;">
          You have received a new business lead on <strong>${businessName}</strong> through the Rotaract Business Network:
        </p>
        <div style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:18px;margin:20px 0;font-size:13px;color:#334155;line-height:1.8;">
          <div><strong>Sender Name:</strong> ${fromName}</div>
          <div><strong>Contact Email/Phone:</strong> <a href="mailto:${fromContact}" style="color:#D41367;">${fromContact}</a></div>
          ${fromOrganization ? `<div><strong>Organization / Club:</strong> ${fromOrganization}</div>` : ''}
          ${serviceRequested ? `<div><strong>Service Requested:</strong> ${serviceRequested}</div>` : ''}
          <div style="margin-top:10px;padding-top:10px;border-top:1px solid #e2e8f0;">
            <strong>Message:</strong>
            <p style="margin:4px 0 0 0;font-style:italic;color:#475569;">"${message}"</p>
          </div>
        </div>
        <div style="margin:24px 0;text-align:center;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/business-dashboard/enquiries" style="display:inline-block;background-color:#D41367;color:#ffffff;font-size:14px;font-weight:700;padding:12px 28px;border-radius:10px;text-decoration:none;">
            View in Enquiries Inbox
          </a>
        </div>
      `,
    });

    const data = await resend.emails.send({
      from: fromEmail,
      to,
      subject: `New Lead on ${businessName} from ${fromName}`,
      html,
    });

    return { success: true, data };
  } catch (error: any) {
    console.error('Error sending enquiry email:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 5. District Moderator Appointment Notification Email
 */
export async function sendModeratorAppointmentEmail({
  to,
  fullName,
  districtNumber,
  isNewAccount,
  temporaryPassword,
}: {
  to: string;
  fullName: string;
  districtNumber: number;
  isNewAccount: boolean;
  temporaryPassword?: string;
}) {
  if (!resend) return { success: false, error: 'Resend not configured' };

  try {
    const html = emailLayout({
      title: 'District Moderator Appointment',
      preheader: `You have been appointed as District Moderator for District ${districtNumber}.`,
      contentHtml: `
        <h2 style="font-size:18px;font-weight:700;color:#0f172a;margin-top:0;">Congratulations, ${fullName}!</h2>
        <p style="font-size:14px;line-height:1.6;color:#334155;">
          You have been officially appointed as a <strong>District Moderator</strong> for <strong>District ${districtNumber}</strong> on the Rotaract Business Network platform.
        </p>
        
        <div style="background-color:#fdf2f8;border:1px solid #fbcfe8;border-radius:12px;padding:18px;margin:20px 0;font-size:13px;color:#334155;line-height:1.8;">
          <div><strong>Appointed Role:</strong> District Moderator</div>
          <div><strong>Assigned Jurisdiction:</strong> District ${districtNumber}</div>
          ${
            isNewAccount && temporaryPassword
              ? `
            <div style="margin-top:10px;padding-top:10px;border-top:1px solid #fbcfe8;">
              <strong>Your Temporary Login Credentials:</strong>
              <div style="margin-top:4px;">Email: <strong>${to}</strong></div>
              <div>Temporary Password: <code style="background-color:#ffffff;padding:2px 6px;border-radius:4px;border:1px solid #fbcfe8;font-family:monospace;font-size:13px;font-weight:bold;color:#D41367;">${temporaryPassword}</code></div>
              <p style="margin:6px 0 0 0;font-size:12px;color:#64748b;">(Please update your password after your initial sign-in via settings).</p>
            </div>
          `
              : `
            <div style="margin-top:10px;padding-top:10px;border-top:1px solid #fbcfe8;">
              <p style="margin:0;font-size:13px;color:#334155;">You can sign in using your existing account credentials.</p>
            </div>
          `
          }
        </div>

        <p style="font-size:14px;line-height:1.6;color:#334155;">
          As a moderator, you can now audit verification document submissions, award Trust Badges, and ensure listing compliance for enterprises in your district.
        </p>

        <div style="margin:24px 0;text-align:center;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/moderator-dashboard" style="display:inline-block;background-color:#D41367;color:#ffffff;font-size:14px;font-weight:700;padding:12px 28px;border-radius:10px;text-decoration:none;">
            Access Moderator Portal
          </a>
        </div>
      `,
    });

    const data = await resend.emails.send({
      from: fromEmail,
      to,
      subject: `Appointed as District Moderator (District ${districtNumber}) — Rotaract Business Network`,
      html,
    });

    return { success: true, data };
  } catch (error: any) {
    console.error('Error sending moderator appointment email:', error);
    return { success: false, error: error.message };
  }
}
