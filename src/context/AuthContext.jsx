import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const login = async () => {
    setIsLoggingIn(true);
    // Simulate async network request
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsAuthenticated(true);
    setIsLoggingIn(false);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoggingIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
