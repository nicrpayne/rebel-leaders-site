import { useState } from "react";
import PhotoAlbum, { type RenderPhotoProps, type RenderPhotoContext } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export interface WallEntry {
  id: string;
  imageUrl: string;
  createdAt: Date | null;
}

interface WallGridProps {
  entries: WallEntry[];
  wallCode: string;
}

type WallPhoto = { src: string; width: number; height: number; key: string; index: number };

function renderPhoto(_props: RenderPhotoProps, context: RenderPhotoContext<WallPhoto>) {
  return (
    <div
      className="cursor-pointer mb-2 overflow-hidden"
      style={{ transform: `rotate(${context.photo.index % 2 === 0 ? "2deg" : "-2deg"})` }}
    >
      <img
        src={context.photo.src}
        width={context.width}
        height={context.height}
        alt=""
        className="w-full h-auto block"
        loading="lazy"
      />
    </div>
  );
}

export default function WallGrid({ entries }: WallGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

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
    width: 1,
    height: 1,
    key: e.id,
    index: i,
  }));

  const slides = entries.map((e) => ({ src: e.imageUrl }));

  return (
    <div className="flex-1 overflow-y-auto px-2 py-4">
      <PhotoAlbum
        layout="masonry"
        photos={photos}
        columns={(containerWidth) => (containerWidth < 600 ? 2 : 3)}
        onClick={({ index }) => setLightboxIndex(index)}
        render={{ photo: renderPhoto }}
      />

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={slides}
        on={{ view: ({ index }) => setLightboxIndex(index) }}
      />
    </div>
  );
}
