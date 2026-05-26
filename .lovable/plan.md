## Objetivo
Deixar o bloco de 4 cards ("+5.000", "+200", "8", "4") mais elegante e adicionar animação de contagem (0 → valor final) quando entram na viewport.

## Mudanças visuais propostas

**Fundo da subseção**
- Adicionar um "glow" radial sutil atrás do grid usando `radial-gradient` em ciano (#2DD2E3) com baixa opacidade, dando profundidade sem poluir.
- Manter o fundo geral da seção como está.

**Cards (#252A45)**
- Borda fina translúcida (`1px solid rgba(45,210,227,0.15)`) para destacar do fundo.
- Sombra suave + leve "inner glow" no topo via gradient overlay.
- Hover: elevação sutil (`translateY(-4px)`), borda passa a `rgba(45,210,227,0.5)` e brilho ciano mais forte. Transição 300ms.
- Linha de destaque ciano no topo do card (2px, gradiente que esmaece nas pontas) — funciona como "accent" sem sobrecarregar.

**Números (#2DD2E3)**
- Pequeno text-shadow/glow ciano para reforçar destaque.
- Tipografia mantém Poppins Black, tamanho grande.

**Texto descritivo**
- Mantém branco, Poppins Regular. Sem mudanças.

## Animação de count-up

- Hook `useCountUp(target, { duration: 1500, start: trigger })` usando `requestAnimationFrame` com easing `easeOutCubic`.
- Disparado pelo mesmo `IntersectionObserver` que já controla o fade-in do card (uma única vez).
- Formatação respeita o prefixo `+` e o separador de milhar (`+5.000`, `+200`, `8`, `4`).
- Durante a contagem, mantém o mesmo layout/tamanho para não causar shift.

## Arquivos afetados
- `src/routes/index.tsx`: componente `ImpactStats` e `FadeInCard` (ou novo `StatCard` que combina fade-in + count-up).

## Fora de escopo
- Não altera o restante da seção "Somos o maior ecossistema da área de alimentos".
- Não reintroduz o card de faturamento nem ícones.
- Não altera grid (segue 2x2 desktop, 1 coluna mobile) nem cores principais.
