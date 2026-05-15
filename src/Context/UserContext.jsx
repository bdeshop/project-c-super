import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const response = await axios.get(
        "http://localhost:8000/api/frontend/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success && response.data.user) {
        setUserData(response.data.user);
        localStorage.setItem("userData", JSON.stringify(response.data.user));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider
      value={{ userData, setUserData, loading, fetchUserData }}
    >
      {children}
    </UserContext.Provider>
  );
};
