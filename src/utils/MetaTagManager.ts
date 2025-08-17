/**
 * Dynamic meta tag management utility for runtime SEO updates
 * Handles meta tag creation, updates, and cleanup for SPA routing
 */

export interface MetaTagConfig {
  name?: string;
  property?: string;
  content: string;
  httpEquiv?: string;
}

export interface LinkTagConfig {
  rel: string;
  href: string;
  type?: string;
  sizes?: string;
  media?: string;
}

class MetaTagManager {
  private managedTags = new Set<Element>();

  /**
   * Set or update a meta tag
   */
  setMetaTag(config: MetaTagConfig): HTMLMetaElement {
    const { name, property, content, httpEquiv } = config;
    
    // Build selector based on available attributes
    let selector = 'meta';
    if (name) selector += `[name="${name}"]`;
    if (property) selector += `[property="${property}"]`;
    if (httpEquiv) selector += `[http-equiv="${httpEquiv}"]`;

    // Find or create the meta tag
    let meta = document.querySelector(selector) as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement('meta');
      if (name) meta.setAttribute('name', name);
      if (property) meta.setAttribute('property', property);
      if (httpEquiv) meta.setAttribute('http-equiv', httpEquiv);
      document.head.appendChild(meta);
    }

    meta.setAttribute('content', content);
    this.managedTags.add(meta);
    return meta;
  }

  /**
   * Set or update a link tag
   */
  setLinkTag(config: LinkTagConfig): HTMLLinkElement {
    const { rel, href, type, sizes, media } = config;
    
    // Build selector for link tag
    let selector = `link[rel="${rel}"]`;
    if (type) selector += `[type="${type}"]`;
    if (sizes) selector += `[sizes="${sizes}"]`;
    if (media) selector += `[media="${media}"]`;

    // Find or create the link tag
    let link = document.querySelector(selector) as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = rel;
      if (type) link.type = type;
      if (sizes) link.setAttribute('sizes', sizes);
      if (media) link.media = media;
      document.head.appendChild(link);
    }

    link.href = href;
    this.managedTags.add(link);
    return link;
  }

  /**
   * Update Open Graph meta tags
   */
  setOpenGraphTags(data: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
    siteName?: string;
    locale?: string;
  }) {
    const { title, description, image, url, type, siteName, locale } = data;

    if (title) this.setMetaTag({ property: 'og:title', content: title });
    if (description) this.setMetaTag({ property: 'og:description', content: description });
    if (image) this.setMetaTag({ property: 'og:image', content: image });
    if (url) this.setMetaTag({ property: 'og:url', content: url });
    if (type) this.setMetaTag({ property: 'og:type', content: type });
    if (siteName) this.setMetaTag({ property: 'og:site_name', content: siteName });
    if (locale) this.setMetaTag({ property: 'og:locale', content: locale });
  }

  /**
   * Update Twitter Card meta tags
   */
  setTwitterCardTags(data: {
    card?: string;
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    creator?: string;
    site?: string;
  }) {
    const { card, title, description, image, url, creator, site } = data;

    if (card) this.setMetaTag({ name: 'twitter:card', content: card });
    if (title) this.setMetaTag({ name: 'twitter:title', content: title });
    if (description) this.setMetaTag({ name: 'twitter:description', content: description });
    if (image) this.setMetaTag({ name: 'twitter:image', content: image });
    if (url) this.setMetaTag({ name: 'twitter:url', content: url });
    if (creator) this.setMetaTag({ name: 'twitter:creator', content: creator });
    if (site) this.setMetaTag({ name: 'twitter:site', content: site });
  }

  /**
   * Set basic SEO meta tags
   */
  setBasicSEOTags(data: {
    title?: string;
    description?: string;
    keywords?: string;
    author?: string;
    canonical?: string;
    robots?: string;
  }) {
    const { title, description, keywords, author, canonical, robots } = data;

    if (title) document.title = title;
    if (description) this.setMetaTag({ name: 'description', content: description });
    if (keywords) this.setMetaTag({ name: 'keywords', content: keywords });
    if (author) this.setMetaTag({ name: 'author', content: author });
    if (robots) this.setMetaTag({ name: 'robots', content: robots });
    if (canonical) this.setLinkTag({ rel: 'canonical', href: canonical });
  }

  /**
   * Add structured data (JSON-LD)
   */
  addStructuredData(data: any, id?: string): HTMLScriptElement {
    // Remove existing structured data with same ID
    if (id) {
      const existing = document.querySelector(`script[type="application/ld+json"][data-id="${id}"]`);
      if (existing) existing.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    if (id) script.setAttribute('data-id', id);
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
    this.managedTags.add(script);
    return script;
  }

  /**
   * Set comprehensive page SEO data
   */
  setPageSEO(data: {
    title: string;
    description: string;
    canonical?: string;
    keywords?: string;
    author?: string;
    ogImage?: string;
    noIndex?: boolean;
    structuredData?: any;
  }) {
    const {
      title,
      description,
      canonical,
      keywords,
      author,
      ogImage,
      noIndex,
      structuredData
    } = data;

    const siteName = "Smart RV Technology Hub";
    const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
    const currentUrl = canonical || window.location.href;
    const fullImageUrl = ogImage?.startsWith('http') ? ogImage : `${window.location.origin}${ogImage || '/og-image.svg'}`;

    // Basic SEO tags
    this.setBasicSEOTags({
      title: fullTitle,
      description,
      keywords,
      author: author || siteName,
      canonical: currentUrl,
      robots: noIndex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large'
    });

    // Open Graph tags
    this.setOpenGraphTags({
      title: fullTitle,
      description,
      image: fullImageUrl,
      url: currentUrl,
      type: 'website',
      siteName,
      locale: 'en_US'
    });

    // Twitter Card tags
    this.setTwitterCardTags({
      card: 'summary_large_image',
      title: fullTitle,
      description,
      image: fullImageUrl,
      url: currentUrl,
      creator: '@smartrvtech',
      site: '@smartrvtech'
    });

    // Structured data
    if (structuredData) {
      this.addStructuredData(structuredData, 'page-schema');
    }
  }

  /**
   * Remove a specific meta tag
   */
  removeMetaTag(selector: string) {
    const tag = document.querySelector(selector);
    if (tag && this.managedTags.has(tag)) {
      tag.remove();
      this.managedTags.delete(tag);
    }
  }

  /**
   * Clean up all managed tags (useful for SPA route changes)
   */
  cleanup() {
    this.managedTags.forEach(tag => {
      if (tag.parentNode) {
        tag.parentNode.removeChild(tag);
      }
    });
    this.managedTags.clear();
  }

  /**
   * Get current meta tag content
   */
  getMetaContent(selector: string): string | null {
    const tag = document.querySelector(selector) as HTMLMetaElement;
    return tag ? tag.content : null;
  }
}

// Create singleton instance
export const metaTagManager = new MetaTagManager();

// Export convenience functions
export const setMetaTag = metaTagManager.setMetaTag.bind(metaTagManager);
export const setLinkTag = metaTagManager.setLinkTag.bind(metaTagManager);
export const setPageSEO = metaTagManager.setPageSEO.bind(metaTagManager);
export const addStructuredData = metaTagManager.addStructuredData.bind(metaTagManager);
export const cleanupMetaTags = metaTagManager.cleanup.bind(metaTagManager);