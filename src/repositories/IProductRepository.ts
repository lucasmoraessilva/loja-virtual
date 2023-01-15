import { Produto } from "../models/Produto";

export interface IProductRepository{
    findAll(): Promise<Produto[]>;
    findAllWithAvailableStatus(): Promise<Produto[]>;
    findByUid(uid: string): Promise<Produto>;
    add(newProduct: Produto): Promise<Produto>;
    update(uid: string, produto: Produto): Promise<Produto>;
    patch(uid: string, produto: Produto): Promise<Produto>;
    delete(uid: string): Promise<void>;
}