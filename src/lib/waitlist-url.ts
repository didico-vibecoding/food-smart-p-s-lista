const BASE = "https://posrtconsultoria.yayforms.link/NdJRJLr";

// Mantém os placeholders do Meta Ads como fallback — eles são substituídos
// automaticamente quando o clique vem de um anúncio do Meta. Para tráfego
// com UTMs próprios, sobrescrevemos com os valores reais.
const META_FALLBACK: Record<string, string> = {
  utm_source: "{{site_source_name}}",
  utm_campaign: "{{campaign.name}}",
  utm_medium: "{{adset.name}}",
  utm_content: "{{ad.name}}",
  utm_term: "teste-xxx",
};

export const UTM_KEYS = ["utm_source", "utm_campaign", "utm_medium", "utm_content", "utm_term"] as const;
const EXTRA_KEYS = ["fbclid", "gclid"] as const;
export const TRACKED_KEYS = [...UTM_KEYS, ...EXTRA_KEYS] as const;

export type TrackedParams = Partial<Record<(typeof TRACKED_KEYS)[number], string>>;

export function buildWaitlistUrl(params: TrackedParams = {}): string {
  const search = new URLSearchParams();
  for (const key of UTM_KEYS) {
    const value = params[key];
    search.set(key, value && value.length > 0 ? value : META_FALLBACK[key]);
  }
  for (const key of EXTRA_KEYS) {
    const value = params[key];
    if (value) search.set(key, value);
  }
  return `${BASE}?${search.toString()}`;
}
