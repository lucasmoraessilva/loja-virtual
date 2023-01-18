import { Request, Response } from "express";
import { Produto } from "../models/Produto";
import { validationResult } from "express-validator";
import { Types } from "mongoose";
import { IProductRepository } from "../repositories/IProductRepository";


export default class ProdutoController {
    private productRepository: IProductRepository;

    constructor(productRepository: IProductRepository) {
        this.productRepository = productRepository;
    }

    public async pegarTodosStatusDisponivel(_: Request, res: Response) {
        try {
            const products = await this.productRepository.findAllWithAvailableStatus();
    
            res.status(200).send({
                status: "success",
                    data: {
                        produtos: products
                    }
            });
        }
        catch (error) {
            res.status(500).send({
                status: "fail",
                data: {
                    message: "Não foi possível processar a sua requisição."
                }
            });
        }
    }
    
    async pegarPorId(req: Request, res: Response) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).send({
                    status: 'fail',
                    data:{
                        errors: errors.array().map(error => error.msg)
                    }
                });
            }

            const product = await this.productRepository.findByUid(req.params.uid);
    
            res.status(200).send({
                status: "success",
                data: {
                    produto: product
                }
            });
        }
        catch (error) {
            res.status(400).send({
                status: 'fail',
                data:{
                    error: error.message
                }
            });
        }
    }
    
    async adicionar(req: Request,res: Response) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).send({
                    status: 'fail',
                    data:{
                        errors: errors.array().map(error => error.msg)
                    }
                });
            }
        
            const addedProduct = await this.productRepository.add(
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
        catch (error) {
            res.status(400).send({
                status: 'fail',
                data:{
                    message: error.message
                }
            })
        }
    }
    
    async atualizaPorPartes(req: Request,res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).send({
                    status: 'fail',
                    data:{
                        errors: errors.array().map(error => error.msg)
                    }
                });
            }
            
            await this.productRepository.patch(req.params.uid, req.body);

            res.status(204).send();
        }
        catch (error) {
            res.status(400).send({
                status: "fail",
                data: {
                    error: error.message
                }
            });
        }
    }
    
    async atualizaCompleto(req: Request,res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).send({
                    status: 'fail',
                    data:{
                        errors: errors.array().map(error => error.msg)
                    }
                });
            }
        
            await this.productRepository.update(req.params.uid, req.body);

            res.status(204).send();
        }
        catch (error) {
            res.status(400).send({
                status: "fail",
                data: {
                    error: error.message
                }
            });
        }
    }
    
    async deleta(req: Request,res: Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).send({
                    status: 'fail',
                    data:{
                        errors: errors.array().map(error => error.msg)
                    }
                });
            }
        
            this.productRepository.delete(req.params.uid);

            res.status(204).send();
        }
        catch (error) {
            res.status(400).send({
                status: "fail",
                data: {
                    message: error.message
                }
            });   
        }
    }
}
