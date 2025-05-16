import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import axios from "axios";
import QRCode from "react-qr-code";

export default function TwoFactorPage() {
  return (
    <ProtectedRoute>
      <TwoFactorInner />
    </ProtectedRoute>
  );
}

function TwoFactorInner() {
  const { token } = useAuth();
  const [data, setData] = useState<{ secret: string; otp_uri: string } | null>(null);

  useEffect(() => {
    if (!token) return;
    axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/2fa/setup/`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setData(res.data));
  }, [token]);

  if (!data) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="flex flex-col items-center mt-20 gap-6">
      <h1 className="text-2xl font-bold">Enable Two-Factor Authentication</h1>
      <QRCode value={data.otp_uri} size={200} />
      <p className="text-center max-w-md">
        Scan this QR code using Google Authenticator or any TOTP compatible app. <br/>
        Backup code: <code className="bg-gray-100 px-1">{data.secret}</code>
      </p>
    </div>
  );
}
