import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [iniciada, setIniciada] = useState(false);

  const login = () => setIniciada(true);
  const logout = () => setIniciada(false);

  return (
    <AuthContext.Provider value={{ iniciada, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
