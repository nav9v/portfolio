// src/app/blog/page.tsx
import Link from 'next/link';
import BlurFade from '~/components/ui/blur-fade'; // Your BlurFade component path
import { getAllPosts, BlogPostListItem } from '~/lib/blog';
import { formatDate } from '~/lib/utils'; // Ensure this utility exists and is correct
import { DATA } from '~/config';

export const metadata = {
  title: 'Blog',
  description: 'My thoughts, ideas, and reflections.',
  openGraph: {
    title: 'Blog | ' + DATA.name,
    description: 'My thoughts, ideas, and reflections.',
    url: DATA.url + '/blog',
    siteName: DATA.name,
    locale: 'en',
    type: 'website',
    images: [
      {
        url: `${DATA.url}/twitter-image.png`,
        width: 1200,
        height: 630,
        alt: 'Blog - ' + DATA.name,
      },
    ],
  },
  twitter: {
    title: 'Blog | ' + DATA.name,
    card: 'summary_large_image',
    description: 'My thoughts, ideas, and reflections.',
    images: [`${DATA.url}/twitter-image.png`],
    creator: '@nav9v',
  },
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogIndexPage() {
  const posts: BlogPostListItem[] = await getAllPosts();

  return (
    <section id="blog" className="min-h-screen ">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-4xl  ">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="mb-12 space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl flex justify-center items-center">Blog</h1>
              <p className="text-muted-foreground flex justify-center items-center">My thoughts, ideas, and reflections.</p>
            </div>
          </BlurFade>

          {posts.length === 0 && (
            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <div className="text-center py-12">
                <p className="text-muted-foreground">No posts yet. Stay tuned!</p>
              </div>
            </BlurFade>
          )}

          <div className="grid gap-6 md:gap-8 max-w-xl items-center mx-auto">
            {posts.map((post, id) => (
              <BlurFade
                key={post.slug}
                delay={BLUR_FADE_DELAY * 2 + id * 0.05}
              >
                <Link
                  className="block group"
                  href={`/blog/${post.slug}`}
                >
                  <article className="space-y-3 p-6 rounded-lg border border-border/50 hover:border-border transition-all duration-200 hover:shadow-sm">
                    <h2 className="text-md font-semibold tracking-tight group-hover:text-primary transition-colors sm:text-2xl">
                      {post.metadata.title}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(post.metadata.publishedAt)}
                    </p>
                    <p className="text-muted-foreground  text-sm leading-relaxed">
                      {post.metadata.summary}
                    </p>
                  </article>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}