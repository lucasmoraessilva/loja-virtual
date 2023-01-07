import express from "express";
import { body } from "express-validator";
import { login } from "../controllers/UsuarioController";

const router = express.Router();

router.post("/login", 
    body('email', "'email' inválido!").not().isEmpty().withMessage("'email' está vazio!").isString().withMessage("'email' não possui um valor válido!").isEmail().withMessage("Formato do 'email' não é válido!"),
    body('senha', "'senha' inválida").not().isEmpty().withMessage("'senha' está vazia!").isString().withMessage("'senha' não possui um valor válido!"),
    login
);

export { router };