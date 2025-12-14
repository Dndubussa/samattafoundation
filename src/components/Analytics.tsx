import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics tracking
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const Analytics = () => {
  const location = useLocation();
  const gaTrackingId = import.meta.env.VITE_GA_TRACKING_ID;

  useEffect(() => {
    // Only track if GA tracking ID is provided
    if (!gaTrackingId || !window.gtag) return;

    // Track page views
    window.gtag('config', gaTrackingId, {
      page_path: location.pathname + location.search,
    });
  }, [location, gaTrackingId]);

  // Load Google Analytics script
  useEffect(() => {
    if (!gaTrackingId) return;

    // Check if script already exists
    if (document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`)) {
      return;
    }

    // Create and append GA script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`;
    document.head.appendChild(script);

    // Initialize GA
    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer?.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', gaTrackingId);
      window.gtag = gtag;
    };
  }, [gaTrackingId]);

  return null; // This component doesn't render anything
};

// Event tracking utility function
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Common events
export const trackDonation = (amount: number, currency: string) => {
  trackEvent('donate', 'engagement', `${amount} ${currency}`, amount);
};

export const trackVolunteerSignup = () => {
  trackEvent('volunteer_signup', 'engagement', 'Volunteer Registration');
};

export const trackProgramApplication = (programName: string) => {
  trackEvent('program_application', 'engagement', programName);
};

export const trackNewsletterSubscription = () => {
  trackEvent('newsletter_subscribe', 'engagement', 'Newsletter');
};

export const trackContactFormSubmission = () => {
  trackEvent('contact_form_submit', 'engagement', 'Contact Form');
};

export default Analytics;

