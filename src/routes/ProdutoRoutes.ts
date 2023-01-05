import express, { Request, Response, Router } from "express";
import { adicionar, atualizaCompleto, atualizaPorPartes, deleta, pegarPorId, pegarTodosStatusDisponivel } from "../controllers/ProdutoController";
import { body, param, validationResult } from "express-validator";

export function ProdutoRoutes (baseUrl: string): Router {
    const router = express.Router();

    router.get(`${baseUrl}/produtos`, (req: Request, res: Response) => {
        pegarTodosStatusDisponivel(req, res);
    });
    
    router.get(`${baseUrl}/produtos/:id`, (req: Request, res: Response) => {
        pegarPorId(req, res);
    });

    router.post(`${baseUrl}/produtos`,
        body('nome', "'nome' inválido!").not().isEmpty().withMessage("'nome' está vazio!").isString().withMessage("'nome' não possui um valor válido!"),
        body('descricao', "'descricao' inválida!").not().isEmpty().withMessage("'descricao' está vazia!").isString().withMessage("'descricao' não possui um valor válido!"),
        body('preco', "'preco' inválido!").not().isEmpty().withMessage("'preco' está vazio!").isNumeric({ no_symbols: false, locale: 'en-US'}).withMessage("'preco' não possui um valor válido!"),
        body('imagens', "'imagens' inválido!").not().isEmpty().withMessage("'imagens' está vazio!").isArray().withMessage("'imagens' não possui um valor válido!"),
        body('status', "'status' inválido!").not().isEmpty().withMessage("'status' está vazio!").not().isString().withMessage("'status' não possui o formato de dado correto!").isNumeric({ no_symbols: false, locale: 'en-US'}).withMessage("'status' não possui um valor válido!").isIn([0,1]).withMessage("'status' não possui o valor de um status possível!"),
        (req: Request, res: Response) => {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                res.status(400).send({
                    status: 'fail',
                    data:{
                        errors: errors.array().map(error => error.msg)
                    }
                });
            }
            else{
                adicionar(req, res);
            }
        }
    );

    router.patch(`${baseUrl}/produtos/:id`,
        param('id', "'id' inválido!").not().isEmpty().withMessage("'id' está vazio!").isNumeric({ no_symbols: false, locale: 'en-US'}).withMessage("'id' não possui um valor válido!"),
        body('nome', "'nome' inválido!").optional().not().isEmpty().withMessage("'nome' está vazio!").isString().withMessage("'nome' não possui um valor válido!"),
        body('descricao', "'descricao' inválida!").optional().not().isEmpty().withMessage("'descricao' está vazia!").isString().withMessage("'descricao' não possui um valor válido!"),
        body('preco', "'preco' inválido!").optional().not().isEmpty().withMessage("'preco' está vazio!").isNumeric({ no_symbols: false, locale: 'en-US'}).withMessage("'preco' não possui um valor válido!"),
        body('imagens', "'imagens' inválido!").optional().not().isEmpty().withMessage("'imagens' está vazio!").isArray().withMessage("'imagens' não possui um valor válido!"),
        body('status', "'status' inválido!").optional().not().isEmpty().withMessage("'status' está vazio!").not().isString().withMessage("'status' não possui o formato de dado correto!").isNumeric({ no_symbols: false, locale: 'en-US'}).withMessage("'status' não possui um valor válido!").isIn([0,1]).withMessage("'status' não possui o valor de um status possível!"),
        (req: Request, res: Response) => {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                res.status(400).send({
                    status: 'fail',
                    data:{
                        errors: errors.array().map(error => error.msg)
                    }
                });
            }
            else{
                atualizaPorPartes(req, res);
            }
        }
    );

    router.put(`${baseUrl}/produtos/:id`,
        param('id').not().isEmpty().withMessage("'id' está vazio!").isNumeric({ no_symbols: false, locale: 'en-US'}).withMessage("'id' não possui um valor válido!"),
        body('nome', "'nome' inválido!").not().isEmpty().withMessage("'nome' está vazio!").isString().withMessage("'nome' não possui um valor válido!"),
        body('descricao', "'descricao' inválida!").not().isEmpty().withMessage("'descricao' está vazia!").isString().withMessage("'descricao' não possui um valor válido!"),
        body('preco', "'preco' inválido!").not().isEmpty().withMessage("'preco' está vazio!").isNumeric({ no_symbols: false, locale: 'en-US'}).withMessage("'preco' não possui um valor válido!"),
        body('imagens', "'imagens' inválido!").not().isEmpty().withMessage("'imagens' está vazio!").isArray().withMessage("'imagens' não possui um valor válido!"),
        body('status', "'status' inválido!").not().isEmpty().withMessage("'status' está vazio!").not().isString().withMessage("'status' não possui o formato de dado correto!").isNumeric({ no_symbols: false, locale: 'en-US'}).withMessage("'status' não possui um valor válido!").isIn([0,1]).withMessage("'status' não possui o valor de um status possível!"),
        (req: Request, res: Response) => {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                res.status(400).send({
                    status: 'fail',
                    data:{
                        errors: errors.array().map(error => error.msg)
                    }
                });
            }
            else {
                atualizaCompleto(req, res);
            }
        }
    );

    router.delete(`${baseUrl}/produtos/:id`,
        param('id').not().isEmpty().withMessage("'id' está vazio!").isNumeric({ no_symbols: false, locale: 'en-US'}).withMessage("'id' não possui um valor válido!"),
        (req: Request, res: Response) => {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                res.status(400).send({
                    status: 'fail',
                    data:{
                        errors: errors.array().map(error => error.msg)
                    }
                });
            }
            else{
                deleta(req, res);
            }
        }
    );

    return router;
}