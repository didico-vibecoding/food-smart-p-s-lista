Identifiquei três pontos prováveis para a perda de rastreamento:

1. **Hidratação/primeiro clique**
   - Hoje o link depende de estado React (`useUtmParams`). Em alguns cenários, principalmente logo após carregar a página, troca de domínio ou navegação com parâmetros, o CTA pode renderizar/clicar antes do estado estar 100% sincronizado.

2. **Parâmetros da URL do Lovable/preview**
   - No preview há parâmetros internos como `__lovable_token`. A lógica atual só lê UTMs específicas, mas vou garantir que ela ignore parâmetros internos e capture UTMs tanto no carregamento inicial quanto no momento exato do clique.

3. **Encoding dos placeholders Meta**
   - `URLSearchParams` transforma `{{campaign.name}}` em `%7B%7Bcampaign.name%7D%7D`. Isso pode prejudicar placeholders dinâmicos em alguns ambientes de ads/forms. Vou preservar UTMs reais quando existirem e revisar o fallback para não atrapalhar tráfego orgânico ou pago.

Plano de correção:

- Criar uma função central que lê UTMs diretamente de `window.location.search` + `sessionStorage` sempre que o CTA for clicado.
- Atualizar os botões “Fazer minha Pré-Inscrição” para recalcular o `href` no momento do clique, não apenas no render inicial.
- Manter persistência em `sessionStorage` para que UTMs não se percam em navegações internas/âncoras.
- Garantir que todos os CTAs usem a mesma URL gerada para o Yayforms.
- Validar com uma URL de teste contendo `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `fbclid`/`gclid` e confirmar que a URL final do Yayforms carrega esses parâmetros.