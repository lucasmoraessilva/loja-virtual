export class User {
    constructor(protected _uid: string, protected _name: string, protected _email: string, protected _password: string) {}

    get uid(): string{
        return this._uid;
    }

    get name(): string{
        return this._name;
    }

    set name(nome: string){
        this._name = nome;
    }

    get email(): string{
        return this._email;
    }

    set email(email: string){
        this._email = email;
    }

    get password(): string{
        return this._password;
    }

    set password(senha: string){
        this._password = senha;
    }    
}