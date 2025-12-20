import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics tracking with proper typing
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

const Analytics = () => {
  const location = useLocation();
  const gaTrackingId = import.meta.env.VITE_GA_TRACKING_ID;

  // Track page views on route changes
  useEffect(() => {
    // Only track if GA tracking ID is provided
    if (!gaTrackingId || !window.gtag) return;

    try {
      // Track page views
      window.gtag('config', gaTrackingId, {
        page_path: location.pathname + location.search,
      });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error tracking page view:', error);
      }
    }
  }, [location, gaTrackingId]);

  // Load Google Analytics script
  useEffect(() => {
    if (!gaTrackingId) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Google Analytics tracking ID is not configured. Set VITE_GA_TRACKING_ID environment variable.');
      }
      return;
    }

    try {
      // Check if script already exists
      if (document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`)) {
        return;
      }

      // Create and append GA script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`;
      
      // Handle script load success
      script.onload = () => {
        try {
          window.dataLayer = window.dataLayer || [];
          function gtag(...args: any[]) {
            window.dataLayer?.push(arguments);
          }
          gtag('js', new Date());
          gtag('config', gaTrackingId);
          window.gtag = gtag;
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            console.error('Error initializing Google Analytics:', error);
          }
        }
      };

      // Handle script load error
      script.onerror = () => {
        if (process.env.NODE_ENV === 'development') {
          console.error('Failed to load Google Analytics script');
        }
      };

      document.head.appendChild(script);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error loading Google Analytics:', error);
      }
    }
  }, [gaTrackingId]);

  return null; // This component doesn't render anything
};

// Event tracking utility function with error handling
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  try {
    if (window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`Error tracking event "${action}":`, error);
    }
  }
};

// Common events - optimized
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

