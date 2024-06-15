import React, { useState, useEffect } from 'react';
import { ControleLivros } from '../src/controle/ControleLivros';
import { ControleEditora } from '../src/controle/ControleEditora';
import { useNavigate } from 'react-router-dom';
import { Livro } from '../src/modelo/Livro'; // Importe a classe Livro

const LivroDados = () => {
  // Instanciar controladores de livros e editoras
  const controleLivro = new ControleLivros();
  const controleEditora = new ControleEditora();

  // Definir estados para as propriedades do livro
  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [autores, setAutores] = useState('');
  const [codEditora, setCodEditora] = useState('');

  // Vetor de opções para as editoras
  const [opcoes, setOpcoes] = useState([]);

  // Hook para navegação
  const navigate = useNavigate();

  // Efeito para carregar as opções de editoras ao montar o componente
  useEffect(() => {
    const carregarOpcoes = async () => {
      try {
        const editoras = await controleEditora.getEditoras();
        const opcoesFormatadas = editoras.map(editora => ({
          value: editora.codEditora.toString(),
          text: editora.nome
        }));
        setOpcoes(opcoesFormatadas);
        setCodEditora(opcoesFormatadas.length > 0 ? opcoesFormatadas[0].value : ''); // Seleciona a primeira editora por padrão
      } catch (error) {
        console.error('Erro ao carregar editoras:', error);
      }
    };

    carregarOpcoes();
  }, []); // Executa apenas uma vez ao montar o componente

  // Método para tratar mudanças na seleção da editora
  const tratarCombo = (event) => {
    setCodEditora(event.target.value);
  };

  // Método assíncrono para incluir um novo livro
  const incluir = (event) => {
    event.preventDefault();
    const autoresArray = autores.split('\n');
    const novoLivro = new Livro('', Number(codEditora), titulo, resumo, autoresArray); // Utiliza texto vazio para o código do livro
    controleLivro.incluir(novoLivro)
      .then(() => navigate('/')) // Navega de volta para a página inicial após a inclusão
      .catch(error => console.error('Erro ao incluir livro:', error));
  };

  return (
    <main>
      <h2>Cadastro de Livro</h2>
      <form onSubmit={incluir}>
        <div>
          <label>Título:</label>
          <input type="text" value={titulo} onChange={(event) => setTitulo(event.target.value)} />
        </div>
        <div>
          <label>Resumo:</label>
          <input type="text" value={resumo} onChange={(event) => setResumo(event.target.value)} />
        </div>
        <div>
          <label>Autores:</label>
          <textarea value={autores} onChange={(event) => setAutores(event.target.value)} />
        </div>
        <div>
          <label>Editora:</label>
          <select value={codEditora} onChange={tratarCombo}>
            {opcoes.map(opcao => (
              <option key={opcao.value} value={opcao.value}>{opcao.text}</option>
            ))}
          </select>
        </div>
        <button type="submit">Incluir</button>
      </form>
    </main>
  );
}

export default LivroDados;
