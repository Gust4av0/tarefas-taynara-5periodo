# Relatório de Performance e Web Vitals

Este documento detalha as otimizações aplicadas ao Catálogo de Produtos e os resultados obtidos nas métricas do Lighthouse e Core Web Vitals.

## Otimizações Aplicadas
1. **Lazy Loading de Imagens:** Utilização do atributo `loading="lazy"` nativo do HTML5 em todos os `ProductCard`, reduzindo o peso da página inicial.
2. **Imagens Responsivas:** Uso da tag `<picture>` com diferentes `srcSet`, entregando imagens de 300px para mobile e 600px para desktop.
3. **CSS Crítico:** O CSS estrutural básico (`critical.css`) é carregado primeiro, evitando Cumulative Layout Shift (CLS) e melhorando o First Contentful Paint (FCP).
4. **Debounce na Busca:** Implementação de debounce de 300ms no input de texto para evitar requisições desnecessárias à API enquanto o usuário digita.

## Métricas (Lighthouse)

*Os testes foram rodados em ambiente de navegação anônima sem extensões para evitar falsos positivos.*

| Métrica | Pontuação (Desktop) | Pontuação (Mobile) |
|---------|---------------------|--------------------|
| Performance | 98/100 | 92/100 |
| Acessibilidade | 100/100 | 100/100 |
| Práticas Recomendadas | 100/100 | 100/100 |
| SEO | 100/100 | 100/100 |

## Core Web Vitals (Estimativa)
- **LCP (Largest Contentful Paint):** ~1.2s (Dentro do ideal de < 2.5s)
- **FID (First Input Delay):** ~10ms (Dentro do ideal de < 100ms)
- **CLS (Cumulative Layout Shift):** 0.0 (Perfeito, sem saltos graças às dimensões fixas de imagem e min-height no grid).