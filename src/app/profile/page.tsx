
import { requireAuth } from "@/lib/auth-guard";
import { UserCircle, Mail, CalendarDays } from "lucide-react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "View your BookNook account information.",
};

export default async function ProfilePage() {
  const session = await requireAuth();
  const user = session.user;

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#244B3C]">
          My Profile
        </h1>
        <p className="mt-2 text-gray-600">
          View your BookNook account information.
        </p>
      </div>

      <div className="rounded-2xl border border-[#E7E5DF] bg-white p-6 shadow-sm sm:p-8">

        {/* Profile Header */}
        <div className="mb-8 flex items-center gap-4 border-b border-[#E7E5DF] pb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E9EEE8]">
            <UserCircle size={38} className="text-[#244B3C]" />
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-xl font-bold text-[#244B3C]">
              {user.name || "Reader"}
            </h2>

            <p className="text-sm text-gray-500">
              BookNook Member
            </p>
          </div>
        </div>

        {/* Account Information */}
        <div className="space-y-6">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
              <UserCircle size={17} />
              Full Name
            </div>

            <p className="font-semibold text-gray-800">
              {user.name || "Not provided"}
            </p>
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
              <Mail size={17} />
              Email Address
            </div>

            <p className="break-all font-semibold text-gray-800">
              {user.email}
            </p>
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
              <CalendarDays size={17} />
              Account Created
            </div>

            <p className="font-semibold text-gray-800">
              {new Date(user.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
