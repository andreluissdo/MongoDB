// Importando a biblioteca mongoose
const mongoose = require('mongoose');

// Definindo as opções de conexão
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

// String de conexão com o banco de dados MongoDB
const uri = 'mongodb://localhost:27017/livros'; 

// Efetuando a conexão com o MongoDB
mongoose.connect(uri, options)
    .then(() => {
        console.log('Conectado ao MongoDB com sucesso');
    })
    .catch((err) => {
        console.error('Erro ao conectar ao MongoDB:', err);
    });

// Exportando a variável mongoose
module.exports = mongoose;
