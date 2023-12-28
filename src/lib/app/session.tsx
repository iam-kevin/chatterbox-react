import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

export const USER_ID = '_$Chatterbox-User-ID' as const;

/**
 * Hook to manage the user session in the client
 * Primarily managed via cookies
 */
export function useSessionInitialization() {
  const navigate = useNavigate();
  React.useEffect(() => {
    const cookies = new Cookies();
    const user = cookies.get(USER_ID);

    console.log({ user });
    // if (!user) {
    //   navigate('/welcome', { replace: true });
    //   // window location
    // }
  }, [navigate]);

  return;
}

const SessionContext = React.createContext<null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [state, set] = React.useState<{ data: null } | null>(null);
  const navigate = useNavigate();
  React.useEffect(() => {
    const cookies = new Cookies();
    const user = cookies.get(USER_ID);

    // sets the user information
    set(user ?? { data: null });
  }, [navigate]);

  return <SessionContext.Provider value={null}>{children}</SessionContext.Provider>;
}
