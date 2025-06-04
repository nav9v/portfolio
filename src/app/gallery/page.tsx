// src/app/gallery/page.tsx
import { GalleryDisplay } from '~/components/gallery-display';
import { getGroupedGalleryImages, GroupedGalleryImages } from '~/lib/gallery';
import { DATA } from '~/config';

export const metadata = {
  title: 'Gallery',
  description: 'A collection of my photography and visual work.',
  openGraph: {
    title: 'Gallery | ' + DATA.name,
    description: 'A collection of my photography and visual work.',
    url: DATA.url + '/gallery',
    siteName: DATA.name,
    locale: 'en',
    type: 'website',
    images: [
      {
        url: '/twitter-image.png',
        width: 1200,
        height: 630,
        alt: 'Gallery - ' + DATA.name,
      },
    ],
  },
  twitter: {
    title: 'Gallery | ' + DATA.name,
    card: 'summary_large_image',
    description: 'A collection of my photography and visual work.',
    images: ['/twitter-image.png'],
    creator: '@nav9v',
  },
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