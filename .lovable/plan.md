## Problema

Os marcadores da timeline estão sobrepostos ao texto, em vez de ficarem sobre a linha vertical à esquerda.

## Causa

O `<span>` do marcador é `position: absolute` dentro do `<li>`, que já começa depois do `padding-left` do container (`pl-10` = 40px / `sm:pl-12` = 48px). O `left` atual (`~0.75rem`) é positivo, então o marcador cai dentro da área do texto. A linha vertical fica em `left: 12px` (mobile) / `16px` (desktop) do container — bem antes do início do `<li>`.

## Correção

Arquivo único: `src/routes/index.tsx`, componente `JourneyTimeline`.

No `<span>` do marcador:
- Trocar `left: calc(...)` inline por classes Tailwind responsivas: `left-[-27px] sm:left-[-31px]`.
- Centralizar o marcador sobre a linha via `marginLeft: -size / 2` no `style` (funciona para os dois tamanhos: 12px e 20px do item final).
- Remover o `left` do `style` inline.

Resultado: o centro do marcador fica exatamente sobre o eixo da linha vertical (12px no mobile, 16px no desktop), sem encostar no texto.

## Fora de escopo

Cores, tamanhos, animações (pulso, fade-in, sincronização com scroll) e o destaque do item final permanecem inalterados.
