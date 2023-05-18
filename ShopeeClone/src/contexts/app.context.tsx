import React, { createContext, useState } from 'react';
import { getAccessTokenFromLS } from 'src/utils/auth';

interface AppContextInterface {
  isAuthentication: boolean;
  setIsAuthentication: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextInterface>({
  isAuthentication: Boolean(getAccessTokenFromLS()),
  setIsAuthentication: () => null
});

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const [isAuthentication, setIsAuthentication] = useState<boolean>(Boolean(getAccessTokenFromLS()));

  return (
    <AppContext.Provider
      value={{
        isAuthentication,
        setIsAuthentication
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
