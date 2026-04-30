import {
  createContext,
  useState,
  useCallback,
} from "react";

import type { User, AuthContextType } from "../types";
import { getStoredAuth, isTokenValid } from "../services/auth.utils";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const storedAuth = (() => {
    try {
      const { token, user } = getStoredAuth();

      if (!token || !isTokenValid(token)) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        return {
          token: null,
          user: null,
        };
      }

      return { token, user };
    } catch {
      localStorage.clear();

      return {
        token: null,
        user: null,
      };
    }
  })();

  const [user, setUser] = useState<User | null>(storedAuth.user);
  const [token, setToken] = useState<string | null>(storedAuth.token);
  const [loading] = useState(false);

  const isAuthenticated = !!token && !!user;

  const login = useCallback((token: string, user: User) => {
    setToken(token);
    setUser(user);

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };