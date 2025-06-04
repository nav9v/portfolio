'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { cn } from '~/lib/utils';

interface TocItem {
    id: string;
    text: string;
    level: number;
}

interface ScrollSpyTocProps {
    content: string;
    className?: string;
}

export function ScrollSpyToc({ content, className }: ScrollSpyTocProps) {
    const [toc, setToc] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string>('');
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        // Extract headings from HTML content
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');

        const tocItems: TocItem[] = Array.from(headings).map((heading, index) => {
            const level = parseInt(heading.tagName.charAt(1));
            const text = heading.textContent || '';
            const id = heading.id || `heading-${index}`;

            return { id, text, level };
        });

        setToc(tocItems);
    }, [content]);

    // Improved scroll detection
    const handleScroll = useCallback(() => {
        if (toc.length === 0) return;

        const scrollPosition = window.scrollY;
        const viewportTop = scrollPosition + 120; // Account for header offset

        // Get all heading elements with their positions
        const headingElements = toc
            .map(({ id }) => {
                const element = document.getElementById(id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const elementTop = rect.top + scrollPosition;
                    return {
                        id,
                        offsetTop: elementTop,
                        element
                    };
                }
                return null;
            })
            .filter(Boolean)
            .sort((a, b) => (a?.offsetTop || 0) - (b?.offsetTop || 0));

        if (headingElements.length === 0) return;

        // Find the active heading based on scroll position
        let activeHeading = headingElements[0];

        for (const heading of headingElements) {
            if (heading && heading.offsetTop <= viewportTop) {
                activeHeading = heading;
            } else {
                break;
            }
        }

        if (activeHeading) {
            setActiveId(activeHeading.id);
        }
    }, [toc]);

    useEffect(() => {
        // Set up intersection observer with improved configuration
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(
            (entries) => {
                // Process intersection entries
                const visibleEntries = entries.filter(entry => entry.isIntersecting);

                if (visibleEntries.length > 0) {
                    // Find the entry closest to the top of the viewport
                    let topEntry = visibleEntries[0];
                    if (!topEntry) return;

                    let minTop = Math.abs(topEntry.boundingClientRect.top);

                    for (const entry of visibleEntries) {
                        const distanceFromTop = Math.abs(entry.boundingClientRect.top);
                        if (distanceFromTop < minTop) {
                            minTop = distanceFromTop;
                            topEntry = entry;
                        }
                    }

                    if (topEntry) {
                        setActiveId(topEntry.target.id);
                    }
                } else {
                    // Fallback to scroll-based detection when no entries are intersecting
                    handleScroll();
                }
            },
            {
                rootMargin: '-100px 0px -70% 0px',
                threshold: [0, 0.25, 0.5, 0.75, 1],
            }
        );

        // Add scroll listener for more reliable detection
        const throttledScroll = throttle(handleScroll, 50);
        window.addEventListener('scroll', throttledScroll, { passive: true });

        // Observe all headings after DOM is ready
        const timeoutId = setTimeout(() => {
            toc.forEach(({ id }) => {
                const element = document.getElementById(id);
                if (element && observer.current) {
                    observer.current.observe(element);
                }
            });

            // Initial active heading detection
            handleScroll();
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('scroll', throttledScroll);
            if (observer.current) observer.current.disconnect();
        };
    }, [toc, handleScroll]);

    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 120; // Account for fixed header and spacing
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Immediately update active state for better UX
            setActiveId(id);
        }
    };

    if (toc.length === 0) return null;

    return (
        <nav className={cn('space-y-0.5', className)}>
            <div className="space-y-0.5">
                {toc.map(({ id, text, level }) => (
                    <button
                        key={id}
                        onClick={() => scrollToHeading(id)}
                        className={cn(
                            'block w-full text-left text-xs py-1 transition-colors duration-200',
                            level === 2 && 'pl-0',
                            level === 3 && 'pl-3',
                            level === 4 && 'pl-6',
                            level === 5 && 'pl-9',
                            level === 6 && 'pl-12',
                            activeId === id
                                ? 'text-foreground font-medium'
                                : 'text-muted-foreground/70 hover:text-muted-foreground'
                        )}
                    >
                        <span className="line-clamp-1 leading-relaxed">{text}</span>
                    </button>
                ))}
            </div>
        </nav>
    );
}

// Throttle function for performance
function throttle<T extends (...args: any[]) => void>(func: T, limit: number): T {
    let inThrottle: boolean;
    return (function (this: any, ...args: any[]) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }) as T;
}