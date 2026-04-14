import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/mdx';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const blogEntries = posts.map((post) => ({
    url: `https://bernstein.run/blog/${post.slug}`,
    lastModified: new Date(post.fm.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    { url: 'https://bernstein.run', lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: 'https://bernstein.run/blog', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ...blogEntries,
  ];
}
