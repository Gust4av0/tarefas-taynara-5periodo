const { trace } = require('@opentelemetry/api');
// Mudança aqui: Importando o BasicTracerProvider direto da classe base
const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { Resource } = require('@opentelemetry/resources');

const provider = new NodeTracerProvider({
  resource: new Resource({
    'service.name': 'ecommerce-api',
  }),
});
const exporter = new OTLPTraceExporter({ url: 'http://localhost:4318/v1/traces' });

provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
provider.register();

const tracer = trace.getTracer('manual-tracer');

tracer.startActiveSpan('GET /products', (rootSpan) => {
  rootSpan.setAttribute('http.method', 'GET');

  tracer.startActiveSpan('auth-middleware', (authSpan) => {
    setTimeout(() => authSpan.end(), 15); // Demora 15ms
  });

  tracer.startActiveSpan('db-query-products', (dbSpan) => {
    dbSpan.setAttribute('db.system', 'postgresql');
    dbSpan.setAttribute('db.statement', 'SELECT * FROM products');
    
    setTimeout(() => {
      dbSpan.end();
      rootSpan.end(); // Finaliza a requisição inteira
      console.log('Trace enviado para o Jaeger com sucesso!');
      
      provider.forceFlush().then(() => process.exit(0));
    }, 2500); 
  });
});