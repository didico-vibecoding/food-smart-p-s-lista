import { useEffect, useState } from "react";
import { readTrackedParamsNow, type TrackedParams } from "@/lib/waitlist-url";

export function useUtmParams(): TrackedParams {
  // Lê já no primeiro render do cliente para que o href dos CTAs saia correto.
  const [params, setParams] = useState<TrackedParams>(() =>
    typeof window === "undefined" ? {} : readTrackedParamsNow(),
  );

  useEffect(() => {
    const next = readTrackedParamsNow();
    setParams((prev) => {
      return JSON.stringify(prev) === JSON.stringify(next) ? prev : next;
    });
  }, []);

  return params;
}
