# Documentação de Arquitetura

## Resumo da Escolha
Optamos por uma Single Page Application (SPA) utilizando React e Vite para priorizar uma experiência de usuário altamente interativa e um ciclo de desenvolvimento ágil. Essa abordagem aproveita um rico ecossistema client-side para gerenciar estados complexos na navegação do catálogo sem recarregamentos completos de página, enquanto o Vite garante uma performance de build otimizada.

## Motivos Técnicos

- **Interatividade rica no Client-Side**: O modelo de componentes e o gerenciamento de estado do React são ideais para lidar com estados de interface complexos e interconectados, como filtros de categoria, ordenação dinâmica e paginação em tempo real. Isso resulta em uma experiência fluida, contínua e similar a um aplicativo nativo para o usuário que navega pelo catálogo.
- **Velocidade de desenvolvimento e Tooling**: O Vite oferece uma performance de build excepcional e Hot Module Replacement (HMR) quase instantâneo ao aproveitar os módulos ES nativos do navegador. Quando combinado com as ferramentas de teste exigidas (como Vitest e React Testing Library), isso acelera drasticamente o loop de feedback durante a implementação dos testes automatizados e a integração com o Storybook.
- **Arquitetura Desacoplada**: A adoção de uma SPA estabelece uma separação rígida entre o frontend e a camada de dados (consumida via APIs simuladas). Essa separação de responsabilidades permite que a interface escale de forma independente, facilitando a adoção de padrões arquiteturais limpos e tornando o sistema flexível para a integração futura com um backend real ou arquitetura de microsserviços.

## Trade-offs

- **Desafios de SEO**: Rastreadores de motores de busca podem ter dificuldade em indexar conteúdo renderizado no lado do cliente em comparação com HTML pré-renderizado, o que exigiria configurações adicionais (como dynamic rendering) se a descoberta orgânica fosse a prioridade número um.
- **Carga inicial mais lenta (TTFB / LCP)**: O navegador precisa baixar, analisar e executar o pacote JavaScript antes de renderizar os produtos, o que pode atrasar o Time to First Byte e o Largest Contentful Paint em conexões mais lentas.
- **Carga de processamento no Cliente**: A forte dependência do JavaScript transfere o esforço computacional para o dispositivo do usuário, podendo degradar a performance em smartphones mais antigos caso técnicas de otimização não sejam estritamente aplicadas.
- **Gerenciamento do tamanho do Bundle**: À medida que a aplicação cresce, o pacote inicial de JavaScript pode se tornar inchado, exigindo vigilância constante, code-splitting agressivo e lazy-loading para manter as métricas do Core Web Vitals saudáveis.

## Plano de Migração (Para SSG/SSR via Next.js, por exemplo)

- Migrar a lógica de roteamento (ex: `react-router-dom`) para o sistema de rotas baseado em arquivos do Next.js (App Router).
- Extrair o consumo da API da listagem de produtos do client-side e movê-lo para o servidor durante o build (utilizando funções nativas de `fetch` com cache configurado), gerando o HTML estático das páginas do catálogo.
- Isolar os componentes que exigem alta interatividade (como a barra de busca e os filtros) utilizando a diretiva `"use client"`, garantindo que mantenham o gerenciamento de estado complexo, enquanto a estrutura ao redor permanece pré-renderizada.