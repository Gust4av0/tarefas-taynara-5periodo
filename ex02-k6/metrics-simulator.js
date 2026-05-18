const express = require('express');
const client = require('prom-client');

const app = express();
const register = new client.Registry();

const testFailures = new client.Counter({
  name: 'test_failures_total',
  help: 'Total de falhas em testes',
  labelNames: ['test_name'],
});
register.registerMetric(testFailures);

const testesFlaky = [
  'Login_Test', 'Checkout_Test', 'Add_To_Cart_Test', 
  'Search_Test', 'Payment_Gateway_Test', 'User_Profile_Test',
  'Password_Reset_Test', 'Logout_Test', 'Review_Submission_Test',
  'Apply_Coupon_Test', 'Newsletter_Signup_Test'
];

setInterval(() => {
  const testeAleatorio = testesFlaky[Math.floor(Math.random() * testesFlaky.length)];
  const falhas = Math.floor(Math.random() * 5); 
  if (falhas > 0) {
    testFailures.labels(testeAleatorio).inc(falhas);
  }
}, 1000);

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Simulador de métricas rodando em http://localhost:${PORT}/metrics`);
});
