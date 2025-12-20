/**
 * Social Media Configuration
 * Centralized social media handles and URLs
 */

export const socialMedia = {
  facebook: {
    handle: '@samattafoundation',
    url: 'https://facebook.com/samattafoundation',
    icon: 'facebook',
  },
  instagram: {
    handle: '@samattafoundation',
    url: 'https://instagram.com/samattafoundation',
    icon: 'instagram',
  },
  twitter: {
    handle: '@samattafoundation',
    url: 'https://twitter.com/samattafoundation',
    icon: 'twitter',
  },
  linkedin: {
    handle: 'samatta-foundation',
    url: 'https://linkedin.com/company/samatta-foundation',
    icon: 'linkedin',
  },
  youtube: {
    handle: '@samattafoundation',
    url: 'https://youtube.com/@samattafoundation',
    icon: 'youtube',
  },
  tiktok: {
    handle: '@samattafoundation',
    url: 'https://tiktok.com/@samattafoundation',
    icon: 'tiktok',
  },
  whatsapp: {
    handle: '+255 XXX XXX XXX', // To be updated
    url: 'https://wa.me/255XXXXXXXXX',
    icon: 'whatsapp',
  },
  email: {
    address: 'contact@samattafoundation.org',
    url: 'mailto:contact@samattafoundation.org',
    icon: 'mail',
  },
  phone: {
    number: '+255 XXX XXX XXX', // To be updated
    url: 'tel:+255XXXXXXXXX',
    icon: 'phone',
  },
};

/**
 * Get share URL for different platforms
 */
export function getShareUrl(
  platform: 'facebook' | 'twitter' | 'linkedin' | 'whatsapp',
  text: string,
  url?: string
): string {
  const pageUrl = url || window.location.href;
  
  switch (platform) {
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
    case 'twitter':
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(pageUrl)}`;
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;
    case 'whatsapp':
      return `https://wa.me/?text=${encodeURIComponent(`${text} ${pageUrl}`)}`;
    default:
      return pageUrl;
  }
}

/**
 * Track social media click
 */
export function trackSocialClick(platform: string) {
  if (window.gtag) {
    window.gtag('event', 'social_click', {
      event_category: 'engagement',
      event_label: platform,
    });
  }
}

/**
 * Open social media link
 */
export function openSocialMedia(platform: keyof typeof socialMedia) {
  const media = socialMedia[platform];
  if (media.url) {
    trackSocialClick(platform);
    window.open(media.url, '_blank', 'noopener,noreferrer');
  }
}

export default socialMedia;
