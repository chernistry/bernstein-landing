import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { z } from 'zod';
import readingTime from 'reading-time';
import { compileMDX } from 'next-mdx-remote/rsc';
import { extractTableOfContents, type TableOfContentsItem } from '@/lib/blog-headings';
import { Callout } from '@/components/blog/Callout';
import { Lead } from '@/components/blog/Lead';
import { Figure } from '@/components/blog/Figure';
import { SmartLink } from '@/components/blog/SmartLink';
import { InlineCode } from '@/components/blog/InlineCode';
import { CodeBlock } from '@/components/blog/CodeBlock';
import { MdxH2 } from '@/components/blog/MdxH2';
import { MdxH3 } from '@/components/blog/MdxH3';
import { Mermaid } from '@/components/blog/Mermaid';

export const BLOG_DIR = path.resolve(process.cwd(), 'content', 'blog');

export const Frontmatter = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  date: z.union([z.string(), z.date()]).transform((v) =>
    v instanceof Date ? v.toISOString().split('T')[0] : v,
  ),
  tags: z.array(z.string()).optional(),
  draft: z.boolean().optional(),
  hero: z.string().optional(),
});
export type FrontmatterT = z.infer<typeof Frontmatter>;

export type PostIndex = {
  slug: string;
  fm: FrontmatterT;
  readingMinutes: number;
};

export type PostResult = {
  mdx: React.ReactNode;
  fm: FrontmatterT;
  readingMinutes: number;
  tableOfContents: TableOfContentsItem[];
};

const mdxComponents = {
  Callout,
  Lead,
  Figure,
  Mermaid,
  a: SmartLink,
  code: InlineCode,
  h2: MdxH2,
  h3: MdxH3,
  pre: CodeBlock,
};

async function listDirs(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries.filter((e) => e.isDirectory()).map((e) => e.name);
}

export async function getAllPosts(): Promise<PostIndex[]> {
  const slugs = await listDirs(BLOG_DIR);
  const posts: PostIndex[] = [];
  for (const slug of slugs) {
    const raw = await fs.readFile(path.join(BLOG_DIR, slug, 'index.mdx'), 'utf8');
    const { data, content } = matter(raw);
    const fm = Frontmatter.parse(data);
    if (fm.draft) continue;
    posts.push({ slug, fm, readingMinutes: Math.max(1, Math.ceil(readingTime(content).minutes)) });
  }
  return posts.sort((a, b) => (a.fm.date < b.fm.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<PostResult | null> {
  try {
    const raw = await fs.readFile(path.join(BLOG_DIR, slug, 'index.mdx'), 'utf8');
    const { data, content } = matter(raw);
    const fm = Frontmatter.parse(data);
    if (fm.draft) return null;

    const [remarkGfm, rehypePrettyCode] = await Promise.all([
      import('remark-gfm').then((m) => m.default),
      import('rehype-pretty-code').then((m) => m.default),
    ]);

    const { content: mdx } = await compileMDX({
      source: content,
      components: mdxComponents,
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            [rehypePrettyCode, {
              theme: { dark: 'github-dark', light: 'github-light' },
              keepBackground: false,
              defaultLang: 'plaintext',
            }],
          ],
        },
      },
    });

    return {
      mdx,
      fm,
      readingMinutes: Math.max(1, Math.ceil(readingTime(content).minutes)),
      tableOfContents: extractTableOfContents(content),
    };
  } catch (error) {
    console.error(`Error getting post ${slug}:`, error);
    return null;
  }
}

export async function getSlugs(): Promise<string[]> {
  return listDirs(BLOG_DIR);
}
