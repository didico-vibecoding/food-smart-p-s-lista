const BASE = "https://posrtconsultoria.yayforms.link/NdJRJLr";

// Placeholders do Meta Ads — são substituídos automaticamente quando o clique
// vem de um anúncio do Meta. Para tráfego com UTMs próprios, sobrescrevemos
// com os valores reais. Não usamos URLSearchParams para não encodar as chaves.
const META_FALLBACK: Record<string, string> = {
  utm_source: "{{site_source_name}}",
  utm_campaign: "{{campaign.name}}",
  utm_medium: "{{adset.name}}",
  utm_content: "{{ad.name}}",
};

export const UTM_KEYS = ["utm_source", "utm_campaign", "utm_medium", "utm_content", "utm_term"] as const;
const EXTRA_KEYS = ["fbclid", "gclid"] as const;
export const TRACKED_KEYS = [...UTM_KEYS, ...EXTRA_KEYS] as const;

export type TrackedParams = Partial<Record<(typeof TRACKED_KEYS)[number], string>>;

const STORAGE_KEY = "fs_tracked_params";

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

function readFromStorage(): TrackedParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as TrackedParams) : {};
  } catch {
    return {};
  }
}

/** Lê UTMs no momento da chamada (URL atual + sessionStorage). */
export function readTrackedParamsNow(): TrackedParams {
  if (typeof window === "undefined") return {};
  const fromUrl = readFromUrl();
  const fromStorage = readFromStorage();
  const merged: TrackedParams = { ...fromStorage, ...fromUrl };
  if (Object.keys(fromUrl).length > 0) {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    } catch {
      // ignore
    }
  }
  return merged;
}

/**
 * Monta a query string preservando placeholders `{{...}}` sem URL-encoding,
 * pois o Meta Ads precisa enxergar as chaves literais para substituí-las.
 */
function buildQuery(pairs: Array<[string, string]>): string {
  return pairs
    .map(([k, v]) => {
      // Preserva placeholders Meta intactos. Caso contrário, encoda normalmente.
      const isPlaceholder = /^\{\{.+\}\}$/.test(v);
      return `${encodeURIComponent(k)}=${isPlaceholder ? v : encodeURIComponent(v)}`;
    })
    .join("&");
}

export function buildWaitlistUrl(params: TrackedParams = {}): string {
  const pairs: Array<[string, string]> = [];
  for (const key of UTM_KEYS) {
    const value = params[key];
    if (value && value.length > 0) {
      pairs.push([key, value]);
    } else if (META_FALLBACK[key]) {
      pairs.push([key, META_FALLBACK[key]]);
    }
  }
  for (const key of EXTRA_KEYS) {
    const value = params[key];
    if (value) pairs.push([key, value]);
  }
  return `${BASE}?${buildQuery(pairs)}`;
}

/** Atalho usado nos handlers de clique para garantir UTMs frescas. */
export function getWaitlistUrlNow(): string {
  return buildWaitlistUrl(readTrackedParamsNow());
}
