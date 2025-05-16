import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

const schema = z.object({
  username: z.string().min(2),
  password: z.string().min(8),
  otp_code: z.string().length(6).optional().or(z.literal("")),
});
type FormData = z.infer<typeof schema>;

export default function Login() {
  const { token, login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });
  const { returnUrl } = router.query;

  useEffect(() => {
    if (token) router.replace((returnUrl as string) || "/notes");
  }, [token, returnUrl, router]);

  const onSubmit = async (data: FormData) => {
    setError(null);
    try {
      await login(data.username, data.password, data.otp_code);
      router.replace((returnUrl as string) || "/notes");
    } catch {
      setError("Invalid credentials or OTP code.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Username</label>
          <input {...register("username")} className="w-full border px-3 py-2 rounded" />
          {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input type="password" {...register("password")} className="w-full border px-3 py-2 rounded" />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
        </div>
        <div>
          <label className="block mb-1">OTP Code (if 2FA enabled)</label>
          <input {...register("otp_code")} inputMode="numeric" className="w-full border px-3 py-2 rounded" />
          {errors.otp_code && <span className="text-red-500 text-sm">{errors.otp_code.message}</span>}
        </div>
        <button disabled={isSubmitting} className="w-full bg-indigo-600 text-white py-2 rounded">
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
        <p className="text-center text-sm mt-4">
          Don't have an account? <Link href="/register" className="text-indigo-600">Register</Link>
        </p>
      </form>
    </div>
  );
}
