import { NextFunction, Request, Response } from "express";
import GenericApiError from "../errors/GenericApiError";

export default class ErrorController {
    resourceNotFound(request: Request, _: Response, next: NextFunction){
        next(new GenericApiError(
            `O recurso ${request.url} não existe!`,
            400,
            'fail'
        ));
    }
}

export function errorHandlingMiddleware(error: GenericApiError, request: Request, response: Response) {
    response.status(error.statusCode).json({
        status: error.status,
        message: error.message
    });
}