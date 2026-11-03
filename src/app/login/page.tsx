
import { requireGuest } from "@/lib/require-guest";
import LoginForm from "@/components/shared/LoginForm";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your BookNook account.",
};

export default async function LoginPage() {
  await requireGuest();

  return <LoginForm />;
}
