import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPost, getSlugs } from '@/lib/mdx';
import { buildBlogPostJsonLd, SITE_URL, AUTHOR } from '@/lib/seo';
import { Nav } from '@/components/landing/Nav';
import { Footer } from '@/components/landing/Footer';

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return {};
  return {
    title: post.fm.title,
    description: post.fm.description,
    authors: [{ name: AUTHOR }],
    alternates: { canonical: `${SITE_URL}/blog/${params.slug}` },
    openGraph: {
      type: 'article',
      title: post.fm.title,
      description: post.fm.description,
      url: `${SITE_URL}/blog/${params.slug}`,
      publishedTime: post.fm.date,
      authors: [AUTHOR],
      images: [{ url: `/api/og?title=${encodeURIComponent(post.fm.title)}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.fm.title,
      description: post.fm.description,
      images: [`/api/og?title=${encodeURIComponent(post.fm.title)}`],
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const jsonLd = buildBlogPostJsonLd(params.slug, post.fm, post.readingMinutes);

  return (
    <>
      <Nav />
      <article className="blog-post">
        <a href="/blog" className="blog-back">&larr; Back to blog</a>
        <header className="blog-post-header">
          <h1>{post.fm.title}</h1>
          <div className="blog-post-meta">
            <time dateTime={post.fm.date}>
              {new Date(post.fm.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            <span>{post.readingMinutes} min read</span>
          </div>
        </header>
        <div className="prose">{post.mdx}</div>
      </article>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
