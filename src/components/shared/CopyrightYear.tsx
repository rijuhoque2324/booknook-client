"use client";

import { useEffect, useState } from "react";

export default function CopyrightYear() {
  const [year, setYear] = useState("");

  useEffect(() => {
    const currentYear = new Intl.DateTimeFormat("en", {
      year: "numeric",
    }).format(Date.now());

    setYear(currentYear);
  }, []);

  return <>{year}</>;
}