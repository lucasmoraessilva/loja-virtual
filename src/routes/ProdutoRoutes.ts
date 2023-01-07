import express from "express";
import { adicionar, atualizaCompleto, atualizaPorPartes, deleta, pegarPorId, pegarTodosStatusDisponivel } from "../controllers/ProdutoController";
import { body, param } from "express-validator";

const router = express.Router();

router.get("/", pegarTodosStatusDisponivel);
router.get("/:uid",
    param('uid', "'uid' inválido!").not().isEmpty().withMessage("'uid' está vazio!").isString().withMessage("'uid' não possui um valor válido!").isHexadecimal().withMessage("'uid' não possui um formato válido!"),
    pegarPorId
);
router.post("/",
    body('nome', "'nome' inválido!").not().isEmpty().withMessage("'nome' está vazio!").isString().withMessage("'nome' não possui um valor válido!"),
    body('descricao', "'descricao' inválida!").not().isEmpty().withMessage("'descricao' está vazia!").isString().withMessage("'descricao' não possui um valor válido!"),
    body('preco', "'preco' inválido!").not().isEmpty().withMessage("'preco' está vazio!").isNumeric({ no_symbols: false, locale: 'en-US'}).withMessage("'preco' não possui um valor válido!"),
    body('imagens', "'imagens' inválido!").not().isEmpty().withMessage("'imagens' está vazio!").isArray().withMessage("'imagens' não possui um valor válido!"),
    body('status', "'status' inválido!").not().isEmpty().withMessage("'status' está vazio!").not().isString().withMessage("'status' não possui o formato de dado correto!").isNumeric({ no_symbols: false, locale: 'en-US'}).withMessage("'status' não possui um valor válido!").isIn([0,1]).withMessage("'status' não possui o valor de um status possível!"),
    adicionar
);
router.patch("/:uid",
    param('uid', "'uid' inválido!").not().isEmpty().withMessage("'uid' está vazio!").isString().withMessage("'uid' não possui um valor válido!").isHexadecimal().withMessage("'uid' não possui um formato válido!"),
    body('nome', "'nome' inválido!").optional().not().isEmpty().withMessage("'nome' está vazio!").isString().withMessage("'nome' não possui um valor válido!"),
    body('descricao', "'descricao' inválida!").optional().not().isEmpty().withMessage("'descricao' está vazia!").isString().withMessage("'descricao' não possui um valor válido!"),
    body('preco', "'preco' inválido!").optional().not().isEmpty().withMessage("'preco' está vazio!").isNumeric({ no_symbols: false, locale: 'en-US'}).withMessage("'preco' não possui um valor válido!"),
    body('imagens', "'imagens' inválido!").optional().not().isEmpty().withMessage("'imagens' está vazio!").isArray().withMessage("'imagens' não possui um valor válido!"),
    body('status', "'status' inválido!").optional().not().isEmpty().withMessage("'status' está vazio!").not().isString().withMessage("'status' não possui o formato de dado correto!").isNumeric({ no_symbols: false, locale: 'en-US'}).withMessage("'status' não possui um valor válido!").isIn([0,1]).withMessage("'status' não possui o valor de um status possível!"),
    atualizaPorPartes
);
router.put("/:uid",
    param('uid', "'uid' inválido!").not().isEmpty().withMessage("'uid' está vazio!").isString().withMessage("'uid' não possui um valor válido!").isHexadecimal().withMessage("'uid' não possui um formato válido!"),
    body('nome', "'nome' inválido!").not().isEmpty().withMessage("'nome' está vazio!").isString().withMessage("'nome' não possui um valor válido!"),
    body('descricao', "'descricao' inválida!").not().isEmpty().withMessage("'descricao' está vazia!").isString().withMessage("'descricao' não possui um valor válido!"),
    body('preco', "'preco' inválido!").not().isEmpty().withMessage("'preco' está vazio!").isNumeric({ no_symbols: false, locale: 'en-US'}).withMessage("'preco' não possui um valor válido!"),
    body('imagens', "'imagens' inválido!").not().isEmpty().withMessage("'imagens' está vazio!").isArray().withMessage("'imagens' não possui um valor válido!"),
    body('status', "'status' inválido!").not().isEmpty().withMessage("'status' está vazio!").not().isString().withMessage("'status' não possui o formato de dado correto!").isNumeric({ no_symbols: false, locale: 'en-US'}).withMessage("'status' não possui um valor válido!").isIn([0,1]).withMessage("'status' não possui o valor de um status possível!"),
    atualizaCompleto
);
router.delete("/:uid",
    param('uid', "'uid' inválido!").not().isEmpty().withMessage("'uid' está vazio!").isString().withMessage("'uid' não possui um valor válido!").isHexadecimal().withMessage("'uid' não possui um formato válido!"),
    deleta
);

export { router };