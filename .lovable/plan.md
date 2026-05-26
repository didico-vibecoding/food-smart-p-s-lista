# Plano: variação cromática entre seções

Objetivo: quebrar a repetição do fundo escuro alternado, mantendo a coesão da identidade Food Smart, usando **gradientes sutis** como base e **duas seções-âncora em destaque**.

## Princípios

- Paleta da marca preservada: `#1D223B`, `#252A45`, `#EE3C30`, `#BFF60C`, `#2DD2E3`.
- Sem fundos brancos nem cores fora do brandbook.
- Gradientes sempre sutis (low contrast entre stops), com texto branco mantendo legibilidade AA.
- Glows/blurs decorativos das cores da marca em opacidade baixa (5–15%).

## Tratamento por seção

| # | Seção | Tratamento novo |
|---|---|---|
| 1 | Hero | Gradiente radial sutil do canto inferior esquerdo: `#1D223B` → `#252A45`, com glow ciano discreto atrás da headline |
| 2 | Institucional (ecossistema + 3 cards) | Gradiente linear diagonal `#252A45` → `#1D223B` |
| **2.5** | **Âncora "+4.000 profissionais"** | **Faixa separada em fundo lime `#BFF60C` sólido com texto `#1D223B` em Poppins Black gigante. Quebra forte do ritmo escuro.** |
| 3 | Transformação (checkmarks) | Gradiente vertical `#1D223B` → `#1A1F36` (levemente mais escuro embaixo) |
| 4 | Carreira (dados de mercado) | Gradiente diagonal `#252A45` → `#2A2F4F` com blob radial vermelho `#EE3C30` em 8% opacidade no canto superior direito |
| **5** | **Âncora Módulos** | **Fundo gradiente escuro com glow ciano `#2DD2E3` em 12% opacidade ao centro. Cards dos módulos ganham fundo `#1D223B` sólido com borda ciano mais marcada e hover com leve brilho lime. Faixa CTA pós-módulos com gradiente lime→ciano sutil em fundo escuro.** |
| 6 | Diferenciais | Gradiente linear horizontal `#252A45` → `#1D223B` |
| 7 | Certificação MEC | Fundo `#1D223B` com glow radial lime atrás do ícone de escudo |
| 8 | Prova Social | Gradiente diagonal invertido `#252A45` → `#1D223B` |
| 9 | Corpo Docente | Fundo `#1D223B` com gradiente sutil ciano no rodapé da seção (transição para CTA) |
| 10 | CTA Final | Gradiente radial `#1D223B` → `#252A45` com linha decorativa lime no topo (já existente) e glow lime atrás do botão |
| Footer | Mantém `#0F1220` sólido |

## Implementação técnica

- Substituir os `backgroundColor` planos por `background` com `linear-gradient` / `radial-gradient` inline.
- Para os glows decorativos, usar `<div>` absoluto com `filter: blur(120px)`, `opacity: 0.10–0.15`, `pointer-events: none`, posicionado dentro da seção `relative overflow-hidden`.
- A âncora "+4.000" deixa de ser apenas texto centralizado dentro da seção institucional — vira **uma seção própria** (full-width band) entre Institucional e Transformação, com `padding: py-20`, fundo lime sólido e número em ~`text-7xl` Poppins Black em `#1D223B`.
- Módulos: além do glow ciano de fundo, aumentar a presença da borda ciano dos cards (de 4px para um left-border + sutil ring), e a faixa do CTA logo abaixo do grid ganha tratamento próprio com gradiente.

## Fora do escopo

- Não mexer em copy, estrutura de seções, hierarquia de títulos, layout responsivo nem links.
- Não alterar a foto da Paula, ícones existentes ou tipografia.
- Não trocar cores da marca por novas.
