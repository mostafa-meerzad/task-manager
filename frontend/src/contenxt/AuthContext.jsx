// import axios from "axios";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  // if (token) axios.defaults.headers.common["x-auth-token"] = token;

  const [authState, setAuthState] = useState({
    token,
    isAuthenticated: false,
    user: null,
  });

  const login = (token, user) => {
    console.log("login function is called")
    console.log(token)
    console.log(user)

    localStorage.setItem("token", token);
    setAuthState({ token, isAuthenticated: true, user });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthState({ token: null, isAuthenticated: false, user: null });
  };

  // console.log("auth context");
  // console.log(authState.token);
  // console.log(authState.isAuthenticated);
  // console.log(authState.user);
  // console.log("auth context");
  // console.log("-------------------------");
  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
