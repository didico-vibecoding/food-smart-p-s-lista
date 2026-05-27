import { useEffect, useState } from "react";
import { TRACKED_KEYS, type TrackedParams } from "@/lib/waitlist-url";

const STORAGE_KEY = "fs_tracked_params";

function readFromStorage(): TrackedParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as TrackedParams) : {};
  } catch {
    return {};
  }
}

function readFromUrl(): TrackedParams {
  if (typeof window === "undefined") return {};
  const search = new URLSearchParams(window.location.search);
  const found: TrackedParams = {};
  for (const key of TRACKED_KEYS) {
    const v = search.get(key);
    if (v) found[key] = v;
  }
  return found;
}

export function useUtmParams(): TrackedParams {
  const [params, setParams] = useState<TrackedParams>({});

  useEffect(() => {
    const fromUrl = readFromUrl();
    const fromStorage = readFromStorage();
    // URL atual tem prioridade sobre o que está salvo
    const merged: TrackedParams = { ...fromStorage, ...fromUrl };
    if (Object.keys(fromUrl).length > 0) {
      try {
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      } catch {
        // ignore
      }
    }
    setParams(merged);
  }, []);

  return params;
}
