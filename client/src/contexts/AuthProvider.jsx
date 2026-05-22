import api from "../utils/Api";
import { useEffect, useState } from "react";
import AuthContext from './AuthContext'

const AuthProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const checkAuth = async () => {

      try {

        const response = await api.get("/auth/user/me");

        setIsLoggedIn(true);

        setUser(response.data.user);

      } catch (error) {
        console.error("Error checking auth:", error);

        setIsLoggedIn(false);

        setUser(null);

      } finally {

        setLoading(false);

      }

    };

    checkAuth();


  }, []);

  return (

    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        loading
      }}>
      {children}
    </AuthContext.Provider>

  );
};

export default AuthProvider;