import type { MetadataRoute } from 'next';

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: '*',
      disallow: ['/verify-email', '/reset-password', '/notifications'],
    },
    sitemap: 'https://weavy.ahmedrehandev.net/sitemap.xml',
  };
};

export default robots;
