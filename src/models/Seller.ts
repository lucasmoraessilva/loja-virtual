import { User } from "./User";
import { Product } from "./Product";

export class Seller extends User {
    public _products: Product[];

    constructor(_uid: string, _name: string, _email: string, _password: string, _products: Product[]) {
        super(_uid, _name, _email, _password);
        this._products = _products;
    }

    get products(): Product[] | Product {
        return this._products;
    }

    set products(products: Product[] | Product) {
        Array.isArray(products) ? products.forEach(product => this._products.push(product)) : this._products.push(products);
    }
}