import { toast as sonnerToast } from "sonner";

interface ToastOptions {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}

function toast({ title, description, variant }: ToastOptions) {
  const message = title ?? "";
  const opts = description ? { description } : undefined;
  if (variant === "destructive") {
    sonnerToast.error(message, opts);
  } else {
    sonnerToast.success(message, opts);
  }
}

export function useToast() {
  return { toast };
}
