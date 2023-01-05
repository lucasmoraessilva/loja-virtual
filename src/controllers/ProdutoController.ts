import { Request, Response } from "express";
import { StatusProduto } from "../enums/StatusProduto";
import { Produto } from "../models/Produto";
import { validationResult } from "express-validator";

const produtos: Produto[] = [];

produtos.push(new Produto(Math.random(),'Jarra','Uma jarra de 500ml perfeira para colocar líquidos, como suco.',10.50,['http...','http2...'],StatusProduto.Criado));
produtos.push(new Produto(Math.random(),'Bacia','Uma bacia de 400ml perfeira para misturar ingredientes.',8.50,['http...','http2...'],StatusProduto.Criado));
produtos.push(new Produto(Math.random(),'Copo','Um copo de 200ml perfeira para beber líquidos, como suco.', 2.50,['http...','http2...'],StatusProduto.Disponível));
produtos.push(new Produto(Math.random(),'Garfo','Um garfo perfeira para comer, como macarrão.', 3.50,['http...','http2...'],StatusProduto.Disponível));

export function pegarTodosStatusDisponivel(_: Request, res: Response) {
    const prdRetorno = produtos.filter(prd => prd.status === StatusProduto.Disponível);
    res.status(200).send({
        status: "success",
        data: {
            produtos: prdRetorno
        }
    });
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
    
    const prdRetorno = produtos.find(prd => prd.id === Number.parseFloat(req.params.id));
    if(!prdRetorno){
        return res.status(400).send({
            status: 'fail',
            data:{
                message: "O 'id' do produto não foi encontrado."
            }
        });
    }

    res.status(200).send({
        status: "success",
        data: {
            produto: prdRetorno
        }
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

    const produto = req.body;
    produtos.push(
        new Produto(Math.random(),
            produto.nome,
            produto.descricao,
            produto.preco,
            produto.imagens,
            produto.status
        )
    );

    res.status(201).send({
        status: "success",
        data: {
            produtos: req.body
        }
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
    
    const indiceProduto = produtos.findIndex(produto => produto.id === Number.parseFloat(req.params.id));
    if(indiceProduto > -1){
        const produto = produtos[indiceProduto];
        if(req.body.nome){
            produto.nome = req.body.nome;
        }

        if(req.body.descricao){
            produto.descricao = req.body.descricao;
        }

        if(req.body.preco){
            produto.preco = req.body.preco;
        }

        if(req.body.imagens){
            produto.imagens = req.body.imagens;
        }

        if(req.body.status){
            produto.status = req.body.status;
        }

        res.status(200).send();
    }
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

    const indiceProduto = produtos.findIndex(produto => produto.id === Number.parseFloat(req.params.id));
    if(indiceProduto === -1){
        return res.status(400).send({
            status: "fail",
            data: {
                message: "O 'id' do produto não foi encontrado."
            }
        });
    }

    const produto = produtos[indiceProduto];

    produto.nome = req.body.nome;
    produto.descricao = req.body.descricao;
    produto.preco = req.body.preco;
    produto.imagens = req.body.imagens;
    produto.status = req.body.status;

    res.status(200).send();
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

    const indiceProduto = produtos.findIndex(produto => produto.id === Number.parseFloat(req.params.id));
    if(indiceProduto === -1){
        return res.status(400).send({
            status: "fail",
            data: {
                "message": "O 'id' do produto não foi encontrado."
            }
        });
    }

    produtos.splice(indiceProduto, 1);
    res.status(200).send({
        status: "success",
        data: null
    });
}
