import { Livro } from "../modelo/Livro";

// Definir a constante global baseURL, recebendo o endereço de base do servidor Express
const baseURL = "http://localhost:3030/livros";

// Definir a interface LivroMongo
interface LivroMongo {
    codigo: string; // Alterado para string para compatibilidade com MongoDB
    codEditora: number;
    titulo: string;
    resumo: string;
    autores: string[];
}

// Criar a classe ControleLivros
export class ControleLivros {
    // Método para obter todos os livros (simulado)
    async obterLivros(): Promise<Livro[]> {
        try {
            // Realizar requisição GET para obter os livros do servidor
            const response = await fetch(baseURL);
            const data = await response.json();
            
            // Mapear os dados recebidos para objetos da classe Livro
            const livros = data.map((livro: LivroMongo) => {
                return new Livro(
                    parseInt(livro.codigo), // Convertendo para number
                    livro.codEditora,
                    livro.titulo,
                    livro.resumo,
                    livro.autores
                );
            });

            return livros;
        } catch (error) {
            console.error('Erro ao obter livros:', error);
            return [];
        }
    }

    // Método para incluir um novo livro (simulado)
    async incluir(novoLivro: Livro): Promise<boolean> {
        try {
            // Montar objeto para enviar ao servidor
            const livroParaEnviar: LivroMongo = {
                codigo: novoLivro.getCodigo().toString(), // Convertendo para string
                codEditora: novoLivro.getCodEditora(),
                titulo: novoLivro.getTitulo(),
                resumo: novoLivro.getResumo(),
                autores: novoLivro.getAutores()
            };

            // Realizar requisição POST para incluir o novo livro no servidor
            const response = await fetch(baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(livroParaEnviar)
            });

            return response.ok; // Retorna true se a requisição foi bem-sucedida, caso contrário, false

        } catch (error) {
            console.error('Erro ao incluir livro:', error);
            throw error;
        }
    }

    // Método para excluir um livro com base no código (simulado)
    async excluir(codigo: string): Promise<boolean> {
        try {
            // Realizar requisição DELETE para excluir o livro no servidor
            const response = await fetch(`${baseURL}/${codigo}`, {
                method: 'DELETE'
            });

            return response.ok; // Retorna true se a requisição foi bem-sucedida, caso contrário, false

        } catch (error) {
            console.error('Erro ao excluir livro:', error);
            throw error;
        }
    }
}
