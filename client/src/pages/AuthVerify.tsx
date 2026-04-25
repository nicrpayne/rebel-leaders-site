import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { useSession } from '@/contexts/SessionContext';
import { identifyUser } from '@/lib/analytics';

export default function AuthVerify() {
  const [, setLocation] = useLocation();
  const { sessionId } = useSession();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');

  const verifyMutation = trpc.auth.verifyToken.useMutation();

  useEffect(() => {
    if (!sessionId) return;

    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (!token) {
      setStatus('error');
      return;
    }

    const pending = localStorage.getItem('gravitas_pending_save');
    const pendingResult = pending ? JSON.parse(pending) : undefined;

    const pendingMirror = localStorage.getItem('mirrorResult');
    const pendingMirrorResult = pendingMirror ? JSON.parse(pendingMirror) : undefined;

    verifyMutation.mutate(
      { token, sessionId, pendingGravitasResult: pendingResult, pendingMirrorResult },
      {
        onSuccess: (data) => {
          setStatus('success');
          localStorage.removeItem('gravitas_pending_save');
          identifyUser(data.user.id, data.user.email);
          const redirectTo = localStorage.getItem("auth_redirect_after_verify") ?? "/workbench/results";
          localStorage.removeItem("auth_redirect_after_verify");
          setTimeout(() => setLocation(redirectTo), 3000);
        },
        onError: () => setStatus('error'),
      }
    );
  }, [sessionId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        {status === 'verifying' && (
          <>
            <p className="font-pixel text-gold text-xs tracking-widest animate-pulse mb-4">
              VERIFYING SIGNAL...
            </p>
            <p className="font-display text-parchment-dim text-sm">
              Authenticating your access.
            </p>
          </>
        )}
        {status === 'success' && (
          <>
            <p className="font-pixel text-gold text-xs tracking-widest mb-4">
              SIGNAL CONFIRMED
            </p>
            <p className="font-display text-parchment-dim text-sm">
              Your reading has been saved. Returning to the field...
            </p>
          </>
        )}
        {status === 'error' && (
          <>
            <p className="font-pixel text-red-400 text-xs tracking-widest mb-4">
              SIGNAL LOST
            </p>
            <p className="font-display text-parchment-dim text-sm mb-6">
              This link has expired or already been used.
            </p>
            <a
              href="/workbench/gravitas"
              className="font-pixel text-gold text-xs tracking-widest underline"
            >
              RUN A NEW SCAN
            </a>
          </>
        )}
      </div>
    </div>
  );
}
