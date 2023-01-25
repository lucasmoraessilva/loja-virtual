import mongoose from "mongoose";
import { ProductStatus } from "../../enums/ProductStatus";
import GenericApiError from "../../errors/GenericApiError";
import { Product } from "../../entities/Product";
import { IProductRepository } from "../IProductRepository";
import { SellerModel } from "../../models/SellerModel";
import { ProductModel } from "../../models/ProductModel";

export class MongoProductRepository implements IProductRepository {
    private connectionString: string;

    constructor() {
        this.connectionString = process.env.DB_CONNECTION_STRING!.replace('<PASSWORD>', process.env.DB_PASSWORD!);
        mongoose.set('strictQuery', false);
    }

    private replaceProductValues(sourceProduct: any, productToBeUpdated: any){
        Object.keys(sourceProduct).forEach(key => {
            if(key !== 'sales'){
                productToBeUpdated[`_${key}`] = sourceProduct[key];
            }
        });
    }

    findAll(sellerUid: string): Promise<Product[]> {
        return new Promise(async (resolve, reject) => {
            try {
                mongoose.connect(this.connectionString);

                const seller = await SellerModel.findOne({ _uid: sellerUid }, '_products');

                resolve(Object.assign(Array<Product>(), seller!._products));
            } catch (error) {
                reject(error);
            }
        });
    }

    findAllWithAvailableStatus(sellerUid: string): Promise<Product[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const products = await this.findAll(sellerUid);

                const availableProducts = products.filter(product => product._status === 1);

                resolve(availableProducts);
            } catch (error) {
                reject(error);
            }
        });
    }

    findAvailableByUid(sellerUid: string, uid: string): Promise<Product> {
        return new Promise(async (resolve, reject) => {
            try {
                const products = await this.findAllWithAvailableStatus(sellerUid);
    
                const product = products.find(product => product._uid === uid);

                if(!product){
                    throw new GenericApiError('O produto não foi encontrado.', 400, 'fail');
                }
                
                resolve(product);
            } catch (error) {
                reject(error);
            }
        });
    }

    findByUid(sellerUid: string, uid: string): Promise<Product> {
        return new Promise(async (resolve, reject) => {
            try {
                const products = await this.findAll(sellerUid);
    
                const product = products.find(product => product._uid === uid);

                if(!product){
                    throw new GenericApiError('O produto não foi encontrado.', 400, 'fail');
                }
                
                resolve(product);
            } catch (error) {
                reject(error);
            }
        });
    }

    add(sellerUid: string, newProduct: Product): Promise<Product> {
        return new Promise(async (resolve, reject) => {
            try {
                mongoose.connect(this.connectionString);

                const newProductModel = new ProductModel({
                    _uid: newProduct._uid,
                    _name: newProduct._name,
                    _description: newProduct._description,
                    _price: newProduct._price,
                    _images: newProduct._images,
                    _status: newProduct._status
                });

                const updateResult = await SellerModel.updateOne({ _uid: sellerUid }, { $push: { _products: newProductModel } });

                if(!updateResult.acknowledged){
                    throw new GenericApiError('Não foi possível adicionar o produto.', 400, 'fail');
                }

                const addedProduct = await this.findByUid(sellerUid, newProduct._uid);
                
                resolve(addedProduct);
            } catch (error) {
                reject(error);
            }
        });
    }

    update(sellerUid: string, uid: string, productToUpdate: Product): Promise<Product> {
        return new Promise(async (resolve, reject) => {
            try {
                mongoose.connect(this.connectionString);

                const sales = (await this.findByUid(sellerUid, uid)).sales;

                const newProductModel = new ProductModel({
                    _uid: uid,
                    _name: productToUpdate.name,
                    _description: productToUpdate.description,
                    _price: productToUpdate.price,
                    _images: productToUpdate.images,
                    _status: productToUpdate.status,
                    _sales: sales
                });

                const updateResult = await SellerModel.updateOne({ '_products._uid': uid }, { $set: { '_products.$':  newProductModel } });

                if(!updateResult.modifiedCount){
                    throw new GenericApiError('Não foi possível atualizar o produto.', 400, 'fail');
                }

                const updatedProduct = await this.findByUid(sellerUid, uid);

                resolve(updatedProduct);
            } catch (error) {
                reject(error);
            }
        });
    }

    patch(sellerUid: string, uid: string, productToUpdate: Product): Promise<Product> {
        return new Promise(async (resolve, reject) => {
            try {
                mongoose.connect(this.connectionString);

                const productToBeUpdated = await this.findByUid(sellerUid, uid);

                this.replaceProductValues(productToUpdate, productToBeUpdated);

                const updateResult = await SellerModel.updateOne({ '_products._uid': uid }, { $set: { '_products.$':  productToBeUpdated } });

                if(!updateResult.modifiedCount){
                    throw new GenericApiError('Não foi possível atualizar o produto.', 400, 'fail');
                }

                const productUpdated = await this.findByUid(sellerUid, uid);

                resolve(productUpdated);
            } catch (error) {
                reject(error);
            }
        });
    }
    
    delete(sellerUid: string, uid: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                mongoose.connect(this.connectionString);

                const productToBeRemoved = await this.findByUid(sellerUid, uid);

                productToBeRemoved._status = ProductStatus.Deleted.valueOf();

                const updateResult = await SellerModel.updateOne({ '_products._uid': uid }, { $set: { '_products.$':  productToBeRemoved } });

                if(!updateResult.modifiedCount){
                    throw new GenericApiError('Não foi possível excluir o produto.', 400, 'fail');
                }
                
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }
}