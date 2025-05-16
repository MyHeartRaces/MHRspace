import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";

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

    const { login } = useAuth();

    const onSubmit = async (values: FormValues) => {
        try {
            await login(values.username, values.password, values.otp_code);
            window.location.href = "/notes";
        } catch {
            alert("Invalid credentials or TOTP code");
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto mt-20 space-y-4"
        >
            <input {...register("username")} placeholder="Username" className="input" />
            {errors.username && (
                <p className="text-red-600 text-sm">{errors.username.message}</p>
            )}

            <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="input"
            />
            {errors.password && (
                <p className="text-red-600 text-sm">{errors.password.message}</p>
            )}

            <input
                {...register("otp_code")}
                placeholder="6-digit OTP (if enabled)"
                className="input"
                inputMode="numeric"
            />
            {errors.otp_code && (
                <p className="text-red-600 text-sm">{errors.otp_code.message}</p>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="btn w-full disabled:opacity-60"
            >
                {isSubmitting ? "Logging in…" : "Log in"}
            </button>
        </form>
    );
}
