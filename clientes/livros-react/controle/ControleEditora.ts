// Importar a classe Editora
import { Editora } from "../modelo/Editora";

// Definir a variável editoras, como Array<Editora>, com três elementos, no formato JSON
const editoras: Array<Editora> = [
    new Editora(1, "Editora Rocco"),
    new Editora(2, "Darkside"),
    new Editora(3, "Aleph")
];

// Criar a classe ControleEditora
export class ControleEditora {
    // Método para obter todas as editoras
    getEditoras(): Array<Editora> {
        return editoras;
    }

    // Método para obter o nome da editora com base no código da editora
    getNomeEditora(codEditora: number): string | undefined {
        const editora = editoras.find(editora => editora.getCodEditora() === codEditora);
        return editora ? editora.getNome() : undefined;
    }
}