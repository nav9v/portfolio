// src/lib/blog.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeStringify from 'rehype-stringify'
import rehypeSlug from 'rehype-slug'

export interface BlogMetadata {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
}

export interface BlogPost {
  slug: string;
  metadata: BlogMetadata;
  contentHtml: string;
}

export interface BlogPostListItem {
  slug: string;
  metadata: BlogMetadata;
}

const postsDirectory = path.join(process.cwd(), 'content/blog');

function getPostFilePaths(): string[] {
  try {
    return fs.readdirSync(postsDirectory).filter((file) => /\.(mdx|md)$/.test(file));
  } catch (e) {
    console.warn("Could not read blog directory. No blog posts will be available.", e);
    return [];
  }
}

export async function markdownToHTML(markdown: string): Promise<string> {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug) // Add IDs to headings
    .use(rehypePrettyCode, {
      theme: {
        light: 'github-light',
        dark: 'github-dark',
      },
      keepBackground: false,
      defaultLang: 'plaintext',
    })
    .use(rehypeStringify, { allowDangerousHtml: true });
  
  const result = await processor.process(markdown);
  return result.toString();
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
  const mdPath = path.join(postsDirectory, `${slug}.md`);
  
  let fullPath = '';
  if (fs.existsSync(mdxPath)) {
    fullPath = mdxPath;
  } else if (fs.existsSync(mdPath)) {
    fullPath = mdPath;
  } else {
    return null;
  }

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { content: rawContent, data } = matter(fileContents);
    const contentHtml = await markdownToHTML(rawContent);

    // Validate required metadata fields
    if (!data.title || !data.publishedAt || !data.summary) {
      console.warn(`Blog post ${slug} is missing required metadata fields`);
      return null;
    }

    return {
      slug,
      metadata: data as BlogMetadata,
      contentHtml,
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

export async function getAllPosts(): Promise<BlogPostListItem[]> {
  const fileNames = getPostFilePaths();
  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.(mdx|md)$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      
      try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);
        
        // Validate required metadata fields
        if (!data.title || !data.publishedAt || !data.summary) {
          console.warn(`Blog post ${slug} is missing required metadata fields`);
          return null;
        }
        
        return {
          slug,
          metadata: data as BlogMetadata,
        };
      } catch (error) {
        console.error(`Error reading blog post ${slug}:`, error);
        return null;
      }
    }),
  );

  // Filter out null posts and sort by date in descending order
  return allPostsData
    .filter((post): post is BlogPostListItem => post !== null)
    .sort((a, b) => 
      new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
    );
}

export async function getStaticSlugsForBlog() {
  const fileNames = getPostFilePaths();
  return fileNames.map((fileName) => ({
    slug: fileName.replace(/\.(mdx|md)$/, ''),
  }));
}