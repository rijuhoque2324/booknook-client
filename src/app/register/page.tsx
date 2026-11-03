
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, BookOpen, UserPlus } from "lucide-react";
import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";
import SocialLogin from "@/components/shared/SocialLogin";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  // Email Registration
  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (trimmedName.length < 2) {
      toast.error("Name must contain at least 2 characters.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);

      const { error } = await authClient.signUp.email({
        name: trimmedName,
        email: normalizedEmail,
        password,
      });

      if (error) {
        toast.error(error.message || "Registration failed.");
        return;
      }

      toast.success("Account created successfully! Please login.");
      router.push("/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Google & GitHub Registration
  const handleSocialLogin = async (
    provider: "google" | "github"
  ) => {
    try {
      setSocialLoading(provider);

      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
        errorCallbackURL: "/register",
      });

      if (error) {
        toast.error(error.message || `${provider} signup failed.`);
        setSocialLoading("");
      }
    } catch (error) {
      console.error(`${provider} signup error:`, error);
      toast.error("Social signup failed. Please try again.");
      setSocialLoading("");
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#F5F5F0] px-4 py-12">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">

        {/* Left Side */}
        <div className="hidden flex-col justify-between bg-[#244B3C] p-12 text-white md:flex">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <BookOpen size={34} />
              <span className="text-2xl font-bold">BookNook</span>
            </Link>

            <h1 className="mt-16 text-4xl font-bold leading-tight">
              Every reader deserves a world of stories.
            </h1>

            <p className="mt-6 leading-7 text-white/80">
              Join our reading community, discover new books,
              and share knowledge with fellow readers.
            </p>
          </div>

          <p className="text-sm text-white/60">
            Your next chapter starts here.
          </p>
        </div>

        {/* Registration Form */}
        <div className="p-6 sm:p-10 md:p-12">
          <div className="mb-8">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#E9EEE8] text-[#244B3C]">
              <UserPlus size={25} />
            </div>

            <h2 className="text-3xl font-bold text-[#252B27]">
              Create Account
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Join BookNook and start your reading journey.
            </p>
          </div>


          {/* Email Registration */}
          <form onSubmit={handleRegister} className="space-y-5">

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Full Name
              </label>

              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={2}
                maxLength={100}
                disabled={isLoading || Boolean(socialLoading)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#244B3C] focus:ring-2 focus:ring-[#244B3C]/10 disabled:bg-gray-100"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading || Boolean(socialLoading)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#244B3C] focus:ring-2 focus:ring-[#244B3C]/10 disabled:bg-gray-100"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  maxLength={128}
                  disabled={isLoading || Boolean(socialLoading)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 outline-none transition focus:border-[#244B3C] focus:ring-2 focus:ring-[#244B3C]/10 disabled:bg-gray-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Confirm Password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading || Boolean(socialLoading)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 outline-none transition focus:border-[#244B3C] focus:ring-2 focus:ring-[#244B3C]/10 disabled:bg-gray-100"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || Boolean(socialLoading)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#244B3C] px-6 py-3.5 font-semibold text-white transition hover:bg-[#19392E] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
              {!isLoading && <UserPlus size={18} />}
            </button>
          </form>

          {/* Google & GitHub Login */}
            <SocialLogin
              isLoading={isLoading}
              socialLoading={socialLoading}
              handleSocialLogin={handleSocialLogin}
            />


          {/* Login Link */}
          <p className="mt-7 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-[#244B3C] hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
