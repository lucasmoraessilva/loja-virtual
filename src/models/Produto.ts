import { StatusProduto } from "../enums/StatusProduto";

export class Produto{
    constructor(private id: number, private nome: string, private descricao: string, private preco: number, private imagens: string[], private status: StatusProduto) {
    }
}