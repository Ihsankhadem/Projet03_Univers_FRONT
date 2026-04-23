
// // src/context/AuthContext.tsx - contexte d'authentification global de l'application



import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

type Role = "rédacteur" | "administrateur";

interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}

interface JwtPayload {
  id: number;
  role: Role;
  exp?: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!token && !!user;

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (savedToken) {
        const payload = jwtDecode<JwtPayload>(savedToken);

        if (payload.exp && payload.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        } else {
          setToken(savedToken);
          if (savedUser && savedUser !== "undefined") {
            setUser(JSON.parse(savedUser));
          }
        }
      }
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (token: string, user: User) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth doit être utilisé dans AuthProvider");
  return ctx;
};




// import { createContext, useContext, useEffect, useState } from "react";

// type Role = "rédacteur" | "administrateur";

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   role: Role;
// }

// interface AuthContextType {
//   user: User | null;
//   token: string | null;
//   isAuthenticated: boolean;
//   loading: boolean;
//   login: (token: string, user: User) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   const isAuthenticated = !!token;

//   useEffect(() => {
//     try {
//       const savedToken = localStorage.getItem("token");
//       const savedUser = localStorage.getItem("user");

//       if (savedToken) setToken(savedToken);

//       if (savedUser && savedUser !== "undefined") {
//         setUser(JSON.parse(savedUser));
//       }
//     } catch (e) {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const login = (token: string, user: User) => {
//     setToken(token);
//     setUser(user);

//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(user));
//   };

//   const logout = () => {
//     setToken(null);
//     setUser(null);
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, token, isAuthenticated, loading, login, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth doit être utilisé dans AuthProvider");
//   return context;
// };