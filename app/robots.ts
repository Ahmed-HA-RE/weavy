import type { MetadataRoute } from 'next';

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: '*',
      disallow: ['/verify-email', '/reset-password'],
    },
    sitemap: 'https://weavy.ahmedrehandev.net/sitemap.xml',
  };
};

export default robots;
