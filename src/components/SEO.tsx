import { Helmet } from "react-helmet-async";
import { DEFAULT_SEO, SITE_NAME, SITE_URL, CONTACT_EMAIL, TWITTER_HANDLE } from "@/lib/constants/site";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
}

const SEO = ({
  title = DEFAULT_SEO.title,
  description = DEFAULT_SEO.description,
  keywords = DEFAULT_SEO.keywords,
  image = DEFAULT_SEO.image,
  url = SITE_URL,
  type = "website",
  author = SITE_NAME,
  publishedTime,
}: SEOProps) => {
  const fullUrl = url.startsWith("http") ? url : `${SITE_URL}${url}`;
  const fullImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      <link rel="alternate" href={fullUrl} hreflang="en" />
      <link rel="alternate" href={fullUrl} hreflang="x-default" />
      
      {/* Manifest */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:alt" content={`${SITE_NAME} logo`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      
      {publishedTime && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          <meta property="article:author" content={author} />
        </>
      )}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImage} />
      <meta property="twitter:image:alt" content={`${SITE_NAME} logo`} />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="language" content="English" />
      <meta httpEquiv="content-language" content="en" />
      <meta name="revisit-after" content="7 days" />
      <meta name="theme-color" content="#1e2f5e" />
      <meta name="rating" content="General" />
      <meta name="distribution" content="Global" />
      <meta name="coverage" content="Worldwide" />
      <meta name="target" content="all" />
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Samatta Foundation" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Geographic Tags */}
      <meta name="geo.region" content="TZ" />
      <meta name="geo.placename" content="Dar es Salaam" />
      <meta name="geo.position" content="-6.7924;39.2083" />
      <meta name="ICBM" content="-6.7924, 39.2083" />
      
      {/* Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NGO",
          "name": "Samatta Foundation",
          "alternateName": "The Samatta Foundation",
          "url": SITE_URL,
          "logo": `${SITE_URL}/favicon.png`,
          "image": `${SITE_URL}/favicon.png`,
          "description": description,
          "slogan": "Empowering Youth Through Sports",
          "founder": {
            "@type": "Person",
            "name": "Mbwana Ally Samatta",
            "jobTitle": "Founder",
            "description": "Professional Tanzanian footballer and philanthropist"
          },
          "foundingDate": "2020",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Dar es Salaam",
            "addressRegion": "Dar es Salaam",
            "addressCountry": "TZ"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "-6.7924",
            "longitude": "39.2083"
          },
          "areaServed": {
            "@type": "Country",
            "name": "Tanzania"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "email": CONTACT_EMAIL,
            "contactType": "General Inquiries",
            "availableLanguage": ["English", "Swahili"]
          },
          "sameAs": [
            "https://facebook.com/samattafoundation",
            "https://twitter.com/samattafoundation",
            "https://instagram.com/samattafoundation",
            "https://youtube.com/@samattafoundation"
          ],
          "keywords": keywords,
          "nonprofitStatus": "Nonprofit",
          "seeks": {
            "@type": "Thing",
            "name": "Youth Empowerment, Sports Development, Education Support"
          }
        })}
      </script>
      
      {/* BreadcrumbList Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
            { "@type": "ListItem", "position": 2, "name": "About", "item": `${SITE_URL}/about` },
            { "@type": "ListItem", "position": 3, "name": "Programs", "item": `${SITE_URL}/programs` },
            { "@type": "ListItem", "position": 4, "name": "Blog", "item": `${SITE_URL}/blog` },
            { "@type": "ListItem", "position": 5, "name": "Donate", "item": `${SITE_URL}/donate` },
            { "@type": "ListItem", "position": 6, "name": "Contact", "item": `${SITE_URL}/contact` }
          ]
        })}
      </script>
      
      {/* WebSite Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Samatta Foundation",
          "url": SITE_URL,
          "description": description,
          "inLanguage": "en-US",
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${SITE_URL}/blog?search={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;

