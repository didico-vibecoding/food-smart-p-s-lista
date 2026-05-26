## Barra de navegação superior

Adicionar uma top bar que aparece quando o usuário rola para fora do hero, com 4 atalhos de seção, logo da Food Smart à esquerda e CTA "Fazer minha Pré-Inscrição" à direita.

### Seções da barra (âncoras)
- **A Pós** → seção 3 (Transformação / "Sobre a pós")
- **Módulos** → seção 5
- **Certificação** → seção 7
- **Pré-Inscrição** → seção 10 (também o CTA)

### Comportamento
- Oculta no topo da página (hero limpo).
- Aparece com fade/slide ao rolar ~80% da altura do hero.
- Fica fixa no topo (`position: fixed`) com fundo escuro semi-transparente + leve blur, na identidade visual atual.
- Destaca a seção ativa enquanto o usuário rola (observando qual `<section>` está em viewport).
- Clique faz scroll suave até a seção.

### Mobile
- Logo à esquerda + ícone de menu (hambúrguer) à direita.
- Ao tocar, abre um drawer (sheet) com os 4 links empilhados e o botão de Pré-Inscrição em destaque.

### Detalhes técnicos
- Novo componente `src/components/TopNav.tsx` montado em `src/routes/index.tsx`.
- Adicionar `id="sobre-a-pos"`, `id="modulos"`, `id="certificacao"`, `id="pre-inscricao"` nas `<section>` correspondentes do `index.tsx`.
- Visibilidade controlada por listener de `scroll` (com `requestAnimationFrame`); seção ativa via `IntersectionObserver` reaproveitando o padrão já usado no arquivo.
- Drawer mobile usando o componente `sheet` já disponível em `src/components/ui/sheet.tsx`.
- Cores e tipografia consumindo as constantes `COLORS` já definidas — sem novos tokens.
- Scroll suave via `scroll-behavior: smooth` no `html` (CSS global) + offset para compensar a altura da barra fixa (`scroll-margin-top` nas seções).
