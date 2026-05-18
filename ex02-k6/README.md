# Atividade: Teste de Carga (k6), Métricas (Prometheus/Grafana) e Tracing (Jaeger)

Este repositório contém a entrega das atividades solicitadas, dividida em três partes principais. Abaixo estão as instruções detalhadas para correção.

## Pré-requisitos

Antes de iniciar, certifique-se de ter os seguintes itens instalados no seu ambiente:
- [Node.js](https://nodejs.org/)
- [k6](https://k6.io/docs/get-started/installation/)
- [Docker](https://www.docker.com/) e Docker Compose

Abra um terminal na pasta do projeto e instale as dependências do Node.js utilizadas nos simuladores:
```bash
npm install
```

---

## Tarefa 1: Teste de Carga com k6 (100 RPS por 3 min)

O script do k6 testa um endpoint `GET /products` simulando uma carga de 100 requisições por segundo durante 3 minutos e gera um relatório HTML.

**Como testar:**
1. Inicie a API Mock que receberá as requisições (rodará na porta 3000):
   ```bash
   node mock-api.js
   ```
2. Em outro terminal, execute o script do k6:
   ```bash
   k6 run load-test.js
   ```
3. **Verificação:** Ao final da execução, abra o arquivo `relatorio-k6.html` gerado no navegador. Ele exibirá o *Summary* com os gráficos, confirmando que os testes passaram (status 200).

---

## Tarefa 2: Dashboard de Testes Flaky (Prometheus e Grafana)

Foi criado um simulador em Node.js que exporta a métrica `test_failures_total` expondo falhas aleatórias de testes simulados. O Prometheus raspa esses dados e o Grafana os exibe.

**Como testar:**
1. Inicie o simulador de métricas:
   ```bash
   node metrics-simulator.js
   ```
   *(O simulador rodará expondo as métricas em http://localhost:8080/metrics)*

2. Em outro terminal, suba o Prometheus e o Grafana usando o Docker Compose:
   ```bash
   docker-compose up -d
   ```
3. Acesse o **Grafana** pelo navegador em: `http://localhost:3001`
   - **Usuário:** admin
   - **Senha:** admin
4. Vá em **Connections > Data sources** e adicione o **Prometheus** com a URL `http://prometheus:9090`. Salve.
5. **Verificação:** Vá em **Dashboards > New dashboard > Add visualization**, selecione o Prometheus e utilize a seguinte **Query** para listar o Top 10 dos testes flaky:
   ```promql
   topk(10, increase(test_failures_total[5m]))
   ```
   *(Nota: A atividade pedia `[7d]`, mas como a simulação acabou de ser iniciada, utilize `[5m]` para ver os dados gerados em tempo real na correção. Recomenda-se visualizar como formato de Tabela ou Bar Chart).*

---

## Tarefa 3: Trace com Banco de Dados Lento (Jaeger / OpenTelemetry)

Foi construído um script utilizando OpenTelemetry que gera Spans pai e filhos. O Span simulando a consulta ao banco de dados (`db-query-products`) foi configurado com um atraso intencional de 2.5 segundos para demonstrar um gargalo.

**Como testar:**
1. Suba o container do **Jaeger** (All-in-One) com suporte nativo a OTLP:
   ```bash
   docker run -d --name jaeger -e COLLECTOR_OTLP_ENABLED=true -p 16686:16686 -p 4318:4318 jaegertracing/all-in-one:latest
   ```
2. Após o Jaeger inicializar, execute o simulador de trace:
   ```bash
   node trace-simulator.js
   ```
3. **Verificação:** Acesse a interface do Jaeger no navegador em `http://localhost:16686`.
   - Em "Service", selecione `ecommerce-api` e clique em **Find Traces**.
   - Abra o trace listado e você visualizará claramente na Timeline que o Span do banco de dados (2.5s) é o responsável pela lentidão extrema na requisição `GET /products`.