// src/hooks/useSEO.ts
import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogType?: string;
  ogImage?: string;
}

export function useSEO({ title, description, keywords, ogType = "website", ogImage }: SEOProps) {
  useEffect(() => {
    // 1. Update document title
    document.title = `${title} | Ubuntu Business Builders`;

    // 2. Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);

    // 3. Update or create meta keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute("content", keywords);
    }

    // 4. Open Graph meta tags (og:title, og:description, og:type, og:image)
    const ogTags = [
      { property: "og:title", content: `${title} | Ubuntu Business Builders` },
      { property: "og:description", content: description },
      { property: "og:type", content: ogType },
    ];

    if (ogImage) {
      ogTags.push({ property: "og:image", content: ogImage });
    }

    ogTags.forEach(({ property, content }) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`);
      if (!metaTag) {
        metaTag = document.createElement("meta");
        metaTag.setAttribute("property", property);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute("content", content);
    });
  }, [title, description, keywords, ogType, ogImage]);
}
