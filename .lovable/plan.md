## Objetivo

No carrossel de professores da seção "Uma formação construída por quem conhece o mercado", remover o salto de volta ao início quando chega no último card (Camila Bonatto). O carrossel deve continuar avançando indefinidamente para a direita, repetindo os professores em loop contínuo (depois da Camila vem a Paula Eloize novamente, e assim por diante), sem nenhuma animação reversa visível.

## Mudanças em `src/routes/index.tsx` — componente `TeachersCarousel` (linhas ~567–672)

1. **Duplicar a lista renderizada** — em vez de mapear apenas `TEACHERS`, renderizar `[...TEACHERS, ...TEACHERS]` dentro do trilho. Isso garante que sempre exista um próximo card real à direita quando o índice ultrapassa o tamanho original.

2. **Avanço sempre para frente** — substituir a lógica atual de `setIndex((i) => (i >= maxIndex ? 0 : i + 1))` por `setIndex((i) => i + 1)`. O autoplay (a cada 3s) e o swipe por toque passam a apenas incrementar.

3. **Reset invisível ao completar uma volta** — quando o índice atinge `TEACHERS.length` (ou seja, completou um ciclo completo e está exibindo a cópia da Paula Eloize na mesma posição visual que a Paula original), fazer o reset para `index = 0` **com a transição desativada momentaneamente** (`transition: none`), de modo que o usuário não veja o "snap" — visualmente o carrossel continua fluindo para frente para sempre.
   - Implementação: usar `transitionend` no trilho ou um `useEffect` que, ao detectar `index >= TEACHERS.length`, alterna um flag `disableTransition`, faz `setIndex(0)`, e na próxima frame reativa a transição.

4. **Swipe por toque** — manter o swipe para esquerda como avanço (`i + 1`); para o swipe para a direita (voltar), manter o comportamento atual, mas permitir ir para índices negativos com a mesma técnica de duplicação/reset invisível, ou simplesmente bloquear o retrocesso abaixo de 0 (decisão menor, mantenho o bloqueio em 0 para simplificar — ver pergunta aberta).

5. **Bullets de paginação** — continuar mostrando `TEACHERS.length` bullets (10), e marcar como ativo `index % TEACHERS.length`. Ao clicar num bullet, ir diretamente para esse índice (sem reset) usando o caminho mais curto à frente.

## Fora de escopo

- Não alterar fotos, nomes, áreas de atuação, cores, espaçamentos, fundo do card ou qualquer outro estilo visual
- Não mudar o `perPage` responsivo (1 / 2 / 4) nem o intervalo de 3s do autoplay
- Não tocar em nenhuma outra seção da página

## Pergunta aberta

O swipe para a **direita** (voltar) deve:
- (a) Continuar como hoje, parando no primeiro card (sem loop reverso) — **default que vou adotar**, mais simples e o usuário pediu só sobre o avanço; ou
- (b) Também fazer loop infinito ao contrário (depois da Paula volta para Camila).

Me avise se prefere (b); caso contrário sigo com (a).
