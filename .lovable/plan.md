## Objetivo

Deixar o bloco do QR code + logo Faculdade Unypública na seção "Certificado reconhecido pelo MEC" mais sofisticado, replicando o tratamento usado no projeto "Combo Aniversário Food Smart" e visível no print enviado: cards brancos arredondados com um **glow suave** ao redor, criando profundidade sobre o fundo escuro.

## Referência analisada

No projeto Combo Aniversário (`src/pages/Index.tsx` linhas 207–227), os cards usam:
- `rounded-2xl bg-white shadow-glow`
- QR card: `p-3` com imagem `h-32 w-32` (128px)
- Logo card: `p-5` com logo `h-20 w-auto object-contain`
- Caption pequena abaixo do QR: `text-xs text-white/70`
- `shadow-glow` = `0 20px 60px -10px <cor com 45% alpha>` (no Combo é amarelo; aqui adaptaremos à paleta do projeto)

## Mudanças em `src/routes/index.tsx` (seção certificacao, ~linhas 844–875)

1. **Glow nos dois cards** — adicionar `boxShadow` suave usando a cor de destaque cyan (`#2DD2E3`) com baixa opacidade, ex.: `0 20px 60px -10px rgba(45,210,227,0.35)`, para criar o halo visto no print sem destoar da paleta.

2. **QR card**
   - Reduzir padding interno de `20px` → `12px` (mais próximo ao card do QR no print, onde a moldura branca é fina)
   - Manter QR em ~128px
   - Manter o link clicável para o e-MEC

3. **Logo card**
   - Padding `24px`, manter `min-height` para igualar altura com o QR card
   - Logo centralizada com `maxHeight: 80px`

4. **Caption "Verifique no e-MEC"**
   - Mantém Poppins Regular, tamanho pequeno
   - Mantém cor cyan `#2DD2E3` (já está nesse tom no projeto; o print mostra um cinza claro, mas você pediu explicitamente cyan na iteração anterior — manterei cyan salvo orientação contrária)

5. **Container do conjunto**
   - Mantém `max-width: 600px`, centralizado, gap entre cards, empilhamento no mobile (já implementado)

## Fora de escopo

- Não mudar copy, ícone do escudo, título ou parágrafo descritivo da seção
- Não mudar nenhuma outra seção da página
- Não alterar tokens globais nem `src/styles.css`

## Pergunta aberta

A cor do glow deve ser **cyan** (`#2DD2E3`, combina com a caption e a paleta da página) ou **lime** (`#BFF60C`, mesma cor das linhas decorativas no topo de cada seção)? Por padrão vou usar **cyan** por harmonizar melhor com o tom warm/suave do print. Avise se preferir lime.
