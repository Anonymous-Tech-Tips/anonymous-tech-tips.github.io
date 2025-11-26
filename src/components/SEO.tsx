import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { canonical } from '@/lib/paths';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  gameData?: {
    name: string;
    genre: string[];
    url: string;
    image?: string;
  };
}

export const SEO: React.FC<SEOProps> = ({
  title = "Tech Tips - Best Unblocked Games Hub | Free Gaming Site 2025",
  description = "🎮 #1 Unblocked Games Site! Play 100+ free games instantly - no downloads needed. Featuring popular titles, utility tools, PC optimization guides & exclusive gaming content. Start playing now!",
  keywords = "unblocked games, free online games, school games unblocked, gaming hub 2025, play games online free, best unblocked games site, no download games, browser games, student games, retro bowl unblocked, slope unblocked, gaming website, pc optimization, tech utilities, password generator, qr code generator, gaming tips, tech tips, free utilities, windows optimization, gaming guides, educational games, study tools, tech hub, game collection, instant play games, web games, casual games, addictive games",
  ogImage = "/placeholder.svg",
  canonical: canonicalOverride,
  gameData
}) => {
  const location = useLocation();
  const baseUrl = window.location.origin;

  // Use provided canonical or generate hash-based URL for HashRouter
  const canonicalUrl = canonicalOverride || canonical(`${location.pathname}${location.search}`);

  useEffect(() => {
    // Update title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement | null;

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
    updateMetaTag('author', 'Tech Tips');
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('googlebot', 'index, follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:url', canonicalUrl, true);
    updateMetaTag('og:image', `${baseUrl}${ogImage}`, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:image:alt', title, true);
    updateMetaTag('og:site_name', "Tech Tips", true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', `${baseUrl}${ogImage}`);
    updateMetaTag('twitter:image:alt', title);

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Add structured data for website
    const structuredDataGraph: any[] = [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": "Tech Tips",
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
        "name": "Tech Tips",
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/og-banner.png`
        }
      },
      {
        "@type": "WebPage",
        "@id": canonicalUrl,
        "url": canonicalUrl,
        "name": title,
        "isPartOf": {
          "@id": `${baseUrl}/#website`
        },
        "description": description,
        "breadcrumb": {
          "@id": `${canonicalUrl}#breadcrumb`
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": baseUrl
          }
        ]
      }
    ];

    // Add VideoGame schema if game data is provided
    if (gameData) {
      structuredDataGraph.push({
        "@type": "VideoGame",
        "@id": canonicalUrl,
        "name": gameData.name,
        "url": canonicalUrl,
        "genre": gameData.genre,
        "author": {
          "@type": "Organization",
          "name": "Tech Tips"
        },
        "applicationCategory": "Game",
        "operatingSystem": "Web Browser",
        "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
        "image": gameData.image ? `${baseUrl}${gameData.image}` : `${baseUrl}${ogImage}`,
        "publisher": {
          "@id": `${baseUrl}/#organization`
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        }
      });
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@graph": structuredDataGraph
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);

  }, [title, description, keywords, ogImage, canonicalUrl, baseUrl, gameData]);

  return null;
};
