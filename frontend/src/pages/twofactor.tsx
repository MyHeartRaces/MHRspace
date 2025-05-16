import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";

interface SetupRes { secret: string; otp_uri: string }

export default function TwoFactorSetup() {
    const { token } = useAuth();
    const [data, setData] = useState<SetupRes | null>(null);

    useEffect(() => {
        axios
            .post(
                `${process.env.API_BASE}/2fa/setup/`,
                {},
                { headers: { Authorization: `Bearer ${token}` } },
            )
            .then((r) => setData(r.data));
    }, [token]);

    if (!data) return null;

    return (
        <div className="flex flex-col items-center gap-6 mt-10">
            <QRCode value={data.otp_uri} size={196} />
            <p className="text-center">
                Scan this QR code in Google Authenticator, Authy, or any TOTP app.<br />
                Secret key (backup): <code>{data.secret}</code>
            </p>
        </div>
    );
}
