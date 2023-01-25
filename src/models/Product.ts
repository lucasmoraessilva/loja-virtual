import { ProductStatus } from "../enums/ProductStatus";
import { Sale } from "./Sale";

export class Product{
    constructor(public _uid: string, public _name: string, public _description: string, public _price: number, public _images: string[], public _status: ProductStatus, public _sales: Sale[]) {
    }

    get uid(): string{
        return this._uid;
    }

    get name(): string{
        return this._name;
    }

    set name(value: string){
        this._name = value;
    }

    get description(): string{
        return this._description;
    }

    set description(value: string){
        this._description = value;
    }

    get price(): number{
        return this._price;
    }

    set price(value: number){
        this._price = value;
    }

    get images(): string[]{
        return this._images;
    }

    set images(value: string[]){
        this._images = value;
    }

    get status(): ProductStatus{
        return this._status;
    }

    set status(value: ProductStatus){
        this._status = value;
    }

    get sales(): Sale[] | Sale {
        return this._sales;
    }

    set sales(sales: Sale[] | Sale) {
        Array.isArray(sales) ? sales.forEach(sale => this._sales.push(sale)) : this._sales.push(sales);
    }
}