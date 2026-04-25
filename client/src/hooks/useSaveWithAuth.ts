import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useSession } from "@/contexts/SessionContext";

export type SaveStatus = "idle" | "saving" | "saved" | "pending_auth";

interface SaveMutation {
  mutate: (input: any, options?: { onSuccess?: () => void; onError?: () => void }) => void;
}

interface UseSaveWithAuthOptions {
  redirectTo?: string;
  localStorageKey?: string;
}

export interface UseSaveWithAuthResult {
  saveStatus: SaveStatus;
  promptEmail: boolean;
  emailSent: boolean;
  emailLoading: boolean;
  handleEmailSubmit: (email: string) => void;
  triggerSave: () => void;
}

export function useSaveWithAuth(
  pluginId: string,
  data: unknown,
  saveMutation: SaveMutation,
  options?: UseSaveWithAuthOptions
): UseSaveWithAuthResult {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [promptEmail, setPromptEmail] = useState(false);
  const { data: currentUser } = trpc.auth.me.useQuery();
  const { sessionId } = useSession();
  const requestLinkMutation = trpc.auth.requestMagicLink.useMutation();

  const storageKey = options?.localStorageKey ?? `pending_save_${pluginId}`;
  const redirectTo =
    options?.redirectTo ??
    (typeof window !== "undefined" ? window.location.pathname : "/workbench");

  const triggerSave = () => {
    if (saveStatus === "saved" || saveStatus === "saving") return;
    if (currentUser) {
      setSaveStatus("saving");
      saveMutation.mutate(data, {
        onSuccess: () => setSaveStatus("saved"),
        onError: () => setSaveStatus("idle"),
      });
    } else {
      try {
        localStorage.setItem(storageKey, JSON.stringify(data));
        localStorage.setItem("auth_redirect_after_verify", redirectTo);
      } catch {}
      setSaveStatus("pending_auth");
      setPromptEmail(true);
    }
  };

  const handleEmailSubmit = (email: string) => {
    if (!email || !sessionId) return;
    requestLinkMutation.mutate(
      { email, sessionId },
      {
        onError: () => {
          setPromptEmail(false);
          setSaveStatus("idle");
        },
      }
    );
  };

  return {
    saveStatus,
    promptEmail,
    emailSent: requestLinkMutation.isSuccess,
    emailLoading: requestLinkMutation.isPending,
    handleEmailSubmit,
    triggerSave,
  };
}
