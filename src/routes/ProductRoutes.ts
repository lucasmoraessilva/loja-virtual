import { Router } from "express";
import ProductController from "../controllers/ProductController";
import { body, param } from "express-validator";
import { MongoProductRepository } from "../repositories/implementations/MongoProductRepository";
import AsyncMiddlewareAdapter from "../adapters/AsyncMiddlewareAdapter";

const router = Router();
const productController = new ProductController(new MongoProductRepository());

router.get("/:sellerUid/products",
    param('sellerUid', "'sellerUid' inválido!").not().isEmpty().withMessage("'sellerUid' está vazio!").isString().withMessage("'sellerUid' não possui um valor válido!").isHexadecimal().withMessage("'sellerUid' não possui um formato válido!"),
    AsyncMiddlewareAdapter(productController.getAll)
);

router.get("/:sellerUid/products/:uid",
    param('sellerUid', "'sellerUid' inválido!").not().isEmpty().withMessage("'sellerUid' está vazio!").isString().withMessage("'sellerUid' não possui um valor válido!").isHexadecimal().withMessage("'sellerUid' não possui um formato válido!"),
    param('uid', "'uid' inválido!").not().isEmpty().withMessage("'uid' está vazio!").isString().withMessage("'uid' não possui um valor válido!").isHexadecimal().withMessage("'uid' não possui um formato válido!"),
    AsyncMiddlewareAdapter(productController.getByUid)
);

router.get("/:sellerUid/available-products",
    param('sellerUid', "'sellerUid' inválido!").not().isEmpty().withMessage("'sellerUid' está vazio!").isString().withMessage("'sellerUid' não possui um valor válido!").isHexadecimal().withMessage("'sellerUid' não possui um formato válido!"),
    AsyncMiddlewareAdapter(productController.getAllWithAvailableStatus)
);

router.get("/:sellerUid/available-products/:uid",
    param('sellerUid', "'sellerUid' inválido!").not().isEmpty().withMessage("'sellerUid' está vazio!").isString().withMessage("'sellerUid' não possui um valor válido!").isHexadecimal().withMessage("'sellerUid' não possui um formato válido!"),
    param('uid', "'uid' inválido!").not().isEmpty().withMessage("'uid' está vazio!").isString().withMessage("'uid' não possui um valor válido!").isHexadecimal().withMessage("'uid' não possui um formato válido!"),
    AsyncMiddlewareAdapter(productController.getAvailableByUid)
);

router.post("/:sellerUid",
    param('sellerUid', "'sellerUid' inválido!").not().isEmpty().withMessage("'sellerUid' está vazio!").isString().withMessage("'sellerUid' não possui um valor válido!").isHexadecimal().withMessage("'sellerUid' não possui um formato válido!"),
    body('name', "'name' inválido!").not().isEmpty().withMessage("'name' está vazio!").isString().withMessage("'name' não possui um valor válido!"),
    body('description', "'description' inválida!").not().isEmpty().withMessage("'description' está vazia!").isString().withMessage("'description' não possui um valor válido!"),
    body('price', "'price' inválido!").not().isEmpty().withMessage("'price' está vazio!").isNumeric({ no_symbols: false, locale: 'en-US'}).withMessage("'price' não possui um valor válido!"),
    body('images', "'images' inválido!").not().isEmpty().withMessage("'images' está vazio!").isArray().withMessage("'images' não possui um valor válido!"),
    body('status', "'status' inválido!").not().isEmpty().withMessage("'status' está vazio!").not().isString().withMessage("'status' não possui o formato de dado correto!").isNumeric({ no_symbols: false, locale: 'en-US'}).withMessage("'status' não possui um valor válido!").isIn([0,1]).withMessage("'status' não possui o valor de um status possível!"),
    AsyncMiddlewareAdapter(productController.adicionar)
);

router.patch("/:sellerUid/products/:uid",
    param('sellerUid', "'sellerUid' inválido!").not().isEmpty().withMessage("'sellerUid' está vazio!").isString().withMessage("'sellerUid' não possui um valor válido!").isHexadecimal().withMessage("'sellerUid' não possui um formato válido!"),
    param('uid', "'uid' inválido!").not().isEmpty().withMessage("'uid' está vazio!").isString().withMessage("'uid' não possui um valor válido!").isHexadecimal().withMessage("'uid' não possui um formato válido!"),
    body('name', "'name' inválido!").optional().not().isEmpty().withMessage("'name' está vazio!").isString().withMessage("'name' não possui um valor válido!"),
    body('description', "'description' inválida!").optional().not().isEmpty().withMessage("'description' está vazia!").isString().withMessage("'description' não possui um valor válido!"),
    body('price', "'price' inválido!").optional().not().isEmpty().withMessage("'price' está vazio!").isNumeric({ no_symbols: false, locale: 'en-US'}).withMessage("'price' não possui um valor válido!"),
    body('images', "'images' inválido!").optional().not().isEmpty().withMessage("'images' está vazio!").isArray().withMessage("'images' não possui um valor válido!"),
    body('status', "'status' inválido!").optional().not().isEmpty().withMessage("'status' está vazio!").not().isString().withMessage("'status' não possui o formato de dado correto!").isNumeric({ no_symbols: false, locale: 'en-US'}).withMessage("'status' não possui um valor válido!").isIn([0,1]).withMessage("'status' não possui o valor de um status possível!"),
    AsyncMiddlewareAdapter(productController.atualizaPorPartes)
);

router.put("/:sellerUid/products/:uid",
    param('sellerUid', "'sellerUid' inválido!").not().isEmpty().withMessage("'sellerUid' está vazio!").isString().withMessage("'sellerUid' não possui um valor válido!").isHexadecimal().withMessage("'sellerUid' não possui um formato válido!"),
    param('uid', "'uid' inválido!").not().isEmpty().withMessage("'uid' está vazio!").isString().withMessage("'uid' não possui um valor válido!").isHexadecimal().withMessage("'uid' não possui um formato válido!"),
    body('name', "'name' inválido!").not().isEmpty().withMessage("'name' está vazio!").isString().withMessage("'name' não possui um valor válido!"),
    body('description', "'description' inválida!").not().isEmpty().withMessage("'description' está vazia!").isString().withMessage("'description' não possui um valor válido!"),
    body('price', "'price' inválido!").not().isEmpty().withMessage("'price' está vazio!").isNumeric({ no_symbols: false, locale: 'en-US'}).withMessage("'price' não possui um valor válido!"),
    body('images', "'images' inválido!").not().isEmpty().withMessage("'images' está vazio!").isArray().withMessage("'images' não possui um valor válido!"),
    body('status', "'status' inválido!").not().isEmpty().withMessage("'status' está vazio!").not().isString().withMessage("'status' não possui o formato de dado correto!").isNumeric({ no_symbols: false, locale: 'en-US'}).withMessage("'status' não possui um valor válido!").isIn([0,1]).withMessage("'status' não possui o valor de um status possível!"),
    AsyncMiddlewareAdapter(productController.atualizaCompleto)
);

router.delete("/:sellerUid/products/:uid",
    param('sellerUid', "'sellerUid' inválido!").not().isEmpty().withMessage("'sellerUid' está vazio!").isString().withMessage("'sellerUid' não possui um valor válido!").isHexadecimal().withMessage("'sellerUid' não possui um formato válido!"),
    param('uid', "'uid' inválido!").not().isEmpty().withMessage("'uid' está vazio!").isString().withMessage("'uid' não possui um valor válido!").isHexadecimal().withMessage("'uid' não possui um formato válido!"),
    AsyncMiddlewareAdapter(productController.deleta)
);

export { router };