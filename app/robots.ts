import type { MetadataRoute } from 'next';

export const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: '*',
      disallow: '/verify-email',
    },
    sitemap: 'https://weavy.ahmedrehandev.net/sitemap.xml',
  };
};
