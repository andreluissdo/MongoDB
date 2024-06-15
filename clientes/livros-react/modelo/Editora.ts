export class Editora {
    // Campos da classe
    private codEditora: number;
    private nome: string;

    // Construtor da classe
    constructor(codEditora: number, nome: string) {
        this.codEditora = codEditora;
        this.nome = nome;
    }

    // Métodos de acesso
    getCodEditora(): number {
        return this.codEditora;
    }

    setCodEditora(codEditora: number): void {
        this.codEditora = codEditora;
    }

    getNome(): string {
        return this.nome;
    }

    setNome(nome: string): void {
        this.nome = nome;
    }

}