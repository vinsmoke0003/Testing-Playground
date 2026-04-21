import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null); // 'developer' | 'tester' | null

  const loginAsDeveloper = () => setRole('developer');
  const loginAsTester = () => setRole('tester');
  const logout = () => setRole(null);

  return (
    <AuthContext.Provider value={{ role, loginAsDeveloper, loginAsTester, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
