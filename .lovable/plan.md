## Objetivo

Aproximar o rosto da Isabelle Sgorla dentro do card circular do carrossel — hoje a foto original mostra o corpo inteiro, então o rosto fica pequeno dentro do círculo de 96px.

## Abordagem

Aplicar um zoom via CSS apenas na foto da Isabelle, sem alterar o arquivo de imagem original e sem afetar nenhum outro card.

## Mudança em `src/routes/index.tsx`

1. **Tipo `Teacher`** (linha ~558): adicionar campo opcional `zoom?: number` (fator de escala, default 1).

2. **Array `TEACHERS`** (linhas ~566–577): adicionar `zoom: 1.6` no objeto da Isabelle Sgorla. Os demais professores ficam sem o campo (zoom = 1, comportamento atual inalterado).

3. **Render da `<img>`** dentro do `TeachersCarousel` (linhas ~648–655): aplicar `transform: scale(t.zoom ?? 1)` e `transformOrigin: "top center"` no style da imagem. O círculo continua com `overflow: hidden`, então o excesso é cortado e o rosto aparece maior e centralizado no topo.

Valor inicial proposto: **1.6**. Se ficar pouco ou demais, ajusto para 1.4 ou 1.8 numa segunda iteração.

## Fora de escopo

- Não trocar a foto da Isabelle
- Não mexer em nenhum outro card, no tamanho do círculo, no fundo do card, no autoplay nem no loop infinito
- Não alterar nenhuma outra seção
