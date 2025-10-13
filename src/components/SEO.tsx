import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = "Armaan's Tech Tips - Gaming Hub, Utilities & PC Optimization",
  description = "Your ultimate tech hub featuring unblocked games, free utilities, PC optimization guides, and educational resources. Password generator, QR codes, color picker, and more tools for students.",
  keywords = "tech tips, unblocked games, pc optimization, utilities, password generator, qr code generator, color picker, text converter, gaming hub, student tools, free utilities, windows optimization, tech guides, educational resources, computer tips, gaming tips",
  ogImage = "/placeholder.svg",
  canonical
}) => {
  const location = useLocation();
  const baseUrl = window.location.origin;
  const fullUrl = canonical || `${baseUrl}${location.pathname}`;

  useEffect(() => {
    // Update title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Standard meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'Armaan');
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:url', fullUrl, true);
    updateMetaTag('og:image', `${baseUrl}${ogImage}`, true);
    updateMetaTag('og:site_name', "Armaan's Tech Tips", true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', `${baseUrl}${ogImage}`);

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullUrl);

    // Add structured data for website
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": `${baseUrl}/#website`,
          "url": baseUrl,
          "name": "Armaan's Tech Tips",
          "description": description,
          "publisher": {
            "@id": `${baseUrl}/#organization`
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${baseUrl}/?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@type": "Organization",
          "@id": `${baseUrl}/#organization`,
          "name": "Armaan's Tech Tips",
          "url": baseUrl,
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/placeholder.svg`
          },
          "sameAs": [
            "https://github.com/Subset28/Armaan-Tech-Tips"
          ]
        },
        {
          "@type": "WebPage",
          "@id": fullUrl,
          "url": fullUrl,
          "name": title,
          "isPartOf": {
            "@id": `${baseUrl}/#website`
          },
          "description": description,
          "breadcrumb": {
            "@id": `${fullUrl}#breadcrumb`
          }
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${fullUrl}#breadcrumb`,
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": baseUrl
            }
          ]
        }
      ]
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);

  }, [title, description, keywords, ogImage, fullUrl, baseUrl]);

  return null;
};
