
import { requireGuest } from "@/lib/require-guest";
import RegisterForm from "@/components/shared/RegisterForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a new BookNook account.",
};
export default async function RegisterPage() {
  await requireGuest();

  return <RegisterForm />;
}
