const express = require('express');
const app = express();

app.get('/products', (req, res) => {
    
  res.status(200).json([
    { id: 1, name: 'Produto Mockado 1', price: 100 },
    { id: 2, name: 'Produto Mockado 2', price: 200 }
  ]);
});

app.listen(3000, () => {
  console.log('Mock API rodando na porta 3000');
});