// src/lib/gallery.ts
import fs from 'fs';
import path from 'path';
import { unstable_cache } from 'next/cache';

const galleryDirectory = path.join(process.cwd(), 'public/gallery');

export interface GalleryImage {
  src: string; // Path relative to /public, e.g., /gallery/image1.jpg
  alt: string;
  date: Date;
}

export interface GroupedGalleryImages {
  monthYear: string;
  images: GalleryImage[];
}

function extractDateFromFilename(fileName: string): Date {
  // Extract date from filename pattern: p-2025-05-05-19-58-58-000-1-4pDUCxn9.jpeg
  const dateMatch = fileName.match(/p-(\d{4})-(\d{2})-(\d{2})/);
  if (dateMatch && dateMatch[1] && dateMatch[2] && dateMatch[3]) {
    const [, year, month, day] = dateMatch;
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }
  // Fallback to file modification time
  try {
    const filePath = path.join(galleryDirectory, fileName);
    const stats = fs.statSync(filePath);
    return stats.mtime;
  } catch {
    return new Date();
  }
}

function formatMonthYear(date: Date): string {
  return date.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });
}

// Cache the grouped gallery images for better performance
const getCachedGroupedGalleryImages = unstable_cache(
  async (): Promise<GroupedGalleryImages[]> => {
    try {
      const fileNames = fs.readdirSync(galleryDirectory);
      const images = fileNames
        .filter((fileName) => /\.(jpg|jpeg|png|gif|webp)$/i.test(fileName))
        .map((fileName) => {
          const date = extractDateFromFilename(fileName);
          return {
            src: `/gallery/${fileName}`,
            alt: fileName.replace(/\.[^/.]+$/, "") || 'Gallery image',
            date,
          };
        })
        // Sort by date, latest first
        .sort((a, b) => b.date.getTime() - a.date.getTime());

      const grouped = new Map<string, GalleryImage[]>();

      images.forEach((image) => {
        const monthYear = formatMonthYear(image.date);
        if (!grouped.has(monthYear)) {
          grouped.set(monthYear, []);
        }
        grouped.get(monthYear)!.push(image);
      });

      // Convert to array and sort by latest first
      return Array.from(grouped.entries())
        .map(([monthYear, images]) => ({ monthYear, images }))
        .sort((a, b) => {
          // Sort by the first image date in each group (latest first)
          const aDate = a.images[0]?.date || new Date(0);
          const bDate = b.images[0]?.date || new Date(0);
          return bDate.getTime() - aDate.getTime();
        });
    } catch (error) {
      console.error("Error reading gallery directory:", error);
      return [];
    }
  },
  ['grouped-gallery-images'],
  {
    revalidate: 3600, // Cache for 1 hour
    tags: ['gallery']
  }
);

export async function getGroupedGalleryImages(): Promise<GroupedGalleryImages[]> {
  return getCachedGroupedGalleryImages();
}