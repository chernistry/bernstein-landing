import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...['GPTBot', 'ChatGPT-User', 'Claude-Web', 'Anthropic-ai', 'PerplexityBot',
        'Google-Extended', 'Googlebot', 'Bingbot', 'Applebot', 'FacebookExternalHit',
        'LinkedInBot', 'Twitterbot', 'Slackbot', 'Discordbot',
      ].map((bot) => ({ userAgent: bot, allow: '/' as const })),
    ],
    sitemap: 'https://bernstein.run/sitemap.xml',
  };
}
