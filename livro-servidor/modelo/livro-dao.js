// Importando o modelo Livro definido em livro-schema
const Livro = require('./livro-schema');

// Função assíncrona para obter todos os livros
const obterLivros = async () => {
    try {
        // Retorna o conjunto de livros obtidos na chamada para o método find
        return await Livro.find({});
    } catch (error) {
        console.error('Erro ao obter livros:', error);
        throw error;
    }
};

// Função assíncrona para incluir um novo livro
const incluir = async (livro) => {
    try {
        // Invoca o método create do modelo Livro com o parâmetro fornecido
        return await Livro.create(livro);
    } catch (error) {
        console.error('Erro ao incluir livro:', error);
        throw error;
    }
};

// Função assíncrona para excluir um livro pelo código (_id)
const excluir = async (codigo) => {
    try {
        // Invoca o método deleteOne do modelo Livro utilizando o _id
        return await Livro.deleteOne({ _id: codigo });
    } catch (error) {
        console.error('Erro ao excluir livro:', error);
        throw error;
    }
};

// Exportando as funções no padrão de módulo do JavaScript
module.exports = {
    obterLivros,
    incluir,
    excluir
};
