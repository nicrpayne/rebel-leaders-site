import { useRef, useState } from "react";
import { trpc } from "@/lib/trpc";

interface WallGateProps {
  wall: { id: string; wallCode: string; title: string; promptText?: string | null };
  onSuccess: () => void;
}

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
const MAX_BYTES = 10 * 1024 * 1024; // 10MB (matches original JournalUploader)

export default function WallGate({ wall, onSuccess }: WallGateProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const addMoreRef = useRef<HTMLInputElement>(null);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const submitEntry = trpc.wall.submitEntry.useMutation();

  // Lifted verbatim from JournalUploader.processFiles(), adapted for our types
  function processFiles(files: File[], append = false) {
    if (files.length === 0) return;
    setIsProcessing(true);
    setError(null);

    const validFiles: File[] = [];
    const invalidFiles: string[] = [];

    files.forEach((file) => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        invalidFiles.push(`${file.name} (invalid type)`);
      } else if (file.size > MAX_BYTES) {
        invalidFiles.push(`${file.name} (too large, max 10MB)`);
      } else {
        validFiles.push(file);
      }
    });

    if (invalidFiles.length > 0) {
      setError(`Skipped: ${invalidFiles.join(", ")}. Use JPEG, PNG, WebP, or GIF under 10MB.`);
    }

    if (validFiles.length === 0) {
      setIsProcessing(false);
      return;
    }

    const promises = validFiles.map(
      (file) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        })
    );

    Promise.all(promises)
      .then((images) => {
        if (append) {
          setSelectedFiles((prev) => [...prev, ...validFiles]);
          setPreviews((prev) => [...prev, ...images]);
        } else {
          setSelectedFiles(validFiles);
          setPreviews(images);
        }
        setIsProcessing(false);
      })
      .catch(() => {
        setError("Error reading files. Please try again.");
        setIsProcessing(false);
      });
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (e.target) e.target.value = "";
    processFiles(files, false);
  }

  function handleAddMore(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (e.target) e.target.value = "";
    processFiles(files, true);
  }

  function removeImage(index: number) {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  }

  function handleDiscard() {
    setSelectedFiles([]);
    setPreviews([]);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
    if (addMoreRef.current) addMoreRef.current.value = "";
  }

  // One submitEntry call per image, looped sequentially
  async function handleSubmit() {
    if (selectedFiles.length === 0) return;
    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const base64 = previews[i].split(",")[1];
        await submitEntry.mutateAsync({
          wallId: wall.id,
          wallCode: wall.wallCode,
          imageBase64: base64,
          contentType: selectedFiles[i].type || "image/jpeg",
        });
        setUploadProgress(Math.round(((i + 1) / selectedFiles.length) * 100));
      }
      onSuccess();
    } catch {
      setError("Upload failed. Please try again.");
      setIsUploading(false);
      setUploadProgress(0);
    }
  }

  const showPreview = previews.length > 0;

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

      {isProcessing ? (
        <p className="font-pixel text-parchment/40 text-[10px] tracking-widest">
          PROCESSING...
        </p>
      ) : !showPreview ? (
        /* ── No files selected ── */
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <button
            onClick={() => cameraInputRef.current?.click()}
            className="w-full py-4 bg-gold text-background font-pixel text-sm tracking-widest rounded-none border-2 border-gold active:opacity-80"
          >
            TAKE A PHOTO
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-3 bg-transparent text-parchment font-pixel text-xs tracking-widest border border-parchment/30 rounded-none active:opacity-80"
          >
            UPLOAD FROM DEVICE
          </button>
          <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleInputChange} />
          <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleInputChange} />
        </div>
      ) : (
        /* ── Preview mode ── */
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <p className="font-pixel text-parchment/40 text-[9px] tracking-widest text-center">
            {selectedFiles.length} IMAGE{selectedFiles.length !== 1 ? "S" : ""} SELECTED
          </p>

          {/* Image grid with remove buttons */}
          <div className="grid grid-cols-2 gap-2 max-h-72 overflow-y-auto">
            {previews.map((src, i) => (
              <div key={i} className="relative group">
                <img src={src} alt="" className="w-full h-28 object-cover border border-parchment/20" />
                <button
                  onClick={() => removeImage(i)}
                  disabled={isUploading}
                  className="absolute top-1 right-1 w-5 h-5 bg-black/70 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:hidden"
                >
                  ×
                </button>
                <span className="absolute bottom-1 left-1 bg-black/60 text-white font-pixel text-[8px] px-1">
                  {i + 1}
                </span>
              </div>
            ))}
          </div>

          {/* Add more */}
          <button
            onClick={() => addMoreRef.current?.click()}
            disabled={isUploading}
            className="w-full py-2 text-parchment/50 font-pixel text-[9px] tracking-widest border border-parchment/20 disabled:opacity-30"
          >
            + ADD MORE IMAGES
          </button>
          <input ref={addMoreRef} type="file" accept="image/*" multiple className="hidden" onChange={handleAddMore} />

          {/* Upload progress */}
          {isUploading && uploadProgress > 0 && (
            <div className="w-full">
              <div className="flex justify-between font-pixel text-[9px] text-parchment/40 mb-1">
                <span>UPLOADING...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-parchment/10 h-1">
                <div className="bg-gold h-1 transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
              </div>
            </div>
          )}

          {error && (
            <p className="font-pixel text-red-400 text-[10px] tracking-wider text-center">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={isUploading}
            className="w-full py-4 bg-gold text-background font-pixel text-sm tracking-widest rounded-none border-2 border-gold disabled:opacity-50"
          >
            {isUploading ? `UPLOADING ${uploadProgress}%...` : `SUBMIT ${selectedFiles.length > 1 ? `${selectedFiles.length} ENTRIES` : "TO THE WALL"}`}
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
