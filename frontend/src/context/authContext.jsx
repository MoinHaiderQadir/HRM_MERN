import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Create authentication context
const UserContext = createContext();

// Authentication Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading]= useState(false)

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setUser(null);
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/auth/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setUser(response.data.user);
        } else {
          setUser(null);
          setLoading(false)
        }
      } catch (error) {
        setUser(null);
      }finally {
        setLoading(false)
      }
    };

    verifyUser();
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login"); // Redirect user after logout
  };

  return <UserContext.Provider value={{ user, login, logout, loading }}>{children}</UserContext.Provider>;
};

export const useAuth = () => useContext(UserContext);


export default AuthProvider;
