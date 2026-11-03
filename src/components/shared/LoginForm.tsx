
"use client";

import { useState, type FormEvent } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, BookOpen, LogIn } from "lucide-react";
import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";
import SocialLogin from "@/components/shared/SocialLogin";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  useEffect(() => {
    const isAuthRequired = document.cookie
        .split("; ")
        .some((cookie) => cookie === "auth-required=1");

    if (isAuthRequired) {
        toast.info("Please login first to access this page.");

        document.cookie =
        "auth-required=; path=/; max-age=0; SameSite=Lax";
    }
    }, []);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      setIsLoading(true);

      const { error } = await authClient.signIn.email({
        email: normalizedEmail,
        password,
      });

      if (error) {
        toast.error(error.message || "Login failed.");
        return;
      }

      toast.success("Welcome back to BookNook!");
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (
    provider: "google" | "github"
  ) => {
    try {
      setSocialLoading(provider);

      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
        errorCallbackURL: "/login",
      });

      if (error) {
        toast.error(error.message || `${provider} login failed.`);
        setSocialLoading("");
      }
    } catch (error) {
      console.error(`${provider} login error:`, error);
      toast.error("Social login failed. Please try again.");
      setSocialLoading("");
    }
  };

  return (
    <section className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#F7F8F5] px-4 py-12">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">

        {/* Left Side */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-[#172D25] p-12 text-white md:flex">
          <Link href="/" className="inline-flex items-center gap-2">
            <BookOpen size={30} />
            <span className="text-2xl font-bold">BookNook</span>
          </Link>

          <div className="relative z-10">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[3px] text-[#C5D8A4]">
              Welcome Back
            </p>

            <h1 className="mb-6 text-4xl font-bold leading-tight">
              Every book has a story.
              <br />
              Continue yours.
            </h1>

            <p className="max-w-sm leading-7 text-gray-300">
              Discover books, borrow your next favorite read,
              and share knowledge with the BookNook community.
            </p>
          </div>

          <p className="text-sm text-gray-400">
            Read More. Share More. Grow Together.
          </p>

          <div className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full border-[40px] border-white/5" />
          <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full border-[30px] border-white/5" />
        </div>

        {/* Login Form */}
        <div className="flex items-center justify-center p-6 sm:p-10 md:p-12">
          <div className="w-full max-w-md">

            <div className="mb-8 text-center md:text-left">
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#172D25] text-white md:hidden">
                <BookOpen size={28} />
              </div>

              <h2 className="text-3xl font-bold text-[#172D25]">
                Welcome Back!
              </h2>

              <p className="mt-2 text-gray-500">
                Sign in to continue your reading journey.
              </p>
            </div>
            
            {/* Email Login */}
            <form onSubmit={handleLogin} className="space-y-5">

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
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition focus:border-[#172D25] focus:bg-white focus:ring-2 focus:ring-[#172D25]/10"
                />
              </div>

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
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-12 text-gray-800 outline-none transition focus:border-[#172D25] focus:bg-white focus:ring-2 focus:ring-[#172D25]/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || Boolean(socialLoading)}
                className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl bg-[#172D25] px-5 py-3.5 font-semibold text-white transition hover:bg-[#254638] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  "Signing in..."
                ) : (
                  <>
                    <LogIn size={19} />
                    Sign In
                  </>
                )}
              </button>
            </form>

            {/* Registration Link */}
            <p className="mt-7 text-center text-sm text-gray-600">
              Do not have an account?{" "}
              <Link
                href="/register"
                className="cursor-pointer font-semibold text-[#172D25] hover:underline"
              >
                Create an account
              </Link>
            </p>

            {/* Google & GitHub Login */}
            <SocialLogin
              isLoading={isLoading}
              socialLoading={socialLoading}
              handleSocialLogin={handleSocialLogin}
            />


            <div className="mt-8 border-t border-gray-100 pt-5 text-center">
              <Link
                href="/"
                className="text-sm font-medium text-gray-500 hover:text-[#172D25]"
              >
                ← Back to Home
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
