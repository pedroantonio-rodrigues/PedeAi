import { Request, Response } from "express";
import pedidoService from "../services/pedidoService";

class PedidoController {
    
    async finalizarPedido(req: Request, res: Response) {
        try {
            const clienteId = req.user!.id;

            const pedido = await pedidoService.finalizarPedido (clienteId);

            return res.status(201).json(pedido);

        } catch (error: any) {

            return res.status(400).json({ message: error.message });
        }
    }

    async listarPedidos(req: Request, res: Response) {

        try {

            const pedidos = await pedidoService.listarPedidos();

            return res.json(pedidos);

        } catch (error: any) {

            return res.status(500).json({ message: error.message });
        }
    }

    async buscarPedidoPorId(req: Request, res: Response) {

        try {

            const { pedidoId } = req.params;

            const pedido = await pedidoService.buscarPedidoPorId(Number(pedidoId));

            return res.json(pedido);

        } catch (error: any) {

            return res.status(404).json({ message: error.message });
        }
    }

    async listarPedidosPorCliente(req: Request, res: Response) {

        try {

            const clienteId  = req.user!.id;

            const pedidos = await pedidoService.listarPedidosPorCliente(clienteId);

            return res.json(pedidos);

        } catch (error: any) {

            return res.status(500).json({ message: error.message });
        }
    }

    async atualizarStatusPedido(req: Request, res: Response) {
        try {

            const { pedidoId } = req.params;
            const { status } = req.body;

            const pedido = await pedidoService.atualizarStatusPedido(Number(pedidoId), status);

            return res.json(pedido);

        } catch (error: any) {

            return res.status(400).json({ message: error.message });
        }
    }           
}

export default new PedidoController();