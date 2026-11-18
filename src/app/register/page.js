"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Password validation checks
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasMinLength = password.length >= 6;

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!hasUpperCase || !hasLowerCase || !hasMinLength) {
      setError("Please meet all password requirements.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
        image: image.trim() !== "" ? image : undefined,
      });

      if (error) {
        setError(error.message || "Registration failed.");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-sm space-y-6">
        
        {/* Header: Home Page Style GG Logo */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-700 rounded-2xl mx-auto flex items-center justify-center text-white font-black text-xl shadow-md">
            GG
          </div>
          <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">
            Create Account
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            Register to organize community drives and track your volunteer impact.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-semibold rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              placeholder="Tanvir Ahmed"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white"
            />
          </div>

          {/* Profile Photo URL */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Profile Photo URL
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white"
            />
            <p className="text-[11px] text-gray-400 mt-1">Optional: Leave empty for default avatar.</p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white"
            />

            {/* Password Validation Indicators */}
            <div className="mt-2 space-y-1 text-[11px]">
              <p className={hasUpperCase ? "text-emerald-600 font-medium" : "text-gray-400"}>
                {hasUpperCase ? "✓" : "✕"} At least one uppercase letter (A-Z)
              </p>
              <p className={hasLowerCase ? "text-emerald-600 font-medium" : "text-gray-400"}>
                {hasLowerCase ? "✓" : "✕"} At least one lowercase letter (a-z)
              </p>
              <p className={hasMinLength ? "text-emerald-600 font-medium" : "text-gray-400"}>
                {hasMinLength ? "✓" : "✕"} Minimum 6 characters length
              </p>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm transition shadow-sm cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading ? "Creating account..." : "Register →"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-700">
          Already have an account?{" "}
          <Link href="/login" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
            Login here
          </Link>
        </p>

      </div>
    </div>
  );
}