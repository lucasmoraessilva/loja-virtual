import { Product } from "../entities/Product";

export interface IProductRepository{
    findAll(sellerUid: string): Promise<Product[]>;
    findAllWithAvailableStatus(sellerUid: string): Promise<Product[]>;
    findByUid(sellerUid: string, uid: string): Promise<Product>;
    add(sellerUid: string, newProduct: Product): Promise<Product>;
    update(sellerUid: string, uid: string, produto: Product): Promise<Product>;
    patch(sellerUid: string, uid: string, produto: Product): Promise<Product>;
    delete(sellerUid: string, uid: string): Promise<void>;
    findAvailableByUid(sellerUid: string, uid: string): Promise<Product>
}