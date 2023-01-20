import { Router } from "express";
import { body } from "express-validator";
import UsuarioController from "../controllers/UsuarioController";
import MongoUserRepository from "../repositories/implementations/MongoUserRepository";
import AsyncMiddlewareAdapter from "../adapters/AsyncMiddlewareAdapter";

const router = Router();
const usuarioController = new UsuarioController(new MongoUserRepository());

router.post("/login", 
    body('email', "'email' inválido!").not().isEmpty().withMessage("'email' está vazio!").isString().withMessage("'email' não possui um valor válido!").isEmail().withMessage("Formato do 'email' não é válido!"),
    body('senha', "'senha' inválida").not().isEmpty().withMessage("'senha' está vazia!").isString().withMessage("'senha' não possui um valor válido!"),
    AsyncMiddlewareAdapter(usuarioController.login)
);

export { router };