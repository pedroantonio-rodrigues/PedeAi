import { Request, Response } from 'express';
import carrinhoService from '../services/CarrinhoService';

class CarrinhoController {

    async adicionarProduto(req: Request, res: Response) {
        try {
            const { clienteId } = req.params;
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
            const { clienteId } = req.params;

            const carrinho = await carrinhoService.buscarCarrinho(Number(clienteId));

            return res.json(carrinho);

        } catch (error: any) {

            return res.status(404).json({ message: error.message });
        }
    }
}
export default new CarrinhoController();