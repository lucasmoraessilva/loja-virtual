import { Usuario } from "./Usuario";
import { Produto } from "./Produto";

export class Vendedor extends Usuario {
    private produtos?: Produto[];

    constructor(id: number, nome: string, email: string, senha: string) {
        super(id,nome,email,senha);
    }
}