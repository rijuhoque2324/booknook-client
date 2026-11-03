
import { BookOpen, Loader2 } from "lucide-react";

interface PageLoaderProps {
  message?: string;
  fullScreen?: boolean;
}

export default function PageLoader({
  message = "Loading...",
  fullScreen = false,
}: PageLoaderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${
        fullScreen ? "min-h-screen" : "min-h-[60vh]"
      }`}
    >
      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#172D25] text-white">
        <BookOpen size={30} />

        <Loader2
          size={22}
          className="absolute -right-2 -top-2 animate-spin text-[#172D25]"
        />
      </div>

      <div className="text-center">
        <p className="font-semibold text-[#172D25]">{message}</p>
        <p className="mt-1 text-sm text-gray-500">
          Please wait a moment.
        </p>
      </div>
    </div>
  );
}
