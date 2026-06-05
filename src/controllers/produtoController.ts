import { Request, Response } from 'express';    
import produtoService  from "../services/produtoService";


class ProdutoController {
    async criarProduto(req: Request, res: Response) {
        try {
            const produtoData = await produtoService.criarProduto(req.body);

            return res.status(201).json(produtoData);
        } catch (error: any) {
            return res.status(400).json({ 
                message: error.message 
            });
        }   
    }
    async listarProdutos(req: Request, res: Response) {
        const produtos = await produtoService.listarProdutos();
        return res.status(200).json(produtos);
    }
}

export default new ProdutoController();