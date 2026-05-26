## Refinar fundo da hero — "Prismatic atmosphere"

Manter todo conteúdo, tipografia, foto, CTA e layout existentes. Apenas trocar o fundo chapado `#1D223B` por uma atmosfera com profundidade.

### Mudanças em `src/routes/index.tsx` (apenas seção HERO)

1. Adicionar `position: relative` e `overflow-hidden` no `<section>` da hero
2. Inserir 4 camadas decorativas absolutas atrás do conteúdo (z-index 0):
   - Glow ciano `#2DD2E3` 15% — canto superior esquerdo, blur 120px, com `animate-pulse` suave
   - Glow vermelho `#EE3C30` 10% — canto inferior direito, blur 150px
   - Grid pontilhado branco 3% — `radial-gradient` 32px (textura sutil)
   - Gradiente vertical de transparente → `#1D223B` na base (fade para fundir com a próxima seção)
3. Envolver o grid de conteúdo com `relative z-10` para garantir que fica sobre as camadas
4. Adicionar `drop-shadow` vermelho sutil no "Consultoria de Alimentos" para integrar com o glow
5. Adicionar glow lime `#BFF60C` 10% atrás da Paula para realçar a figura

### Não muda
- Texto, ordem mobile/desktop, posição da foto, botão CTA
- Demais seções, footer e WhatsApp flutuante
- Cores da marca (apenas usadas com baixa opacidade como luz)
