import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const schema = z.object({
    username: z.string().min(2, "Username is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    otp_code: z
        .string()
        .length(6, "OTP code must be 6 digits")
        .optional()
        .or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({ resolver: zodResolver(schema) });

    const { login, token } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { returnUrl } = router.query;

    // Redirect if already authenticated
    useEffect(() => {
        if (token) {
            const redirectPath = returnUrl ? String(returnUrl) : "/notes";
            router.push(redirectPath);
        }
    }, [token, router, returnUrl]);

    const onSubmit = async (values: FormValues) => {
        setError(null);
        try {
            await login(values.username, values.password, values.otp_code);
            const redirectPath = returnUrl ? String(returnUrl) : "/notes";
            router.push(redirectPath);
        } catch (err: any) {
            if (err.response?.status === 401) {
                setError("Invalid credentials or TOTP code");
            } else {
                setError("An error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        {...register("username")}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.username && (
                        <p className="text-red-600 text-sm mt-1">{errors.username.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        {...register("password")}
                        type="password"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.password && (
                        <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        OTP Code (if 2FA enabled)
                    </label>
                    <input
                        {...register("otp_code")}
                        inputMode="numeric"
                        placeholder="6-digit code"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.otp_code && (
                        <p className="text-red-600 text-sm mt-1">{errors.otp_code.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                    {isSubmitting ? "Signing in..." : "Sign In"}
                </button>

                <p className="text-sm text-center mt-4">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-indigo-600 hover:text-indigo-500">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
}