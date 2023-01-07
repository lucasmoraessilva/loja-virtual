import { Request, Response } from "express";
import { Produto } from "../models/Produto";
import { validationResult } from "express-validator";
import { ProdutoDatabase } from "../database/ProdutoDatabase";
import { Types } from "mongoose";

export function pegarTodosStatusDisponivel(_: Request, res: Response) {
    ProdutoDatabase.getInstance().pegarProdutosStatusDisponivel()
        .then(data => {
            res.status(200).send({
                status: "success",
                data: {
                    produtos: data
                }
            });
        })
        .catch(error => {
            res.status(500).send({
                status: "fail",
                data: {
                    message: "Não foi possível processar a sua requisição."
                }
            });
        })
    
}

export function pegarPorId(req: Request, res: Response) {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({
            status: 'fail',
            data:{
                errors: errors.array().map(error => error.msg)
            }
        });
    }
    
    ProdutoDatabase.getInstance().pegarProdutoPorUid(req.params.uid)
        .then(data => {
            res.status(200).send({
                status: "success",
                data: {
                    produto: data
                }
            });
        })
        .catch(error => {
            res.status(400).send({
                status: 'fail',
                data:{
                    error: error.message
                }
            });
        });   
}

export function adicionar(req: Request,res: Response) {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({
            status: 'fail',
            data:{
                errors: errors.array().map(error => error.msg)
            }
        });
    }

    ProdutoDatabase.getInstance().adicionarProduto(
        new Produto(
            new Types.ObjectId().toHexString(),
            req.body.nome,
            req.body.descricao,
            req.body.preco,
            req.body.imagens,
            req.body.status
        )
    )
    .then(data => {
        res.status(201).send({
            status: "success",
            data: {
                produto: data
            }
        });
    })
    .catch(error =>{
        res.status(500).send({
            status: 'fail',
            data:{
                message: error.message
            }
        })
    });
}

export function atualizaPorPartes(req: Request,res: Response){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({
            status: 'fail',
            data:{
                errors: errors.array().map(error => error.msg)
            }
        });
    }
    
    ProdutoDatabase.getInstance().atualizarProduto(req.params.uid, req.body)
    .then(data => {
        res.status(200).send();
    })
    .catch(error => {
        res.status(400).send({
            status: "fail",
            data: {
                error: error.message
            }
        });
    });
}

export function atualizaCompleto(req: Request,res: Response){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({
            status: 'fail',
            data:{
                errors: errors.array().map(error => error.msg)
            }
        });
    }

    ProdutoDatabase.getInstance().atualizarProduto(req.params.uid, req.body)
    .then(data => {
        res.status(200).send();
    })
    .catch(error => {
        res.status(400).send({
            status: "fail",
            data: {
                error: error.message
            }
        });
    });
}

export function deleta(req: Request,res: Response){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({
            status: 'fail',
            data:{
                errors: errors.array().map(error => error.msg)
            }
        });
    }

    ProdutoDatabase.getInstance().deletarProduto(req.params.uid)
    .then(data => {
        res.status(200).send();
    })
    .catch(error => {
        res.status(400).send({
            status: "fail",
            data: {
                message: error.message
            }
        });
    });
}
