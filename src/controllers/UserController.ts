import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import ValidationError from "../errors/ValidationError";
import { IUserRepository } from "../repositories/IUserRepository";

export default class UserController{
    private static userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        UserController.userRepository = userRepository;
    }

    async login(req: Request, res: Response, next: NextFunction){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return next(new ValidationError(400, 'fail', errors.array().map(error => error.msg)));
        }
    
        const loginResult = await UserController.userRepository.login(req.body.email, req.body.password);

        const token = await jwt.sign(loginResult, process.env.JWT_SECRET!, { expiresIn: "6h" });

        res.status(200).send({
            status: 'success',
            data: {
                token
            }
        });
    }
} 