// src/app/gallery/page.tsx
import { GalleryDisplay } from '~/components/gallery-display';
import { getGroupedGalleryImages, GroupedGalleryImages } from '~/lib/gallery';

export const metadata = {
  title: 'Gallery',
  description: 'A collection of my photography and visual work.',
};

// Enable static generation for better performance
export const revalidate = 3600; // Revalidate every hour

interface SearchParams {
  hideNavbar?: string;
}

export default async function GalleryDisplayPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  // Pre-fetch images on the server for faster initial load
  const groupedImages: GroupedGalleryImages[] = await getGroupedGalleryImages();
  const resolvedSearchParams = await searchParams;
  const isCompactView = resolvedSearchParams?.hideNavbar === 'true';

  return (
    <GalleryDisplay
      groupedImages={groupedImages}
      isCompactView={isCompactView}
    />
  );
}