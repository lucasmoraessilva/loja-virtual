import mongoose, { Schema, Model } from "mongoose";
import { Produto } from "../../models/Produto";
import { ProdutoSchema } from "../../schemas/ProdutoSchema";
import { IProductRepository } from "../IProductRepository";

export class MongoProductRepository implements IProductRepository {
    private connectionString: string;
    private productSchema: Schema<typeof ProdutoSchema>;
    private productModel: Model<typeof ProdutoSchema>;

    constructor() {
        this.connectionString = process.env.DB_CONNECTION_STRING!.replace('<PASSWORD>', process.env.DB_PASSWORD!);
        this.productSchema = new Schema(ProdutoSchema);
        this.productModel = mongoose.model('Product',this.productSchema, 'produtos');
        mongoose.set('strictQuery', false);
    }

    findAll(): Promise<Produto[]> {
        return new Promise(async (resolve, reject) => {
            try {
                mongoose.connect(this.connectionString);
    
                const prdModel = this.productModel;

                const products = await prdModel.find({},'-_id _uid _nome _descricao _preco _imagens _status');

                resolve(Object.assign(Array<Produto>(), products));
            } catch (error) {
                reject(error);
            }
        });
    }

    findAllWithAvailableStatus(): Promise<Produto[]> {
        return new Promise(async (resolve, reject) => {
            try {
                mongoose.connect(this.connectionString);
    
                const prdModel = this.productModel;

                const products = await prdModel.find({ _status: 1 }, '-_id _uid _nome _descricao _preco _imagens _status');

                resolve(Object.assign(Array<Produto>(), products));
            } catch (error) {
                reject(error);
            }
        });
    }

    findByUid(uid: string): Promise<Produto> {
        return new Promise(async (resolve, reject) => {
            try {
                mongoose.connect(this.connectionString);
    
                const prdModel = this.productModel;

                const product = await prdModel.findOne({ _uid: uid }, '-_id _uid _nome _descricao _preco _imagens _status');
                
                resolve(product!.toObject<Produto>());
            } catch (error) {
                reject(error);
            }
        });
    }

    add(newProduct: Produto): Promise<Produto> {
        return new Promise(async (resolve, reject) => {
            try {
                mongoose.connect(this.connectionString);
    
                const prdModel = this.productModel;

                const addedProduct = await prdModel.create(newProduct);
                
                resolve(addedProduct!.toObject<Produto>()); // Remover propriedades que não são importantes de estar na resposta
            } catch (error) {
                reject(error);
            }
        });
    }

    update(uid: string, productToUpdate: Produto): Promise<Produto> {
        return new Promise(async (resolve, reject) => {
            try {
                mongoose.connect(this.connectionString);
    
                const prdModel = this.productModel;

                await prdModel.replaceOne({ _uid: uid }, productToUpdate);

                const updatedProduct = await prdModel.findOne({ _uid: uid });

                resolve(updatedProduct!.toObject<Produto>()); // Remover propriedades que não são importantes de estar na resposta
            } catch (error) {
                reject(error);
            }
        });
    }

    patch(uid: string, productToUpdate: Produto): Promise<Produto> {
        return new Promise(async (resolve, reject) => {
            try {
                mongoose.connect(this.connectionString);
    
                const prdModel = this.productModel;

                await prdModel.updateOne({ _uid: uid }, productToUpdate);

                const updatedProduct = await prdModel.findOne({ _uid: uid });

                resolve(updatedProduct!.toObject<Produto>()); // Remover propriedades que não são importantes de estar na resposta
            } catch (error) {
                reject(error);
            }
        });
    }
    
    delete(uid: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                mongoose.connect(this.connectionString);
    
                const prdModel = this.productModel;

                const a = await prdModel.deleteOne({ _uid: uid });
                
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }
}