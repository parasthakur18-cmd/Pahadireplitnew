import { useEffect } from 'react';

interface SEOMetaProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  schemaMarkup?: object;
}

export function useSEOMeta({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  schemaMarkup
}: SEOMetaProps) {
  useEffect(() => {
    // Set title
    document.title = title;

    // Remove old SEO meta tags
    const existingMeta = document.querySelectorAll('meta[data-seo="true"]');
    const existingSchemas = document.querySelectorAll('script[data-seo-schema="true"]');
    existingMeta.forEach(tag => tag.remove());
    existingSchemas.forEach(tag => tag.remove());

    // Add meta description
    const descMeta = document.createElement('meta');
    descMeta.name = 'description';
    descMeta.content = description;
    descMeta.setAttribute('data-seo', 'true');
    document.head.appendChild(descMeta);

    // Add keywords if provided
    if (keywords) {
      const keywordsMeta = document.createElement('meta');
      keywordsMeta.name = 'keywords';
      keywordsMeta.content = keywords;
      keywordsMeta.setAttribute('data-seo', 'true');
      document.head.appendChild(keywordsMeta);
    }

    // Add Open Graph tags
    const ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.content = title;
    ogTitle.setAttribute('data-seo', 'true');
    document.head.appendChild(ogTitle);

    const ogDesc = document.createElement('meta');
    ogDesc.setAttribute('property', 'og:description');
    ogDesc.content = description;
    ogDesc.setAttribute('data-seo', 'true');
    document.head.appendChild(ogDesc);

    const ogType = document.createElement('meta');
    ogType.setAttribute('property', 'og:type');
    ogType.content = type;
    ogType.setAttribute('data-seo', 'true');
    document.head.appendChild(ogType);

    if (image) {
      const ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      ogImage.content = image;
      ogImage.setAttribute('data-seo', 'true');
      document.head.appendChild(ogImage);
    }

    if (url) {
      const ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      ogUrl.content = url;
      ogUrl.setAttribute('data-seo', 'true');
      document.head.appendChild(ogUrl);
    }

    // Add canonical tag
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = url || window.location.href;
    canonical.setAttribute('data-seo', 'true');
    document.head.appendChild(canonical);

    // Add schema markup if provided
    if (schemaMarkup) {
      const schema = document.createElement('script');
      schema.type = 'application/ld+json';
      schema.setAttribute('data-seo-schema', 'true');
      schema.textContent = JSON.stringify(schemaMarkup);
      document.head.appendChild(schema);
    }
  }, [title, description, keywords, image, url, type, schemaMarkup]);
}
