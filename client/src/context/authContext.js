import { createContext, useEffect, useState } from "react";
import { makeRequest } from "../axios"; // Ensure you're importing the correct axios instance

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await makeRequest.post("/auth/login", inputs);
    setCurrentUser(res.data);
    localStorage.setItem("user", JSON.stringify(res.data));
    localStorage.setItem("token", res.data.accessToken); // Save token to local storage
  };

  const logout = async () => {
    await makeRequest.post("/auth/logout");
    setCurrentUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
