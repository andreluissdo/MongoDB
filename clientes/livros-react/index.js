const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// Configurar o aplicativo Express
const app = express();
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/livros', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Servir arquivos estáticos do diretório 'build' gerado pelo React
app.use(express.static(path.join(__dirname, 'build')));

// Direcionar todas as requisições para o index.html do build do React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Configurar a porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`A porta ${PORT} já está em uso. Tente usar outra porta.`);
  } else {
    console.error('Erro ao iniciar o servidor:', err);
  }
});
