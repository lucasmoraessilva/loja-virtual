import { NextFunction, RequestHandler, Request, Response } from "express";

export default (handlerFn: RequestHandler) => {
    return (req: Request,res: Response,next: NextFunction) => {
        return Promise.resolve(handlerFn(req,res,next)).catch(e => next(e));
    }
}