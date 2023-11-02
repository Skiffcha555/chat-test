import React, { createContext, useContext, useState, ReactNode } from 'react';


interface AuthContextProps {
  user: User | null;
  handleLogin: (token: string, email: string) => Promise<void>;
}

interface User {
  token: string;
  email: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = async (token: string, email: string) => {
    setUser({ token, email });
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
