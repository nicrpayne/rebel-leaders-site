import { useState, useRef, useEffect } from "react";

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ZoomableImage = ({ src, alt, className = "" }: ZoomableImageProps) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const minScale = 0.5;
  const maxScale = 5;

  const handleZoomIn = () => setScale((prev) => Math.min(prev * 1.2, maxScale));
  const handleZoomOut = () => setScale((prev) => Math.max(prev / 1.2, minScale));
  const handleReset = () => { setScale(1); setPosition({ x: 0, y: 0 }); };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale((prev) => Math.min(Math.max(prev * delta, minScale), maxScale));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && scale > 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
    } else if (e.touches.length === 2) {
      e.preventDefault();
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging && scale > 1) {
      const touch = e.touches[0];
      setPosition({ x: touch.clientX - dragStart.x, y: touch.clientY - dragStart.y });
    } else if (e.touches.length === 2) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => setIsDragging(false);

  const handleDoubleClick = () => {
    if (scale === 1) { setScale(2); } else { handleReset(); }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) handleReset();
  };

  useEffect(() => { handleReset(); }, [src]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) { setIsFullscreen(false); handleReset(); }
      else if (e.key === "+" || e.key === "=") handleZoomIn();
      else if (e.key === "-") handleZoomOut();
      else if (e.key === "0") handleReset();
    };
    if (isFullscreen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isFullscreen]);

  const imageStyle = {
    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
    cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "default",
    transition: isDragging ? "none" : "transform 0.1s ease-out",
  };

  const containerClasses = isFullscreen
    ? "fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
    : `relative overflow-hidden ${className}`;

  return (
    <div className={containerClasses} ref={containerRef}>
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
        <button onClick={handleZoomIn} disabled={scale >= maxScale} className="w-6 h-6 bg-black/60 text-white text-xs hover:bg-black/80 disabled:opacity-30 flex items-center justify-center">+</button>
        <button onClick={handleZoomOut} disabled={scale <= minScale} className="w-6 h-6 bg-black/60 text-white text-xs hover:bg-black/80 disabled:opacity-30 flex items-center justify-center">−</button>
        <button onClick={handleReset} className="w-6 h-6 bg-black/60 text-white text-xs hover:bg-black/80 flex items-center justify-center">↺</button>
        <button onClick={toggleFullscreen} className="w-6 h-6 bg-black/60 text-white text-xs hover:bg-black/80 flex items-center justify-center">⛶</button>
      </div>

      <div className="absolute top-2 left-2 z-10 bg-black/50 text-white px-1.5 py-0.5 text-xs font-mono">
        {Math.round(scale * 100)}%
      </div>

      <img
        ref={imageRef}
        src={src}
        alt={alt}
        style={imageStyle}
        className={`max-w-full max-h-full object-contain select-none ${isFullscreen ? "max-h-screen" : ""}`}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onDoubleClick={handleDoubleClick}
        draggable={false}
      />

      {isFullscreen && (
        <>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 text-xs text-center font-mono">
            Double-click to zoom · Drag to pan · Scroll to zoom · ESC to exit
          </div>
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 text-white hover:bg-black/70 px-3 py-1 text-xs font-mono"
          >
            CLOSE
          </button>
        </>
      )}
    </div>
  );
};

export default ZoomableImage;
