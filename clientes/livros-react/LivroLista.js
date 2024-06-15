import React, { useState, useEffect } from 'react';
import { ControleLivros } from '../src/controle/ControleLivros';
import { ControleEditora } from '../src/controle/ControleEditora';
import { Livro } from '../src/modelo/Livro'; // Importe a classe Livro

// Componente auxiliar LinhaLivro
const LinhaLivro = ({ livro, excluir }) => {
    // Instanciar o controlador de editoras
    const controleEditora = new ControleEditora();

    // Método para obter o nome da editora
    const nomeEditora = controleEditora.getNomeEditora(livro.getCodEditora());

    // Método para excluir um livro
    const handleExcluir = () => {
        excluir(livro.getCodigo());
    };

    return (
        <tr>
            <td>
                <button onClick={handleExcluir} className="btn btn-danger">Excluir</button>
            </td>
            <td>{livro.getCodigo()}</td>
            <td>{nomeEditora}</td>
            <td>{livro.getTitulo()}</td>
            <td>{livro.getResumo()}</td>
            <td>
                <ul className="list-unstyled">
                    {livro.getAutores().map((autor, index) => (
                        <li key={index}>{autor}</li>
                    ))}
                </ul>
            </td>
        </tr>
    );
};

// Componente LivroLista
const LivroLista = () => {
    // Instanciar o controlador de livros
    const controleLivros = new ControleLivros();

    // Estado para armazenar os livros e se estão carregados
    const [livros, setLivros] = useState([]);
    const [carregado, setCarregado] = useState(false);

    // Efeito para carregar os livros ao montar o componente
    useEffect(() => {
        const carregarLivros = async () => {
            try {
                const livrosCarregados = await controleLivros.obterLivros();
                setLivros(livrosCarregados);
                setCarregado(true);
            } catch (error) {
                console.error('Erro ao carregar livros:', error);
            }
        };

        carregarLivros();
    }, [carregado]);

    // Método para excluir um livro
    const excluir = async (codigoLivro) => {
        try {
            await controleLivros.excluir(codigoLivro); // Esperar pela exclusão
            setLivros(livros.filter(livro => livro.getCodigo() !== codigoLivro)); // Atualizar lista de livros
        } catch (error) {
            console.error('Erro ao excluir livro:', error);
        } finally {
            setCarregado(false); // Atualizar estado para recarregar os livros apenas ao final da operação
        }
    };

    return (
        <main>
            <h1>Lista de Livros</h1>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Ações</th>
                            <th scope="col">Código</th>
                            <th scope="col">Editora</th>
                            <th scope="col">Título</th>
                            <th scope="col">Resumo</th>
                            <th scope="col">Autores</th>
                        </tr>
                    </thead>
                    <tbody>
                        {livros.map((livro, index) => (
                            <LinhaLivro key={index} livro={livro} excluir={excluir} />
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default LivroLista;
