// Importando as funções do arquivo livro-dao
const { obterLivros, incluir, excluir } = require('../modelo/livro-dao');

// Importando a biblioteca express e criando o objeto router
const express = require('express');
const router = express.Router();

// Adicionando a resposta para a rota raiz no modo GET
router.get('/', async (req, res) => {
    try {
        const livros = await obterLivros();
        res.json(livros);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao obter livros', erro: error.message });
    }
});

// Adicionando a resposta para a rota raiz no modo POST
router.post('/', async (req, res) => {
    try {
        const novoLivro = req.body;
        const livroCriado = await incluir(novoLivro);
        res.status(201).json({ mensagem: 'Livro incluído com sucesso', livro: livroCriado });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao incluir livro', erro: error.message });
    }
});

// Adicionando a resposta para a rota raiz concatenada a um segmento com o código do livro (_id) no modo DELETE
router.delete('/:codigo', async (req, res) => {
    try {
        const codigo = req.params.codigo;
        await excluir(codigo);
        res.json({ mensagem: 'Livro excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao excluir livro', erro: error.message });
    }
});

// Exportando o router no padrão de módulo do JavaScript
module.exports = router;
