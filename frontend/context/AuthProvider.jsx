import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setIsLoading] = useState(true);

  const setUserSavedData = async (storedUser) => {
    setUser(JSON.parse(storedUser));
  };

  const setIsLoadingDone = async () => {
    setIsLoading(false);
  };

  // TODO: usar cookies
  useEffect(() => {
    async function loadData() {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedToken) {
        await setUserSavedData(storedUser);
      }

      await setIsLoadingDone();
    }

    loadData();
  }, []);

  function signIn(userData, token) {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", JSON.stringify(token));
    setUser(userData);
  }

  function signOut() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  }

  const isAdmin = user?.profile === "ADMIN";
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, isAdmin, isAuthenticated, signIn, signOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
