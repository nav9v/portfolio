'use client';

import { useEffect, useState } from 'react';
import { ScrollSpyToc } from '~/components/ui/scroll-spy-toc';

interface BlogPostTocSidebarProps {
    content: string;
}

export default function BlogPostTocSidebar({ content }: BlogPostTocSidebarProps) {
    const [showToc, setShowToc] = useState(false);

    useEffect(() => {
        // Show TOC only if there are multiple headings in content
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        const headings = doc.querySelectorAll('h2, h3, h4, h5, h6');
        setShowToc(headings.length > 1);
    }, [content]);

    if (!showToc) return null;

    return (
        <>
            {/* Desktop TOC Sidebar - Ultra minimalistic */}
            <aside className="hidden lg:block w-72 sticky top-0 h-screen">
                <div className="p-6 h-full">
                    <div className="mb-4">
                        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Contents</h2>
                    </div>
                    <div className="h-full overflow-hidden">
                        <ScrollSpyToc content={content} />
                    </div>
                </div>
            </aside>
        </>
    );
}