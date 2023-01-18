import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { IUserRepository } from "../repositories/IUserRepository";

export default class UsuarioController{
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async login(req: Request, res: Response){
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
        
            const _uid = await this.userRepository.login(req.body.email, req.body.senha);

            const token = await jwt.sign({ _uid }, process.env.JWT_SECRET!, { expiresIn: "6h" });

            res.status(200).send({
                status: 'success',
                data: {
                    token
                }
            });
        }
        catch (error) {
            res.status(400).send({
                status: 'fail',
                data: {
                    error: error.message
                }
            });
        }
    }

} 