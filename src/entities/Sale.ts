import { ObjectId } from "mongoose";

export class Sale {
    constructor(public _uid: string, public _buyer: ObjectId, public _products: ObjectId[]) {
        
    }

    get uid(): string {
        return this._uid;
    }

    set uid(uid: string) {
        this._uid = uid;
    }

    get buyer(): ObjectId {
        return this._buyer
    }

    set buyer(buyer: ObjectId) {
        this._buyer = buyer;
    }

    get products(): ObjectId[]{
        return this._products;
    }
    
    set products(products: ObjectId[]) {
        this._products = products;
    }
}