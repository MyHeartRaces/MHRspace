import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export const useAuth = () => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        setToken(Cookies.get("access") ?? null);
    }, []);

    const login = async (username: string, password: string, otp_code = "") => {
        const { data } = await axios.post(`${process.env.API_BASE}/token/`, {
            username,
            password,
            otp_code,
        });
        Cookies.set("access", data.access, { sameSite: "lax" });
        Cookies.set("refresh", data.refresh, { sameSite: "lax" });
        setToken(data.access);
    };

    const logout = () => {
        Cookies.remove("access");
        Cookies.remove("refresh");
        setToken(null);
    };

    return { token, login, logout };
};
