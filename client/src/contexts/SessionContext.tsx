import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

const SESSION_KEY = 'rl_session_id';

interface SessionContextType {
  sessionId: string;
}

const SessionContext = createContext<SessionContextType>({ sessionId: '' });

export function SessionProvider({ children }: { children: ReactNode }) {
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    let id = localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(SESSION_KEY, id);
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
