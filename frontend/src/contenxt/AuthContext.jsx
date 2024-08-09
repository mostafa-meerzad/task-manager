import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    user: null,
  });

  const login = (token, user) => {
    localStorage.setItem("token", token);
    setAuthState({ token, isAuthenticated: true, user });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthState({ token: null, isAuthenticated: false, user: null });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
