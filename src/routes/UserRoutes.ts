import { Router } from "express";
import { body } from "express-validator";
import UserController from "../controllers/UserController";
import MongoUserRepository from "../repositories/implementations/MongoUserRepository";
import AsyncMiddlewareAdapter from "../adapters/AsyncMiddlewareAdapter";

const router = Router();
const userController = new UserController(new MongoUserRepository());

router.post("/login", 
    body('email', "'email' inválido!").not().isEmpty().withMessage("'email' está vazio!").isString().withMessage("'email' não possui um valor válido!").isEmail().withMessage("Formato do 'email' não é válido!"),
    body('password', "'password' inválida").not().isEmpty().withMessage("'password' está vazia!").isString().withMessage("'password' não possui um valor válido!"),
    AsyncMiddlewareAdapter(userController.login)
);

export { router };