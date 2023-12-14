import { ReactNode, createContext, useContext, useState } from "react";

const AuthContext = createContext({});

type ValuesType = {
  user: unknown;
  token: unknown;
  login: (loginData: { login: string; senha: string }) => Promise<unknown>;
  logout: () => void;
};

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(() => {
    const user = localStorage.getItem("user");
    if (user) return JSON.parse(user);
    else return null;
  });
  const [token, setToken] = useState(() => {
    const token = localStorage.getItem("token");
    if (token) return token;
    else return null;
  });

  async function login(loginData: { login: string; senha: string }) {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
      setToken(data.access_token);

      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }

  function logout() {
    localStorage.clear();

    setUser(null);
    setToken(null);
  }

  const values: ValuesType = {
    login,
    user,
    token,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthContextProvider, useAuth };
