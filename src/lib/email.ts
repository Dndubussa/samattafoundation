/**
 * Email Service Integration
 * Handles sending emails via SendGrid or backend service
 * 
 * Environment variables required:
 * VITE_SENDGRID_API_KEY (or configure on backend)
 * VITE_APP_NAME
 * VITE_SENDER_EMAIL
 */

export interface EmailPayload {
  to: string;
  subject: string;
  template?: string;
  data?: Record<string, unknown>;
  html?: string;
  text?: string;
}

export interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Send email via backend API (recommended for security)
 */
export async function sendEmail(payload: EmailPayload): Promise<EmailResponse> {
  try {
    const response = await fetch('/api/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        error: error.message || 'Failed to send email',
      };
    }

    const data = await response.json();
    return {
      success: true,
      messageId: data.messageId,
    };
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    };
  }
}

/**
 * Send contact form confirmation email
 */
export async function sendContactConfirmation(
  name: string,
  email: string,
  subject: string
): Promise<EmailResponse> {
  return sendEmail({
    to: email,
    subject: 'We received your message - Samatta Foundation',
    template: 'contact-confirmation',
    data: {
      name,
      subject,
      supportEmail: 'support@samattafoundation.org',
    },
  });
}

/**
 * Send donation confirmation email
 */
export async function sendDonationConfirmation(
  email: string,
  amount: number,
  currency: string,
  donorName?: string
): Promise<EmailResponse> {
  return sendEmail({
    to: email,
    subject: 'Thank you for your donation - Samatta Foundation',
    template: 'donation-confirmation',
    data: {
      donorName,
      amount,
      currency,
      impactStatement: 'Your donation will help us empower young Tanzanians through sports and education.',
      taxDeductible: 'Your donation may be tax-deductible. Please check with your local tax authority.',
    },
  });
}

/**
 * Send volunteer signup confirmation
 */
export async function sendVolunteerConfirmation(
  email: string,
  name: string
): Promise<EmailResponse> {
  return sendEmail({
    to: email,
    subject: 'Welcome to Samatta Foundation Volunteers!',
    template: 'volunteer-confirmation',
    data: {
      name,
      nextSteps: 'We will review your application and contact you within 5 business days.',
    },
  });
}

/**
 * Send newsletter subscription confirmation
 */
export async function sendNewsletterConfirmation(
  email: string,
  name?: string
): Promise<EmailResponse> {
  return sendEmail({
    to: email,
    subject: 'Newsletter Subscription Confirmed - Samatta Foundation',
    template: 'newsletter-confirmation',
    data: {
      name,
      unsubscribeLink: `${window.location.origin}/unsubscribe?email=${encodeURIComponent(email)}`,
    },
  });
}

/**
 * Send program application confirmation
 */
export async function sendApplicationConfirmation(
  email: string,
  applicantName: string,
  programName: string
): Promise<EmailResponse> {
  return sendEmail({
    to: email,
    subject: `Application Received - ${programName} - Samatta Foundation`,
    template: 'application-confirmation',
    data: {
      applicantName,
      programName,
      nextSteps: 'We will review your application and contact you within 7 business days.',
    },
  });
}

/**
 * Send admin notification of new submission
 */
export async function sendAdminNotification(
  type: 'contact' | 'donation' | 'volunteer' | 'application',
  data: Record<string, unknown>,
  adminEmail: string
): Promise<EmailResponse> {
  const subjectMap = {
    contact: 'New Contact Form Submission',
    donation: 'New Donation Received',
    volunteer: 'New Volunteer Registration',
    application: 'New Program Application',
  };

  return sendEmail({
    to: adminEmail,
    subject: `[ACTION NEEDED] ${subjectMap[type]}`,
    template: `admin-notification-${type}`,
    data: {
      ...data,
      dashboardLink: `${window.location.origin}/admin/submissions`,
    },
  });
}

/**
 * Send bulk newsletter
 */
export async function sendBulkNewsletter(
  subject: string,
  template: string,
  data: Record<string, unknown>,
  recipientList: string[]
): Promise<EmailResponse> {
  try {
    const response = await fetch('/api/email/bulk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject,
        template,
        data,
        recipients: recipientList,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        error: error.message || 'Failed to send bulk email',
      };
    }

    const result = await response.json();
    return {
      success: true,
      messageId: result.batchId,
    };
  } catch (error) {
    console.error('Bulk email error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send bulk email',
    };
  }
}

/**
 * Alias for sendVolunteerConfirmation
 */
export const sendVolunteerWelcome = sendVolunteerConfirmation;

export default {
  sendEmail,
  sendContactConfirmation,
  sendDonationConfirmation,
  sendVolunteerConfirmation,
  sendVolunteerWelcome,
  sendNewsletterConfirmation,
  sendApplicationConfirmation,
  sendAdminNotification,
  sendBulkNewsletter,
};
