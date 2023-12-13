import React, { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';

// Define the shape of the context data
interface UserContextType {
  userID: string | null;
  setUserID: (userID: string | null) => void;
}

// Create a Context with a default value
export const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a Provider Component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userID, setUserID] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ userID, setUserID }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the userContext
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
