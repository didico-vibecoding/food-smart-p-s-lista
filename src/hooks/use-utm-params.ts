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

function readInitial(): TrackedParams {
  if (typeof window === "undefined") return {};
  const fromUrl = readFromUrl();
  const fromStorage = readFromStorage();
  return { ...fromStorage, ...fromUrl };
}

export function useUtmParams(): TrackedParams {
  // Já lê no primeiro render do cliente para que o href dos CTAs
  // saia correto sem depender do useEffect.
  const [params, setParams] = useState<TrackedParams>(readInitial);

  useEffect(() => {
    const fromUrl = readFromUrl();
    const fromStorage = readFromStorage();
    const merged: TrackedParams = { ...fromStorage, ...fromUrl };

    // Persiste em sessionStorage quando há UTMs na URL atual,
    // para sobreviver à navegação entre âncoras/páginas.
    if (Object.keys(fromUrl).length > 0) {
      try {
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      } catch {
        // ignore
      }
    }

    // Só atualiza o estado se mudou (evita re-render desnecessário).
    setParams((prev) => {
      const prevStr = JSON.stringify(prev);
      const nextStr = JSON.stringify(merged);
      return prevStr === nextStr ? prev : merged;
    });
  }, []);

  return params;
}
