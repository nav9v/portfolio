// src/components/gallery-display.tsx
'use client';

import { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import BlurFade from '~/components/ui/blur-fade';
import { GroupedGalleryImages } from '~/lib/gallery';

const BLUR_FADE_DELAY = 0.04;

interface FullscreenModalProps {
    src: string;
    alt: string;
    onClose: () => void;
}

function FullscreenModal({ src, alt, onClose }: FullscreenModalProps) {
    const handleBackdropClick = useCallback((e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center cursor-pointer"
            onClick={handleBackdropClick}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
        >
            <Image
                src={src}
                alt={alt}
                fill
                className="object-contain cursor-pointer"
                onClick={onClose}
                sizes="100vw"
                quality={90}
                priority
            />
        </div>
    );
}

interface GalleryDisplayProps {
    groupedImages: GroupedGalleryImages[];
    isCompactView: boolean;
}

export function GalleryDisplay({ groupedImages, isCompactView }: GalleryDisplayProps) {
    const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

    const handleImageClick = useCallback((src: string, alt: string) => {
        setSelectedImage({ src, alt });
    }, []);

    const handleCloseModal = useCallback(() => {
        setSelectedImage(null);
    }, []);

    // Memoize the grid items to prevent unnecessary re-renders
    const galleryContent = useMemo(() => {
        return groupedImages.map((group, groupIndex) => (
            <div key={group.monthYear} className="mb-6 sm:mb-8">
                <BlurFade delay={BLUR_FADE_DELAY * (2 + groupIndex * 0.1)}>
                    <h2 className="mb-3 sm:mb-4 text-base sm:text-lg font-medium text-muted-foreground">
                        {group.monthYear}
                    </h2>
                </BlurFade>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 sm:gap-2">
                    {group.images.map((image, imageIndex) => (
                        <BlurFade
                            key={image.src}
                            delay={BLUR_FADE_DELAY * (3 + groupIndex * 0.1 + imageIndex * 0.02)}
                        >
                            <div
                                className="cursor-pointer hover:opacity-80 transition-opacity relative aspect-square bg-muted"
                                onClick={() => handleImageClick(image.src, image.alt)}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                    loading={groupIndex === 0 && imageIndex < 8 ? "eager" : "lazy"}
                                    quality={75}
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                />
                            </div>
                        </BlurFade>
                    ))}
                </div>
            </div>
        ));
    }, [groupedImages, handleImageClick]);

    return (
        <main className="px-2 sm:px-4 py-6 overflow-x-hidden">
            {!isCompactView && (
                <BlurFade delay={BLUR_FADE_DELAY}>
                    <h1 className="mb-6 text-2xl font-medium tracking-tighter text-center">Gallery</h1>
                </BlurFade>
            )}

            {groupedImages.length === 0 && (
                <BlurFade delay={BLUR_FADE_DELAY * 2}>
                    <p className="text-center">The gallery is currently empty. Check back soon!</p>
                </BlurFade>
            )}

            {galleryContent}

            {selectedImage && (
                <FullscreenModal
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    onClose={handleCloseModal}
                />
            )}
        </main>
    );
}