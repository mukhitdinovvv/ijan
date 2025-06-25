import React, { createContext, useContext, ReactNode, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  const login = (username: string, password: string): boolean => {
    // Hardcoded credentials for demo purposes
    const isAdmin = username === 'mvd_turkistan_obl_admin' && 
                   password === 'mVd_TUrkistan';
    
    if (isAdmin) {
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
    }
    
    return isAdmin;
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
