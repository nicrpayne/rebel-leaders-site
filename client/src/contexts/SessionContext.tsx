import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

const SESSION_KEY = 'rl_session_id';

interface SessionContextType {
  sessionId: string;
}

const SessionContext = createContext<SessionContextType>({ sessionId: '' });

function createSessionId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    let id: string | null = null;
    try {
      id = localStorage.getItem(SESSION_KEY);
    } catch {
      // Storage can be disabled by browser privacy settings; keep a session in memory instead.
    }
    if (!id) {
      id = createSessionId();
      try {
        localStorage.setItem(SESSION_KEY, id);
      } catch {
        // The generated ID remains usable for this page session without persistence.
      }
    }
    setSessionId(id);
  }, []);

  return (
    <SessionContext.Provider value={{ sessionId }}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);
