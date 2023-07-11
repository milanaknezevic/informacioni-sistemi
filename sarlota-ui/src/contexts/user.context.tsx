import { createContext, useContext, useEffect, useState } from "react";
import { Employee } from "../api/services/employee.service";

interface AuthContextValue {
  user: Employee | null;
  setUser: React.Dispatch<React.SetStateAction<Employee | null>>;
  login: (user: Employee, token: string) => void;
  logout: () => void;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider: React.FunctionComponent<
  AuthProviderProps
> = ({ children }) => {
  const [user, setUser] = useState<Employee | null>(null);
  const [token, setToken] = useState("");

  const login = (user: Employee, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("TOKEN", token);
    localStorage.setItem("USER", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.clear();
  };

  useEffect(() => {
    const user = localStorage.getItem("USER");
    const token = localStorage.getItem("TOKEN");

    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, token, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("AuthContext should be used within the AuthContextProvider.");
  }

  return context;
}
