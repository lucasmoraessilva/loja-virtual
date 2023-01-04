import express, { Request, Response, Router } from "express";
import { adicionar, atualizaCompleto, atualizaPorPartes, deleta, pegarPorId, pegarTodosStatusDisponivel } from "../controllers/ProdutoController";

export function ProdutoRoutes (baseUrl: string): Router {
    const router = express.Router();

    router.get(`${baseUrl}/produtos`, (req: Request, res: Response) => {
        pegarTodosStatusDisponivel(req, res);
    });
    
    router.get(`${baseUrl}/produtos/:id`, (req: Request, res: Response) => {
        pegarPorId(req, res);
    });

    router.post(`${baseUrl}/produtos`, (req: Request, res: Response) => {
        adicionar(req, res);
    });

    router.patch(`${baseUrl}/produtos/:id`, (req: Request, res: Response) => {
        atualizaPorPartes(req, res);
    });

    router.put(`${baseUrl}/produtos/:id`, (req: Request, res: Response) => {
        atualizaCompleto(req, res);
    });

    router.delete(`${baseUrl}/produtos/:id`, (req: Request, res: Response) => {
        deleta(req, res);
    });

    return router;
}