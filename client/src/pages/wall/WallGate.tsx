import { useRef, useState } from "react";
import { Upload, X, Check, Loader2, Plus } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface WallGateProps {
  wall: { id: string; wallCode: string; title: string; promptText?: string | null };
  onSuccess: () => void;
}

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
const MAX_BYTES = 10 * 1024 * 1024;

export default function WallGate({ wall, onSuccess }: WallGateProps) {
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const addMoreFileInputRef = useRef<HTMLInputElement>(null);

  const submitEntry = trpc.wall.submitEntry.useMutation();

  function processFiles(files: File[], append = false) {
    if (files.length === 0) { setIsProcessingFile(false); return; }
    setIsProcessingFile(true);
    setError(null);

    const validFiles: File[] = [];
    const invalidFiles: string[] = [];
    files.forEach((file) => {
      if (!ALLOWED_TYPES.includes(file.type)) invalidFiles.push(`${file.name} (invalid type)`);
      else if (file.size > MAX_BYTES) invalidFiles.push(`${file.name} (too large)`);
      else validFiles.push(file);
    });

    if (invalidFiles.length > 0) {
      setError(`Skipped: ${invalidFiles.join(", ")}. Use JPEG, PNG, WebP, or GIF under 10MB.`);
    }
    if (validFiles.length === 0) { setIsProcessingFile(false); return; }

    Promise.all(
      validFiles.map(
        (file) => new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        })
      )
    )
      .then((images) => {
        if (append) {
          setSelectedFiles((prev) => [...prev, ...validFiles]);
          setCapturedImages((prev) => [...prev, ...images]);
        } else {
          setSelectedFiles(validFiles);
          setCapturedImages(images);
        }
        setShowPreview(true);
        setIsProcessingFile(false);
      })
      .catch(() => {
        setError("Error reading files. Please try again.");
        setIsProcessingFile(false);
      });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (e.target) e.target.value = "";
    if (files.length === 0) { setIsProcessingFile(false); return; }
    processFiles(files, false);
  }

  function handleAddMoreFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (e.target) e.target.value = "";
    if (files.length === 0) { setIsProcessingFile(false); return; }
    processFiles(files, true);
  }

  async function handleSubmit() {
    if (selectedFiles.length === 0) return;
    setIsSubmitting(true);
    setError(null);
    setUploadProgress(0);
    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const base64 = capturedImages[i].split(",")[1];
        await submitEntry.mutateAsync({
          wallId: wall.id,
          wallCode: wall.wallCode,
          imageBase64: base64,
          contentType: selectedFiles[i].type || "image/jpeg",
        });
        setUploadProgress(Math.round(((i + 1) / selectedFiles.length) * 100));
      }
      setCapturedImages([]);
      setSelectedFiles([]);
      setShowPreview(false);
      setUploadProgress(0);
      onSuccess();
    } catch {
      setError("Failed to submit your entry. Please try again.");
      setUploadProgress(0);
      setIsSubmitting(false);
    }
  }

  function resetUpload() {
    setCapturedImages([]);
    setSelectedFiles([]);
    setShowPreview(false);
    setIsProcessingFile(false);
    setUploadProgress(0);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
    if (addMoreFileInputRef.current) addMoreFileInputRef.current.value = "";
  }

  function removeImage(index: number) {
    setCapturedImages((prev) => prev.filter((_, i) => i !== index));
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    if (capturedImages.length === 1) setShowPreview(false);
  }

  return (
    <div className="bg-background p-4 w-full max-w-md mx-auto">
      <div className="w-full border border-parchment/20">
        {/* Header */}
        <div className="px-6 pt-6 pb-2">
          <p className="font-pixel text-parchment text-base tracking-widest text-center">
            {wall.title}
          </p>
          {wall.promptText && (
            <p className="font-display text-parchment/60 text-sm text-center mt-2 leading-snug">
              {wall.promptText}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          {isProcessingFile ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-parchment/40" />
              <p className="font-pixel text-parchment/40 text-[10px] tracking-widest">
                PROCESSING...
              </p>
            </div>
          ) : !showPreview ? (
            <div className="flex flex-col gap-3">
              {/* Camera button */}
              <button
                onClick={() => cameraInputRef.current?.click()}
                disabled={isProcessingFile}
                className="h-20 w-full flex flex-col items-center justify-center gap-2 bg-gold text-background font-pixel text-xs tracking-widest disabled:opacity-50"
              >
                TAKE A PHOTO
              </button>
              <input
                type="file"
                ref={cameraInputRef}
                onChange={handleFileChange}
                accept="image/*"
                capture="environment"
                className="hidden"
              />
              {/* Upload button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isProcessingFile}
                className="h-20 w-full flex flex-col items-center justify-center gap-2 border border-dashed border-parchment/30 text-parchment/60 font-pixel text-xs tracking-widest hover:border-parchment/60 hover:text-parchment/80 transition-colors disabled:opacity-50"
              >
                <Upload size={24} />
                <span>UPLOAD FROM DEVICE</span>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                multiple
                className="hidden"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="font-pixel text-parchment/40 text-[9px] tracking-widest text-center">
                {selectedFiles.length} IMAGE{selectedFiles.length !== 1 ? "S" : ""} SELECTED
              </p>

              <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
                {capturedImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Entry preview ${index + 1}`}
                      className="w-full h-32 object-cover"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      disabled={isSubmitting}
                      className="absolute top-1 right-1 w-6 h-6 bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:hidden"
                    >
                      <X size={12} />
                    </button>
                    <div className="absolute bottom-1 left-1 bg-black/70 text-white font-pixel text-[8px] px-1">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add more */}
              <div className="flex justify-center">
                <button
                  onClick={() => addMoreFileInputRef.current?.click()}
                  disabled={isProcessingFile || isSubmitting}
                  className="flex items-center gap-2 px-4 py-2 border border-parchment/20 text-parchment/50 font-pixel text-[9px] tracking-widest hover:border-parchment/40 hover:text-parchment/70 transition-colors disabled:opacity-30"
                >
                  <Plus size={14} />
                  ADD MORE IMAGES
                </button>
                <input
                  type="file"
                  ref={addMoreFileInputRef}
                  onChange={handleAddMoreFiles}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {showPreview && (
          <div className="px-6 pb-6 flex flex-col gap-3">
            {isSubmitting && uploadProgress > 0 && (
              <div className="w-full">
                <div className="flex justify-between font-pixel text-[9px] text-parchment/40 mb-1">
                  <span>UPLOADING...</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <div className="w-full bg-parchment/10 h-1">
                  <div
                    className="bg-gold h-1 transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {error && (
              <p className="font-pixel text-red-400 text-[10px] tracking-wider text-center">{error}</p>
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={resetUpload}
                disabled={isSubmitting}
                className="px-4 py-2 border border-parchment/20 text-parchment/50 font-pixel text-xs tracking-widest hover:border-parchment/40 disabled:opacity-30"
              >
                CANCEL
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-4 py-2 bg-gold text-background font-pixel text-xs tracking-widest disabled:opacity-50 flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-3 w-3 animate-spin" />
                    UPLOADING...
                  </>
                ) : (
                  <>
                    <Check size={14} />
                    SUBMIT {selectedFiles.length} ENTR{selectedFiles.length !== 1 ? "IES" : "Y"}
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
