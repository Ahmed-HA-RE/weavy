import type { MetadataRoute } from 'next';

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: '*',
      disallow: '/verify-email',
    },
    sitemap: 'https://weavy.ahmedrehandev.net/sitemap.xml',
  };
};

export default robots;
