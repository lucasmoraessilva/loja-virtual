import { StatusProduto } from "../enums/StatusProduto";

export class Produto{
    constructor(private _id: number, private _nome: string, private _descricao: string, private _preco: number, private _imagens: string[], private _status: StatusProduto) {
    }

    get id(): number{
        return this._id;
    }

    set id(value: number){
        this._id = value;
    }

    get nome(): string{
        return this._nome;
    }

    set nome(value: string){
        this._nome = value;
    }

    get descricao(): string{
        return this._descricao;
    }

    set descricao(value: string){
        this._descricao = value;
    }

    get preco(): number{
        return this._preco;
    }

    set preco(value: number){
        this._preco = value;
    }

    get imagens(): string[]{
        return this._imagens;
    }

    set imagens(value: string[]){
        this._imagens = value;
    }

    get status(): StatusProduto{
        return this._status;
    }

    set status(value: StatusProduto){
        this._status = value;
    }
}