'use client';

interface BlogPostContentProps {
    content: string;
}

export default function BlogPostContent({ content }: BlogPostContentProps) {
    return (
        <article
            className="prose prose-neutral dark:prose-invert max-w-none 
                 prose-headings:font-semibold prose-headings:tracking-tight prose-headings:scroll-mt-24 
                 prose-a:text-primary prose-a:no-underline hover:prose-a:underline 
                 prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm 
                 prose-pre:border prose-pre:bg-muted/50 prose-pre:overflow-x-auto
                 prose-img:rounded-lg prose-img:shadow-sm
                 prose-blockquote:border-l-primary
                 prose-table:text-sm
                 text-sm sm:text-base
                 leading-relaxed sm:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
}