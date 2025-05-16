import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import Cookies from "js-cookie";
import axios from "axios";

interface AuthContextType {
  token: string | null;
  login: (username: string, password: string, otp_code?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const access = Cookies.get("access");
    if (access) setToken(access);
  }, []);

  const logout = useCallback(() => {
    Cookies.remove("access");
    Cookies.remove("refresh");
    setToken(null);
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const refresh = Cookies.get("refresh");
      if (!refresh) return false;
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/token/refresh/`, { refresh });
      Cookies.set("access", data.access, { sameSite: "lax" });
      if (data.refresh) Cookies.set("refresh", data.refresh, { sameSite: "lax" });
      setToken(data.access);
      return true;
    } catch {
      logout();
      return false;
    }
  }, [logout]);

  // Axios interceptor: attach token and refresh on 401
  useEffect(() => {
    const interceptor = axios.interceptors.request.use((config) => {
      const access = Cookies.get("access");
      if (access) config.headers.Authorization = `Bearer ${access}`;
      return config;
    });
    const respInterceptor = axios.interceptors.response.use(
      (r) => r,
      async (error) => {
        if (error.response?.status === 401 && !error.config._retry && !error.config.url.includes("token/refresh")) {
          error.config._retry = true;
          const ok = await refreshToken();
          if (ok) {
            error.config.headers.Authorization = `Bearer ${Cookies.get("access")}`;
            return axios(error.config);
          }
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axios.interceptors.request.eject(interceptor);
      axios.interceptors.response.eject(respInterceptor);
    };
  }, [refreshToken]);

  const login = async (username: string, password: string, otp_code = "") => {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/token/`, { username, password, otp_code });
    Cookies.set("access", data.access, { sameSite: "lax" });
    Cookies.set("refresh", data.refresh, { sameSite: "lax" });
    setToken(data.access);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
