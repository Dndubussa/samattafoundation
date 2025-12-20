/**
 * ClickPesa Payment Integration
 * Handles payment processing for donations
 * 
 * ClickPesa: Tanzania-based payment processor
 * Supports: M-Pesa, Card, Bank transfers, etc.
 */

// Environment variables required:
// VITE_CLICKPESA_API_KEY
// VITE_CLICKPESA_PUBLIC_KEY
// VITE_CLICKPESA_MERCHANT_ID

const CLICKPESA_API_URL = 'https://api.clickpesa.com/v1';
const merchantId = import.meta.env.VITE_CLICKPESA_MERCHANT_ID;
const apiKey = import.meta.env.VITE_CLICKPESA_API_KEY;

if (!merchantId || !apiKey) {
  console.warn('ClickPesa credentials not configured. Payment processing disabled.');
}

export interface PaymentRequest {
  amount: number;
  currency: string;
  email: string;
  phone?: string;
  description: string;
  metadata: {
    donor_name?: string;
    campaign: string;
    donation_id?: string;
  };
  return_url?: string;
  webhook_url?: string;
}

export interface PaymentResponse {
  status: 'success' | 'error';
  transaction_id?: string;
  payment_url?: string;
  message: string;
}

/**
 * Initialize ClickPesa payment
 * Redirects user to payment page
 */
export async function initiateClickPesaPayment(
  request: PaymentRequest
): Promise<PaymentResponse> {
  try {
    if (!merchantId || !apiKey) {
      throw new Error('ClickPesa is not configured. Please add VITE_CLICKPESA_* to environment variables.');
    }

    // Prepare request for ClickPesa API
    const payload = {
      merchant_id: merchantId,
      amount: request.amount,
      currency: request.currency || 'TZS',
      email: request.email,
      phone: request.phone,
      reference: `donation-${Date.now()}`,
      description: request.description,
      webhook_url: request.webhook_url || `${window.location.origin}/api/webhooks/clickpesa`,
      return_url: request.return_url || `${window.location.origin}/donate?status=pending`,
      metadata: JSON.stringify(request.metadata),
    };

    // Call backend to create payment (for security)
    const response = await fetch('/api/payments/clickpesa/initiate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to initiate payment');
    }

    const data = await response.json();

    if (data.payment_url) {
      // Redirect to ClickPesa payment page
      window.location.href = data.payment_url;
      return {
        status: 'success',
        payment_url: data.payment_url,
        transaction_id: data.transaction_id,
        message: 'Redirecting to payment gateway...',
      };
    }

    return {
      status: 'error',
      message: 'Failed to generate payment URL',
    };
  } catch (error) {
    console.error('ClickPesa payment error:', error);
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Payment processing failed',
    };
  }
}

/**
 * Verify ClickPesa payment status
 * Called after user returns from payment gateway
 */
export async function verifyClickPesaPayment(
  transactionId: string
): Promise<{ status: string; message: string }> {
  try {
    const response = await fetch('/api/payments/clickpesa/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ transaction_id: transactionId }),
    });

    if (!response.ok) {
      throw new Error('Failed to verify payment');
    }

    return await response.json();
  } catch (error) {
    console.error('Payment verification error:', error);
    return {
      status: 'error',
      message: 'Failed to verify payment status',
    };
  }
}

/**
 * Get payment history
 */
export async function getPaymentHistory(
  email: string,
  limit = 10
): Promise<any[]> {
  try {
    const response = await fetch(
      `/api/payments/history?email=${encodeURIComponent(email)}&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch payment history');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching payment history:', error);
    return [];
  }
}

export default {
  initiateClickPesaPayment,
  verifyClickPesaPayment,
  getPaymentHistory,
};
