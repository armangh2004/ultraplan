'use client';

import { useState } from 'react';
import Image from 'next/image';

interface PhotoGalleryProps {
  urls: string[];
}

async function downloadFile(url: string, filename: string) {
  const res = await fetch(url);
  const blob = await res.blob();
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(blobUrl);
}

export default function PhotoGallery({ urls }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loadedSet, setLoadedSet] = useState<Set<number>>(new Set());
  const [downloading, setDownloading] = useState(false);
  const [downloadingAll, setDownloadingAll] = useState(false);

  function markLoaded(index: number) {
    setLoadedSet((prev) => new Set(prev).add(index));
  }

  async function handleDownload(url: string, index: number) {
    setDownloading(true);
    try {
      await downloadFile(url, `photo-${index + 1}.jpg`);
    } catch {
      // Fallback: open in new tab
      window.open(url, '_blank');
    } finally {
      setDownloading(false);
    }
  }

  async function handleDownloadAll() {
    setDownloadingAll(true);
    try {
      for (let i = 0; i < urls.length; i++) {
        await downloadFile(urls[i], `photo-${i + 1}.jpg`);
      }
    } catch {
      // If batch download fails, open all in new tabs
      urls.forEach((url) => window.open(url, '_blank'));
    } finally {
      setDownloadingAll(false);
    }
  }

  if (urls.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-on-surface-variant font-body text-sm border border-white/10 rounded-lg">
        <span className="material-symbols-outlined text-[20px] mr-2">photo_library</span>
        No photos uploaded
      </div>
    );
  }

  return (
    <>
      {/* Download all button */}
      {urls.length > 1 && (
        <div className="flex justify-end mb-2">
          <button
            type="button"
            onClick={handleDownloadAll}
            disabled={downloadingAll}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-white/70 border border-white/10 rounded hover:text-white hover:border-white/30 transition-colors min-h-[44px] disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            {downloadingAll ? 'Downloading...' : `Download All (${urls.length})`}
          </button>
        </div>
      )}

      {/* Thumbnail grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {urls.map((url, i) => (
          <button
            key={url}
            type="button"
            onClick={() => setSelectedIndex(i)}
            className="relative aspect-square bg-surface-container-high rounded overflow-hidden border border-white/10 hover:border-primary/40 transition-colors min-h-[44px]"
          >
            {!loadedSet.has(i) && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-on-surface-variant animate-pulse text-[24px]">
                  image
                </span>
              </div>
            )}
            <Image
              src={url}
              alt={`Photo ${i + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
              onLoad={() => markLoaded(i)}
              unoptimized
            />
          </button>
        ))}
      </div>

      {/* Lightbox modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 text-on-surface hover:text-primary transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close lightbox"
          >
            <span className="material-symbols-outlined text-[28px]">close</span>
          </button>

          {/* Previous button */}
          {selectedIndex > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(selectedIndex - 1);
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-on-surface hover:text-primary transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Previous photo"
            >
              <span className="material-symbols-outlined text-[32px]">chevron_left</span>
            </button>
          )}

          {/* Next button */}
          {selectedIndex < urls.length - 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(selectedIndex + 1);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-on-surface hover:text-primary transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Next photo"
            >
              <span className="material-symbols-outlined text-[32px]">chevron_right</span>
            </button>
          )}

          {/* Lightbox image — key forces re-mount when index changes */}
          <div
            className="relative max-w-4xl max-h-[80vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={urls[selectedIndex]}
              src={urls[selectedIndex]}
              alt={`Photo ${selectedIndex + 1}`}
              fill
              sizes="90vw"
              className="object-contain"
              unoptimized
            />
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
            <span className="text-on-surface-variant text-sm font-body">
              {selectedIndex + 1} / {urls.length}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleDownload(urls[selectedIndex], selectedIndex);
              }}
              disabled={downloading}
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-[#D4AF37] text-black rounded hover:bg-[#c4a030] transition-colors min-h-[44px] disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              {downloading ? 'Saving...' : 'Download'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
