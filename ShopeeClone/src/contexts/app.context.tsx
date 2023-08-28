import React, { createContext, useState } from 'react';
import { ExtendsPurchases } from 'src/@types/purchases.type';
import { User } from 'src/@types/user.type';
import { getAccessTokenFromLS, getProfileFromLS } from 'src/utils/auth';

interface AppContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  profile: User | null;
  setProfile: React.Dispatch<React.SetStateAction<User | null>>;
  extendsPurchases: ExtendsPurchases[];
  setExtendsPurchases: React.Dispatch<React.SetStateAction<ExtendsPurchases[]>>;
  clearData: () => void;
}

export const AppContext = createContext<AppContextInterface>({
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  extendsPurchases: [],
  setExtendsPurchases: () => null,
  clearData: () => null
});

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(Boolean(getAccessTokenFromLS()));
  const [profile, setProfile] = useState<User | null>(getProfileFromLS());
  const [extendsPurchases, setExtendsPurchases] = useState<ExtendsPurchases[]>([]);

  const clearData = () => {
    setIsAuthenticated(false);
    setProfile(null);
    setExtendsPurchases([]);
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        extendsPurchases,
        setExtendsPurchases,
        clearData
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
