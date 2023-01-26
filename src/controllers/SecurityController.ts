import { Request, Response, NextFunction, RequestHandler } from "express";
import { promisify } from "util";
import GenericApiError from "../errors/GenericApiError";
import jwt, { Jwt, JwtPayload, VerifyOptions } from "jsonwebtoken";
import mongoose from "mongoose";
import { BuyerModel } from "../models/BuyerModel";
import { SellerModel } from "../models/SellerModel";
import { UserType } from "../aliases/UserType";

export function authorization(userType: UserType | UserType[]): RequestHandler {
    return async (request: Request, _: Response, next: NextFunction) => {
        let token;
        if(request.headers.authorization && request.headers.authorization.startsWith('Bearer')){
            token = request.headers.authorization.split(' ')[1];
        }

        if(!token){
            return next(new GenericApiError('É necessário estar logado para acessar este recurso.', 401, 'fail'));
        }

        const payload = await promisify<string, string, object, JwtPayload>(jwt.verify)(token, process.env.JWT_SECRET!, {});

        if(Date.now() >= (payload._exp * 1000)) {
            return next(new GenericApiError('Token expirado. Realize o login novamente para acessar este recurso.', 401, 'fail'));
        }

        if(Array.isArray(userType) && !userType.includes(payload._type)) {
            return next(new GenericApiError('Acesso negado. Você não pode acessar este recurso.', 401, 'fail'));
        }

        if(typeof userType === 'string' && payload._type !== userType) {
            return next(new GenericApiError('Acesso negado. Você não pode acessar este recurso.', 401, 'fail'));
        }

        mongoose.connect(process.env.DB_CONNECTION_STRING!.replace('<PASSWORD>', process.env.DB_PASSWORD!));
        mongoose.set('strictQuery', false);

        const sellerExistsResult = await SellerModel.exists({ _uid: payload._uid });
        const buyerExistsResult = await BuyerModel.exists({ _uid: payload._uid });

        if(!sellerExistsResult && !buyerExistsResult){
            return next(new GenericApiError('Token inválido. Realize o login novamente.', 401, 'fail'));
        }

        next();
    }
}