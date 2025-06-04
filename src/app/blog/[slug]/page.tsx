// src/app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPostBySlug, getStaticSlugsForBlog } from '~/lib/blog';
import { DATA } from '~/config';
import { formatDate } from '~/lib/utils';
import BlurFade from '~/components/ui/blur-fade';
import BlogPostTocSidebar from '~/components/blog/BlogPostTocSidebar';
import BlogPostContent from '~/components/blog/BlogPostContent';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getStaticSlugsForBlog();
  return slugs;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata | undefined> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return;
  }

  const { title, publishedAt, summary: description, image } = post.metadata;
  const ogImage = image
    ? `${DATA.url}${image.startsWith('/') ? '' : '/'}${image}`
    : `${DATA.url}/twitter-image.png`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: publishedAt,
      url: `${DATA.url}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: DATA.contact.social.X?.url.split('/').pop() ? `@${DATA.contact.social.X.url.split('/').pop()}` : undefined,
    },
  };
}

export default async function SinglePostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${DATA.url}${post.metadata.image.startsWith('/') ? '' : '/'}${post.metadata.image}`
              : `${DATA.url}/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${DATA.url}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: DATA.name,
            },
          }),
        }}
      />

      {/* Table of Contents Sidebar */}
      <BlogPostTocSidebar content={post.contentHtml} />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 lg:mt-0 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:py-24">
          {/* Blog Header */}
          <BlurFade delay={0.1}>
            <div className="mb-8 lg:mb-12 space-y-3 lg:space-y-4">
              <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl lg:text-4xl xl:text-5xl">
                {post.metadata.title}
              </h1>
              <p className="text-sm text-muted-foreground lg:text-base">
                {formatDate(post.metadata.publishedAt)}
              </p>
            </div>
          </BlurFade>

          {/* Blog Content */}
          <BlurFade delay={0.2}>
            <BlogPostContent content={post.contentHtml} />
          </BlurFade>
        </div>
      </main>
    </div>
  );
}