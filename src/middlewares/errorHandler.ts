import { Request, Response, NextFunction } from "express";

export function notFoundHandler(req: Request, res: Response) {
    return res.status(404).json({ message: "Rota não encontrada." });
}

export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (res.headersSent) {
        return next(err);
    }

    // Corpo da requisição com JSON malformado (lançado por express.json())
    if (err?.type === "entity.parse.failed") {
        return res.status(400).json({ message: "JSON inválido no corpo da requisição." });
    }

    console.error(err);

    return res.status(500).json({ message: "Erro interno do servidor." });
}
