import { useCallback, useEffect, useState } from "react";
import { ColumnsPhotoAlbum } from "react-photo-album";
import PhotoSwipe from "photoswipe";
import "photoswipe/style.css";

const pswpStyles = `
  .pswp--smooth { will-change: transform, opacity; }
  .pswp--smooth .pswp__img { will-change: transform; transform: translateZ(0); }
  .pswp--smooth .pswp__bg { will-change: opacity; transform: translateZ(0); backface-visibility: hidden; }
  .pswp--smooth .pswp__container { will-change: transform; transform: translateZ(0); backface-visibility: hidden; }
  .pswp--smooth .pswp__item { will-change: transform; transform: translateZ(0); backface-visibility: hidden; }
  .pswp--smooth .pswp__zoom-wrap { transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94); }
`;

export interface WallEntry {
  id: string;
  imageUrl: string;
  createdAt: Date | null;
}

interface WallGridProps {
  entries: WallEntry[];
  wallCode: string;
}

type WallPhoto = { src: string; width: number; height: number; key: string; entryIndex: number };

export default function WallGrid({ entries }: WallGridProps) {
  const [photosWithDimensions, setPhotosWithDimensions] = useState<WallPhoto[]>([]);

  // Lifted verbatim from CommunityWall.tsx loadImageDimensions()
  useEffect(() => {
    if (entries.length === 0) {
      setPhotosWithDimensions([]);
      return;
    }

    setPhotosWithDimensions([]);

    entries.forEach((entry, i) => {
      const img = new Image();
      img.crossOrigin = "anonymous";

      const addPhoto = (w: number, h: number) => {
        setPhotosWithDimensions((prev) => {
          if (prev.find((p) => p.key === entry.id)) return prev;
          return [...prev, { src: entry.imageUrl, width: w, height: h, key: entry.id, entryIndex: i }];
        });
      };

      const timeout = setTimeout(() => addPhoto(400, 600), 10000);

      img.onload = () => { clearTimeout(timeout); addPhoto(img.naturalWidth || 400, img.naturalHeight || 600); };
      img.onerror = () => { clearTimeout(timeout); addPhoto(400, 600); };
      img.src = entry.imageUrl;
    });
  }, [entries]);

  const openPhotoSwipe = useCallback((index: number) => {
    const items = photosWithDimensions.map((p) => ({
      src: p.src,
      width: p.width,
      height: p.height,
      alt: "",
    }));

    const options = {
      dataSource: items,
      index,
      showHideAnimationType: "zoom" as const,
      bgOpacity: 0.85,
      spacing: 0.08,
      allowPanToNext: true,
      loop: false,
      pinchToClose: true,
      closeOnVerticalDrag: true,
      hideAnimationDuration: 180,
      showAnimationDuration: 280,
      zoomAnimationDuration: 220,
      easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      tapAction: "toggle-controls" as const,
      doubleTapAction: "zoom" as const,
      preloaderDelay: 200,
      returnFocus: false,
      arrowKeys: false,
      escKey: true,
      initialZoomLevel: "fit" as const,
      secondaryZoomLevel: 1.8,
      maxZoomLevel: 3.5,
      padding: { top: 50, bottom: 50, left: 16, right: 16 },
      wheelToZoom: true,
      counter: true,
      clickToCloseNonZoomable: true,
      imageClickAction: "close" as const,
      closeOnVerticalDragDistance: 60,
      verticalDragToClose: true,
      mainClass: "pswp--smooth",
      pinchToCloseThreshold: 0.7,
      bgClickAction: "close" as const,
      preventBrowserZoom: true,
      dragToCloseThreshold: 0.4,
    };

    const gallery = new PhotoSwipe(options);
    gallery.init();
  }, [photosWithDimensions]);

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 py-16 px-6">
        <p className="font-pixel text-parchment/40 text-[10px] tracking-widest text-center uppercase">
          Your entry was first. The wall is waiting.
        </p>
      </div>
    );
  }

  // Show loading spinner while images are pre-loading dimensions
  if (photosWithDimensions.length < entries.length) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 py-16 px-6">
        <p className="font-pixel text-parchment/40 text-[10px] tracking-widest">
          LOADING...
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-2 py-4">
      <style>{pswpStyles}</style>
      <div style={{ width: "100%", maxWidth: "none", display: "block", overflow: "visible" }}>
        <ColumnsPhotoAlbum
          photos={photosWithDimensions}
          onClick={({ index }) => openPhotoSwipe(index)}
          spacing={32}
          padding={0}
          columns={(containerWidth) => {
            const actualWidth = typeof window !== "undefined" ? window.innerWidth : containerWidth;
            if (actualWidth < 640) return 2;
            if (actualWidth < 1024) return 3;
            return 4;
          }}
          render={{
            photo: (_props, context) => (
              <div
                style={{
                  transform: `rotate(${context.photo.entryIndex % 2 === 0 ? "1.5deg" : "-1.5deg"})`,
                  display: "block",
                  position: "relative",
                  marginBottom: "16px",
                  breakInside: "avoid",
                  pageBreakInside: "avoid",
                }}
                className="photo-wrapper"
              >
                <img
                  src={context.photo.src}
                  alt=""
                  style={{ width: "100%", height: "auto", objectFit: "cover", display: "block", borderRadius: "8px" }}
                  className="shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  loading="lazy"
                />
              </div>
            ),
          }}
        />
      </div>
    </div>
  );
}
