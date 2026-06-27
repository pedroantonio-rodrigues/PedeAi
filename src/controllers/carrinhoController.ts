import { Request, Response } from 'express';
import carrinhoService from '../services/carrinhoService';

class CarrinhoController {

    async adicionarProduto(req: Request, res: Response) {
        try {
            const clienteId = req.user!.id;
            const { produtoId, quantidade } = req.body;

            const itemCarrinho = await carrinhoService.adicionarProduto(
                Number(clienteId),
                produtoId,
                quantidade
            );

            return res.status(201).json(itemCarrinho);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async buscarCarrinho(req: Request, res: Response) {
        try {
            const  clienteId = req.user!.id;

            const carrinho = await carrinhoService.buscarCarrinho(clienteId);

            return res.json(carrinho);

        } catch (error: any) {

            return res.status(404).json({ message: error.message });
        }
    }

    async removerProduto(req: Request, res: Response) {
        try {
            const clienteId = req.user!.id;
            const { itemId } = req.params;

            const itemRemovido = await carrinhoService.removerProduto(clienteId, Number(itemId));

            return res.json(itemRemovido);

        } catch (error: any) {

            return res.status(404).json({ message: error.message });
        }
    }

    async limparCarrinho(req: Request, res: Response) {
        try {
            const  clienteId  = req.user!.id;

            const carrinhoLimpo = await carrinhoService.limparCarrinho(clienteId);
            return res.json(carrinhoLimpo);
        } catch (error: any) {
            return res.status(404).json({ message: error.message });
        }
    }
}
export default new CarrinhoController();