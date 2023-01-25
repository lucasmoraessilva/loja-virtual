import { NextFunction, Request, Response } from "express";
import { Product } from "../entities/Product";
import { validationResult } from "express-validator";
import { Types } from "mongoose";
import { IProductRepository } from "../repositories/IProductRepository";
import ValidationError from "../errors/ValidationError";


export default class ProductController {
    private static productRepository: IProductRepository;

    constructor(productRepository: IProductRepository) {
        ProductController.productRepository = productRepository;
    }

    async getAll(request: Request, response: Response, next: NextFunction){
        const errors = validationResult(request);
        if(!errors.isEmpty()){
            return next(new ValidationError(400, 'fail', errors.array().map(error => error.msg)));
        }
        
        const products = await ProductController.productRepository.findAll(request.params.sellerUid);

        response.status(200).send({
            status: "success",
            data: {
                products
            }
        });
    }

    async getAllWithAvailableStatus(request: Request, response: Response, next: NextFunction) {
        const errors = validationResult(request);
        if(!errors.isEmpty()){
            return next(new ValidationError(400, 'fail', errors.array().map(error => error.msg)));
        }
        
        const products = await ProductController.productRepository.findAllWithAvailableStatus(request.params.sellerUid);

        response.status(200).send({
            status: "success",
            data: {
                produtos: products
            }
        });
    }

    async getAvailableByUid(request: Request, response: Response, next: NextFunction) {
        const errors = validationResult(request);
        if(!errors.isEmpty()){
            return next(new ValidationError(400, 'fail', errors.array().map(error => error.msg)));
        }

        const product = await ProductController.productRepository.findAvailableByUid(request.params.sellerUid ,request.params.uid);

        response.status(200).send({
            status: "success",
            data: {
                produto: product
            }
        });
    }
    
    async getByUid(request: Request, response: Response, next: NextFunction) {
        const errors = validationResult(request);
        if(!errors.isEmpty()){
            return next(new ValidationError(400, 'fail', errors.array().map(error => error.msg)));
        }

        const product = await ProductController.productRepository.findByUid(request.params.sellerUid ,request.params.uid);

        response.status(200).send({
            status: "success",
            data: {
                produto: product
            }
        });
    }
    
    async adicionar(request: Request, response: Response, next: NextFunction) {
        const errors = validationResult(request);
        if(!errors.isEmpty()){
            return next(new ValidationError(400, 'fail', errors.array().map(error => error.msg)));
        }
    
        const addedProduct = await ProductController.productRepository.add(request.params.sellerUid,
            new Product(
                new Types.ObjectId().toHexString(),
                request.body.name,
                request.body.description,
                request.body.price,
                request.body.images,
                request.body.status,
                request.body.sales
            )
        )
        
        response.status(201).send({
            status: "success",
            data: {
                produto: addedProduct
            }
        });
    }
    
    async atualizaPorPartes(request: Request, response: Response, next: NextFunction){
        const errors = validationResult(request);
        if(!errors.isEmpty()){
            return next(new ValidationError(400, 'fail', errors.array().map(error => error.msg)));
        }
        
        await ProductController.productRepository.patch(request.params.sellerUid, request.params.uid, request.body);

        response.status(204).send();
    }
    
    async atualizaCompleto(request: Request, response: Response, next: NextFunction){
        const errors = validationResult(request);
        if(!errors.isEmpty()){
            return next(new ValidationError(400, 'fail', errors.array().map(error => error.msg)));
        }
    
        await ProductController.productRepository.update(request.params.sellerUid, request.params.uid, request.body);

        response.status(204).send();
    }
    
    async deleta(request: Request, response: Response, next: NextFunction){
        const errors = validationResult(request);
        if(!errors.isEmpty()){
            return next(new ValidationError(400, 'fail', errors.array().map(error => error.msg)));
        }
    
        await ProductController.productRepository.delete(request.params.sellerUid, request.params.uid);

        response.status(204).send();
    }
}
