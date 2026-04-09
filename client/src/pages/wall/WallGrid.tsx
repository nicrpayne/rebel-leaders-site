import { useCallback } from "react";
import { ColumnsPhotoAlbum } from "react-photo-album";
import PhotoSwipe from "photoswipe";
import "photoswipe/style.css";

// PhotoSwipe hardware-acceleration styles (lifted verbatim from old app)
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
  const openPhotoSwipe = useCallback((index: number) => {
    const items = entries.map((entry) => ({
      src: entry.imageUrl,
      width: 800,
      height: 600,
      alt: "",
    }));

    // Config lifted verbatim from old CommunityWall.tsx openPhotoSwipe()
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
  }, [entries]);

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 py-16 px-6">
        <p className="font-pixel text-parchment/40 text-[10px] tracking-widest text-center uppercase">
          Your entry was first. The wall is waiting.
        </p>
      </div>
    );
  }

  const photos: WallPhoto[] = entries.map((e, i) => ({
    src: e.imageUrl,
    width: 800,
    height: 600,
    key: e.id,
    entryIndex: i,
  }));

  return (
    <div className="flex-1 overflow-y-auto px-2 py-4">
      <style>{pswpStyles}</style>
      <ColumnsPhotoAlbum
        photos={photos}
        columns={(containerWidth) => (containerWidth < 600 ? 2 : 3)}
        onClick={({ index }) => openPhotoSwipe(index)}
        render={{
          photo: (_props, context) => (
            <div
              className="cursor-pointer mb-3 overflow-hidden"
              style={{
                transform: `rotate(${context.photo.entryIndex % 2 === 0 ? "2deg" : "-2deg"})`,
              }}
            >
              <img
                src={context.photo.src}
                width={context.width}
                height={context.height}
                alt=""
                className="w-full h-auto block shadow-sm hover:shadow-md transition-shadow"
                loading="lazy"
              />
            </div>
          ),
        }}
      />
    </div>
  );
}
