
import { GitBranch } from "lucide-react";

interface SocialLoginProps {
  isLoading: boolean;
  socialLoading: string;
  handleSocialLogin: (provider: "google" | "github") => void;
}

const SocialLogin = ({
  isLoading,
  socialLoading,
  handleSocialLogin,
}: SocialLoginProps) => {
  return (
    <div>
      {/* Divider */}
      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs font-medium uppercase text-gray-400">
          Or continue with email
        </span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      {/* Social Login */}
      <div className="space-y-3">
        <button
          type="button"
          disabled={isLoading || Boolean(socialLoading)}
          onClick={() => handleSocialLogin("google")}
          className="cursor-pointer flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
        >
          <span className="text-xl font-bold text-[#4285F4]">G</span>
          {socialLoading === "google"
            ? "Connecting..."
            : "Continue with Google"}
        </button>

        <button
          type="button"
          disabled={isLoading || Boolean(socialLoading)}
          onClick={() => handleSocialLogin("github")}
          className="cursor-pointer flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
        >
          <GitBranch size={21} />
          {socialLoading === "github"
            ? "Connecting..."
            : "Continue with GitHub"}
        </button>
      </div>
      
    </div>
  );
};

export default SocialLogin;
