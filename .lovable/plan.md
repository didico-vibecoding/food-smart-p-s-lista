## Objetivo

Manter a estrutura atual da timeline (linha vertical ciano, 9 itens, último em lima) e elevar só a camada de animação para que pareça um sistema coeso, não dois efeitos independentes.

## Mudanças

**1. Sincronizar marcador com a linha de scroll**
- Hoje a linha cresce com o scroll e os marcadores acendem por IntersectionObserver — sistemas separados.
- Passar a calcular, no mesmo handler de scroll, a posição vertical de cada marcador relativa ao container. Quando a "frente" da linha ultrapassa o marcador, o item é marcado como ativo.
- O marcador acende exatamente quando a linha o toca → sensação de progresso real.

**2. Entrada dos itens mais refinada**
- Reduzir `translateX` inicial de 16px para 8px.
- Trocar o easing `ease-out` por `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-expo suave).
- Manter delay progressivo, mas reduzir de 150ms para 80ms — a sincronização com a linha já cria o stagger natural.
- Itens partem com `opacity: 0.35` em vez de `0`, para que o texto fique levemente visível antes de ativar (efeito "guia") e ganhe destaque quando a linha chega.

**3. Marcador: estados visuais**
- Estado inativo: bolinha 12px com fundo `rgba(191,246,12,0.25)` (lima translúcido).
- Estado ativo (linha já passou): preenche para `#BFF60C` sólido com transição de 300ms e leve `scale(1.15)` que volta para `1` (micro "pop").

**4. Pulso no item final**
- Quando o último marcador (20px) ativa, dispara um pulso contínuo sutil: box-shadow oscilando entre `0 0 0 4px rgba(191,246,12,0.25)` e `0 0 0 8px rgba(191,246,12,0)`, loop infinito de 2s.
- Usa keyframes CSS já existentes no padrão do projeto (animação inline ou classe utilitária nova).

**5. Suavizar a linha**
- Trocar `transition: height 120ms linear` por `transition: height 200ms cubic-bezier(0.22, 1, 0.36, 1)` para que a linha não pareça "travada" em scrolls rápidos.

## Fora de escopo

- Não muda layout, cores, tipografia, conteúdo dos itens, nem o destaque em cor lima do último item.
- Não adiciona ícones, numeração, fases ou badges.
- Não altera nada fora do componente `JourneyTimeline`.

## Detalhes técnicos

Arquivo único: `src/routes/index.tsx`, componente `JourneyTimeline`.

- Adicionar estado `activeStates: boolean[]` derivado da posição da linha no mesmo `useEffect` de scroll. Substitui o `IntersectionObserver` atual para o "acendimento" do marcador (mas pode manter um IO simples só para gatilho de entrada/fade-in inicial, ou unificar tudo no scroll handler).
- Cálculo: para cada item, `itemTop = itemRect.top - containerRect.top`. Se `lineHeightPx >= itemTop + size/2`, está ativo.
- Marcador vira `<span>` com classes condicionais de estado ativo/inativo.
- Pulso do último item: keyframes inline via `<style>` no componente ou classe utilitária Tailwind custom; preferência por `@keyframes` declarados em `src/styles.css` se o padrão do projeto for esse — confirmar ao implementar.
