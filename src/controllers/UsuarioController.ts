import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { UsuarioDatabase } from "../database/UsuarioDatabase";

export function login(req: Request, res: Response){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({
            status: 'fail',
            data:{
                errors: errors.array().map(error => error.msg)
            }
        });
    }

    UsuarioDatabase.getInstance().login(req.body.email, req.body.senha)
        .then(data => {
            res.status(200).send({
                status: 'success',
                data: {
                    uid: data
                }
            });
        })
        .catch(error => {
            res.status(400).send({
                status: 'fail',
                data: {
                    error: error.message
                }
            });
        });
}