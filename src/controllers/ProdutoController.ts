import { NextFunction, Request, Response } from "express";
import { Produto } from "../models/Produto";
import { validationResult } from "express-validator";
import { Types } from "mongoose";
import { IProductRepository } from "../repositories/IProductRepository";
import ValidationError from "../errors/ValidationError";


export default class ProdutoController {
    private static productRepository: IProductRepository;

    constructor(productRepository: IProductRepository) {
        ProdutoController.productRepository = productRepository;
    }

    public async pegarTodosStatusDisponivel(_: Request, res: Response) {
        const products = await ProdutoController.productRepository.findAllWithAvailableStatus();

        res.status(200).send({
            status: "success",
            data: {
                produtos: products
            }
        });
    }
    
    async pegarPorId(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return next(new ValidationError(400, 'fail', errors.array().map(error => error.msg)));
        }

        const product = await ProdutoController.productRepository.findByUid(req.params.uid);

        res.status(200).send({
            status: "success",
            data: {
                produto: product
            }
        });
    }
    
    async adicionar(req: Request,res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return next(new ValidationError(400, 'fail', errors.array().map(error => error.msg)));
        }
    
        const addedProduct = await ProdutoController.productRepository.add(
            new Produto(
                new Types.ObjectId().toHexString(),
                req.body.nome,
                req.body.descricao,
                req.body.preco,
                req.body.imagens,
                req.body.status
            )
        )
        
        res.status(201).send({
            status: "success",
            data: {
                produto: addedProduct
            }
        });
    }
    
    async atualizaPorPartes(req: Request,res: Response, next: NextFunction){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return next(new ValidationError(400, 'fail', errors.array().map(error => error.msg)));
        }
        
        await ProdutoController.productRepository.patch(req.params.uid, req.body);

        res.status(204).send();
    }
    
    async atualizaCompleto(req: Request,res: Response, next: NextFunction){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return next(new ValidationError(400, 'fail', errors.array().map(error => error.msg)));
        }
    
        await ProdutoController.productRepository.update(req.params.uid, req.body);

        res.status(204).send();
    }
    
    async deleta(req: Request,res: Response, next: NextFunction){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return next(new ValidationError(400, 'fail', errors.array().map(error => error.msg)));
        }
    
        ProdutoController.productRepository.delete(req.params.uid);

        res.status(204).send();
    }
}
