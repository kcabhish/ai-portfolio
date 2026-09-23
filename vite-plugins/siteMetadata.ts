import type { Plugin } from 'vite';
import { site } from '../src/data/site.ts';

interface SiteMetadataOptions {
  /** Absolute public URL of the site, including the trailing slash. */
  siteUrl: string;
}

const MARKER = '<!-- site-metadata -->';

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function withTrailingSlash(url: string): string {
  return url.endsWith('/') ? url : `${url}/`;
}

function metadataTags(siteUrl: string): string {
  const title = escapeHtml(site.title);
  const description = escapeHtml(site.description);
  const url = escapeHtml(siteUrl);

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: site.jobTitle,
    url: siteUrl,
    alumniOf: { '@type': 'CollegeOrUniversity', name: site.alumniOf },
    sameAs: [site.linkedin, site.github],
  };
  // Prevent `</script>` inside JSON from terminating the script element.
  const jsonLd = JSON.stringify(person).replaceAll('<', '\\u003c');

  return [
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="profile" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:site_name" content="${escapeHtml(site.name)}" />`,
    `<meta property="profile:first_name" content="Abhishek" />`,
    `<meta property="profile:last_name" content="KC" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<script type="application/ld+json">${jsonLd}</script>`,
  ].join('\n    ');
}

/**
 * Fills title/description placeholders in `index.html`, injects canonical, Open Graph,
 * and JSON-LD metadata, and emits `robots.txt` and `sitemap.xml` at build time.
 */
export function siteMetadata({ siteUrl }: SiteMetadataOptions): Plugin {
  const url = withTrailingSlash(siteUrl);

  return {
    name: 'site-metadata',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html
          .replaceAll('%SITE_TITLE%', escapeHtml(site.title))
          .replaceAll('%SITE_DESCRIPTION%', escapeHtml(site.description))
          .replace(MARKER, metadataTags(url));
      },
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${url}sitemap.xml\n`,
      });
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          `  <url><loc>${escapeHtml(url)}</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod></url>`,
          '</urlset>',
          '',
        ].join('\n'),
      });
    },
  };
}
