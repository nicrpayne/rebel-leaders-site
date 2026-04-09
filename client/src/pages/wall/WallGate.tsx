import { useRef, useState } from "react";
import { trpc } from "@/lib/trpc";

interface WallGateProps {
  wall: { id: string; wallCode: string; title: string; promptText?: string | null };
  onSuccess: () => void;
}

const MAX_BYTES = 15 * 1024 * 1024;

export default function WallGate({ wall, onSuccess }: WallGateProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitEntry = trpc.wall.submitEntry.useMutation();

  function handleFileChosen(file: File) {
    if (file.size > MAX_BYTES) {
      setError("File too large. Maximum 15MB.");
      return;
    }
    setError(null);
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFileChosen(file);
  }

  function handleDiscard() {
    setSelectedFile(null);
    setPreview(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  }

  async function handleSubmit() {
    if (!selectedFile || !preview) return;
    setIsUploading(true);
    setError(null);
    try {
      // Strip "data:image/jpeg;base64," prefix
      const base64 = preview.split(",")[1];
      await submitEntry.mutateAsync({
        wallId: wall.id,
        wallCode: wall.wallCode,
        imageBase64: base64,
        contentType: selectedFile.type || "image/jpeg",
      });
      onSuccess();
    } catch (err) {
      setError("Upload failed. Please try again.");
      setIsUploading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-6 py-8 gap-6">
      {/* Prompt */}
      {wall.promptText && (
        <p className="font-display text-parchment text-center text-lg leading-snug max-w-xs">
          {wall.promptText}
        </p>
      )}

      {/* Tagline */}
      <p className="font-pixel text-parchment/40 text-[9px] tracking-widest text-center uppercase">
        No likes. No comments. Just a quiet record of people doing the real work together.
      </p>

      {!preview ? (
        /* ── No file selected ── */
        <div className="flex flex-col gap-3 w-full max-w-xs">
          {/* Camera (primary) */}
          <button
            onClick={() => cameraInputRef.current?.click()}
            className="w-full py-4 bg-gold text-background font-pixel text-sm tracking-widest rounded-none border-2 border-gold active:opacity-80"
          >
            TAKE A PHOTO
          </button>

          {/* File upload (secondary) */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-3 bg-transparent text-parchment font-pixel text-xs tracking-widest border border-parchment/30 rounded-none active:opacity-80"
          >
            UPLOAD FROM DEVICE
          </button>

          {/* Hidden inputs */}
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleInputChange}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleInputChange}
          />
        </div>
      ) : (
        /* ── Preview mode ── */
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <img
            src={preview}
            alt="Preview"
            className="w-full aspect-square object-cover border border-parchment/20"
          />

          {error && (
            <p className="font-pixel text-red-400 text-[10px] tracking-wider text-center">
              {error}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={isUploading}
            className="w-full py-4 bg-gold text-background font-pixel text-sm tracking-widest rounded-none border-2 border-gold disabled:opacity-50"
          >
            {isUploading ? "UPLOADING..." : "SUBMIT TO THE WALL"}
          </button>

          <button
            onClick={handleDiscard}
            disabled={isUploading}
            className="w-full py-2 text-parchment/50 font-pixel text-[10px] tracking-widest disabled:opacity-30"
          >
            DISCARD
          </button>
        </div>
      )}
    </div>
  );
}
