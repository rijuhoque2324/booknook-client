"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getPageTitle } from "@/lib/route-config";

export default function DynamicPageTitle() {
  const pathname = usePathname();

  useEffect(() => {
    document.title = getPageTitle(pathname);
  }, [pathname]);

  return null;
}