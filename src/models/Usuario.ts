export class Usuario{
    constructor(protected _uid: string, protected _nome: string, protected _email: string, protected _senha: string) {}

    get uid(): string{
        return this._uid;
    }

    get nome(): string{
        return this._nome;
    }

    set nome(nome: string){
        this._nome = nome;
    }

    get email(): string{
        return this._email;
    }

    set email(email: string){
        this._email = email;
    }

    get senha(): string{
        return this._senha;
    }

    set senha(senha: string){
        this._senha = senha;
    }    
}