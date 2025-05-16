import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

const schema = z.object({
  username: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  passwordConfirm: z.string()
}).refine(data => data.password === data.passwordConfirm, {
  message: "Passwords do not match",
  path: ["passwordConfirm"],
});
type FormData = z.infer<typeof schema>;

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState<string|null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setError(null);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/register/`, {
        username: data.username,
        email: data.email,
        password: data.password,
      });
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Registration failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Username</label>
          <input {...register("username")} className="w-full border px-3 py-2 rounded" />
          {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input {...register("email")} className="w-full border px-3 py-2 rounded" />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input type="password" {...register("password")} className="w-full border px-3 py-2 rounded" />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
        </div>
        <div>
          <label className="block mb-1">Confirm Password</label>
          <input type="password" {...register("passwordConfirm")} className="w-full border px-3 py-2 rounded" />
          {errors.passwordConfirm && <span className="text-red-500 text-sm">{errors.passwordConfirm.message}</span>}
        </div>
        <button disabled={isSubmitting} className="w-full bg-indigo-600 text-white py-2 rounded">
          {isSubmitting ? "Registering..." : "Register"}
        </button>
        <p className="text-center text-sm mt-4">
          Already have an account? <Link href="/login" className="text-indigo-600">Sign In</Link>
        </p>
      </form>
    </div>
  );
}
