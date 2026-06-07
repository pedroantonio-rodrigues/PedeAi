import { Request, Response } from "express";
import pedidoService from "../services/pedidoService";

class PedidoController {
    
    async finalizarPedido(req: Request, res: Response) {
        try {
            const { clienteId } = req.params;

            const pedido = await pedidoService.finalizarPedido(Number(clienteId));

            return res.status(201).json(pedido);

        } catch (error: any) {

            return res.status(400).json({ message: error.message });
        }
    }
}

export default new PedidoController();