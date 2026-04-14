import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { useSession } from '@/contexts/SessionContext';

interface Props {
  gravitasResult: {
    scanType: string;
    dimensionScores: Record<string, number>;
    archetype: string;
    leak: string;
    force: string;
    firstMove: string;
    rawAnswers: Record<string, number>;
  };
}

export default function SaveReadingPrompt({ gravitasResult }: Props) {
  const { sessionId } = useSession();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const requestLink = trpc.auth.requestMagicLink.useMutation();

  const handleSubmit = () => {
    if (!email || loading) return;
    setLoading(true);

    // Store result in localStorage for retroactive save after verify
    localStorage.setItem('gravitas_pending_save', JSON.stringify(gravitasResult));

    requestLink.mutate(
      { email, sessionId },
      {
        onSuccess: () => setSent(true),
        onError: () => setLoading(false),
      }
    );
  };

  if (sent) {
    return (
      <div
        style={{
          border: '1px solid rgba(197,160,89,0.25)',
          backgroundColor: '#0a0a0e',
          borderRadius: '2px',
          padding: '24px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-pixel, monospace)',
            fontSize: '10px',
            letterSpacing: '0.2em',
            color: 'rgba(197,160,89,0.9)',
            marginBottom: '12px',
          }}
        >
          LINK SENT
        </p>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '15px',
            lineHeight: '1.7',
            color: 'var(--color-parchment)',
            margin: 0,
          }}
        >
          Check your email. Click the link to save this reading and start your return loop.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: '#0a0a0e',
        border: '1px solid rgba(197,160,89,0.12)',
        borderRadius: '2px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div
          style={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: 'rgba(197,160,89,0.6)',
          }}
        />
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '15px',
            letterSpacing: '0.2em',
            color: 'rgba(197,160,89,0.9)',
          }}
        >
          Save Your Reading
        </span>
      </div>

      {/* Copy */}
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '16px',
          lineHeight: '1.7',
          color: 'var(--color-parchment)',
          margin: 0,
        }}
      >
        The system should earn the right to be remembered before it asks to remember you.
      </p>
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '14px',
          lineHeight: '1.7',
          color: 'var(--color-parchment)',
          margin: 0,
        }}
      >
        Your first scan is useful. Your second scan is where trajectory begins.
        Save this reading and we'll compare it with what emerges next.
      </p>

      {/* Email input + send */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder="your@email.com"
          style={{
            flex: 1,
            backgroundColor: '#0f0f14',
            border: '1px solid rgba(197,160,89,0.2)',
            borderRadius: '2px',
            padding: '8px 12px',
            color: 'rgba(232,213,163,0.85)',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '14px',
            outline: 'none',
          }}
          onFocus={e => { e.currentTarget.style.borderColor = 'rgba(197,160,89,0.5)'; }}
          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(197,160,89,0.2)'; }}
        />
        <button
          onClick={handleSubmit}
          disabled={loading || !email}
          style={{
            padding: '8px 20px',
            backgroundColor: loading || !email ? 'rgba(197,160,89,0.2)' : '#b8860b',
            border: 'none',
            borderRadius: '2px',
            color: loading || !email ? 'rgba(197,160,89,0.4)' : '#0f1a12',
            fontFamily: 'var(--font-pixel, monospace)',
            fontSize: '10px',
            letterSpacing: '0.2em',
            cursor: loading || !email ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
          }}
        >
          {loading ? '...' : 'SEND'}
        </button>
      </div>

      {/* Subtext */}
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: '12px',
          textAlign: 'center',
          letterSpacing: '0.1em',
          color: 'oklch(0.93 0.03 80)',
          margin: 0,
        }}
      >
        Your reading stays even if you don't
      </p>
    </div>
  );
}
