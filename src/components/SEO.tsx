import { Helmet } from 'react-helmet-async';

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
  title = "Samatta Foundation - Empowering Youth Through Sports",
  description = "The Samatta Foundation, founded by Mbwana Ally Samatta, transforms lives through sports, education, and community development in Tanzania. Join us in making a difference.",
  keywords = "Samatta Foundation, Tanzania, youth development, sports development, education, community development, Mbwana Samatta, football, charity, nonprofit, Tanzanian foundation, sports charity, youth empowerment, Dar es Salaam",
  image = "/samatta-logo.png",
  url = "https://www.samattafoundation.org",
  type = "website",
  author = "Samatta Foundation",
  publishedTime,
}: SEOProps) => {
  const siteUrl = "https://www.samattafoundation.org";
  const fullUrl = url.startsWith('http') ? url : `${siteUrl}${url}`;
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

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
      <meta property="og:site_name" content="Samatta Foundation" />
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
      <meta name="twitter:creator" content="@SamattaFoundation" />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="language" content="English" />
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
          "url": siteUrl,
          "logo": `${siteUrl}/samatta-logo.png`,
          "image": `${siteUrl}/samatta-logo.png`,
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
            "email": "info@samattafoundation.org",
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
          "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": siteUrl
          }]
        })}
      </script>
      
      {/* WebSite Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Samatta Foundation",
          "url": siteUrl,
          "description": description,
          "inLanguage": "en-US",
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${siteUrl}/blog?search={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;

