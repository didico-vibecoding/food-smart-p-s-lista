# Propagação de UTMs para os CTAs do Yayforms

Hoje os botões "Fazer minha Pré-Inscrição" apontam para uma URL fixa do Yayforms com placeholders do Meta Ads (`{{site_source_name}}`, `{{campaign.name}}`, etc.). Esses placeholders **só são substituídos quando o clique vem direto de um anúncio do Meta** — se o usuário chega ao site via link com `?utm_source=...&utm_campaign=...`, navega pela página e depois clica no CTA, esses UTMs são perdidos e o Yayforms recebe literalmente o texto `{{site_source_name}}`.

## O que vou implementar

### 1. Captura e persistência dos UTMs
- Criar um hook `useUtmParams` (em `src/hooks/use-utm-params.ts`) que:
  - Na primeira visita, lê da URL os parâmetros: `utm_source`, `utm_campaign`, `utm_medium`, `utm_content`, `utm_term`, e também `fbclid` e `gclid`.
  - Salva em `sessionStorage` (persiste durante a navegação na aba, sem poluir entre sessões).
  - Retorna o objeto consolidado dos UTMs presentes.

### 2. Helper para montar a URL do Yayforms
- Criar `src/lib/waitlist-url.ts` exportando `buildWaitlistUrl(utms)`:
  - Base: `https://posrtconsultoria.yayforms.link/NdJRJLr`
  - Para cada UTM presente na URL atual/sessionStorage, substitui o valor.
  - Para os que **não** vieram (ex.: visita orgânica), mantém o placeholder do Meta `{{...}}` para não quebrar o tracking de anúncios pagos. Isso garante: tráfego pago do Meta → Meta substitui; tráfego com UTM próprio → propagamos; tráfego direto → placeholders permanecem (Yayforms simplesmente ignora).
  - Alternativa que prefiro: se vier UTM próprio, usa o valor; se não vier, remove o parâmetro (mais limpo). **Decisão: manter placeholder do Meta como fallback** porque o link original já foi pensado para Meta Ads.

### 3. Aplicar nos CTAs
- `src/components/TopNav.tsx`: trocar a constante `WAITLIST_URL` por `buildWaitlistUrl(utms)` calculado via hook (CTA desktop + CTA do menu mobile).
- `src/routes/index.tsx`: localizar todos os botões/links "Fazer minha Pré-Inscrição" (hero, seção de pré-inscrição, qualquer outro) e usar a mesma URL dinâmica.

### 4. Comportamento esperado
- Usuário acessa `seusite.com/?utm_source=instagram&utm_campaign=lancamento` → clica no CTA → vai para `...yayforms.link/NdJRJLr?utm_source=instagram&utm_campaign=lancamento&utm_medium={{adset.name}}&...`
- Usuário navega entre âncoras (`#modulos`, `#certificacao`) → UTMs continuam preservados (sessionStorage).
- Usuário vem de anúncio do Meta → placeholders `{{...}}` são substituídos pelo Meta normalmente.

## Pontos para confirmar antes de implementar

1. **Fallback quando não há UTM próprio**: manter os placeholders `{{site_source_name}}` etc. (preserva tracking do Meta Ads) ou remover os parâmetros vazios (URL mais limpa)?
2. Quer que eu também capture `fbclid`/`gclid` e envie ao Yayforms (ex.: como `utm_term` ou parâmetro extra), ou só os 5 UTMs padrão?
