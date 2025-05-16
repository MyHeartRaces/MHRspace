import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export const useAuth = () => {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Check for token on initial load
    useEffect(() => {
        const accessToken = Cookies.get("access");
        if (accessToken) {
            setToken(accessToken);
        }
        setLoading(false);
    }, []);

    // Function to refresh the token
    const refreshToken = useCallback(async (): Promise<boolean> => {
        try {
            const refresh = Cookies.get("refresh");
            if (!refresh) return false;

            const { data } = await axios.post(`${process.env.API_BASE}/token/refresh/`, {
                refresh
            });

            Cookies.set("access", data.access, { sameSite: "lax" });
            if (data.refresh) {
                Cookies.set("refresh", data.refresh, { sameSite: "lax" });
            }
            setToken(data.access);
            return true;
        } catch (error) {
            console.error("Failed to refresh token:", error);
            // If refresh fails, log out the user
            logout();
            return false;
        }
    }, []);

    // Login function with 2FA support
    const login = async (username: string, password: string, otp_code = "") => {
        try {
            const { data } = await axios.post(`${process.env.API_BASE}/token/`, {
                username,
                password,
                otp_code,
            });
            Cookies.set("access", data.access, { sameSite: "lax" });
            Cookies.set("refresh", data.refresh, { sameSite: "lax" });
            setToken(data.access);
            return data;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    // Logout function
    const logout = useCallback(() => {
        Cookies.remove("access");
        Cookies.remove("refresh");
        setToken(null);
    }, []);

    // Setup axios interceptor for token refresh
    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                // If error is 401 and not a refresh token request
                if (
                    error.response?.status === 401 &&
                    !originalRequest._retry &&
                    !originalRequest.url.includes('token/refresh')
                ) {
                    originalRequest._retry = true;

                    // Try to refresh the token
                    const refreshed = await refreshToken();
                    if (refreshed) {
                        // Update the authorization header
                        originalRequest.headers.Authorization = `Bearer ${Cookies.get("access")}`;
                        return axios(originalRequest);
                    }
                }

                return Promise.reject(error);
            }
        );

        // Clean up interceptor on unmount
        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, [refreshToken]);

    return { token, login, logout, refreshToken, loading };
};