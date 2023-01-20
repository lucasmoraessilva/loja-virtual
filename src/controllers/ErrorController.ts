import { NextFunction, Request, Response } from "express";
import GenericApiError from "../errors/GenericApiError";
import ValidationError from "../errors/ValidationError";

export default class ErrorController {
    resourceNotFound(request: Request, _: Response, next: NextFunction){
        next(new GenericApiError(
            `O recurso ${request.url} não existe!`,
            400,
            'fail'
        ));
    }
}

export function errorHandlingMiddleware(error: GenericApiError, request: Request, response: Response, next: NextFunction) {
    response.status(error.statusCode || 500).json({
        status: error.status || 'Error',
        message: error.message || 'Falha insperada'
    });
}

export function validationErrorMiddleware(error: ValidationError, req: Request, res: Response, next: NextFunction) {
    if(!(error instanceof ValidationError)){
        return next(error);
    }

    res.status(error.statusCode).json({
        status: error.status,
        errors : error.messages
    });
}