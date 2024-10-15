import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [error, setError] = useState("");

  const storeTokenInLs = (storeToken) => {
    localStorage.setItem("token", storeToken);
    setToken(storeToken);
  };

  const authenticationToken = `Bearer ${token}`;

  const isLoggedIn = !!token;

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  const getCurrentUserData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/auth/user", {
        headers: { Authorization: authenticationToken },
      });
      setUser(response.data);
      setLoading(false);
      console.log("User Data", response.data);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getCurrentUserData();
    }
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          storeTokenInLs,
          authenticationToken,
          isLoggedIn,
          logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
