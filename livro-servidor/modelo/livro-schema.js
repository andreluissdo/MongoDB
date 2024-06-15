const mongoose = require('./conexao');

// Definindo a estrutura do banco na variável LivroSchema
const LivroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    anoPublicacao: {
        type: Number,
        required: true
    },
    genero: {
        type: String,
        required: true
    }
});

// Criando índice composto nos campos 'titulo' e 'autor'
LivroSchema.index({ titulo: 1, autor: 1 });

// Associando LivroSchema à coleção 'livros'
const Livro = mongoose.model('Livro', LivroSchema, 'livros').findOne();

// Exportando o modelo Livro no padrão de módulo do JavaScript
module.exports = Livro;
