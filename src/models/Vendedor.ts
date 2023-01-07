import { Usuario } from "./Usuario";
import { Produto } from "./Produto";

export class Vendedor extends Usuario {
    private _produtos?: Produto[];

    constructor(uid: string, nome: string, email: string, senha: string) {
        super(uid,nome,email,senha);
    }

    get produtos(): Produto[] {
        return this._produtos!;
    }

    set produtos(produtos: Produto[]){
        this._produtos = produtos;
    }
}