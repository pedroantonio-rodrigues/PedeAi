import {Request, Response} from 'express';
import { ClienteService } from '../services/clienteService';

const clienteService = new ClienteService();

export class ClienteController {

    async criarCliente(req: Request, res: Response) {
        try {
            const clienteData = await clienteService.criarCliente(req.body);
            return res.status(201).json(clienteData);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
        }

    async listarClientes(req: Request, res: Response) {
        const clientes = await clienteService.listarClientes();

        return res.json(clientes);
    }

    async obterClientePorId(req: Request, res: Response) {
        const { id } = req.params;
        const cliente = await clienteService.obterClientePorId
        (Number(req.params.id)
    );

    if (!cliente) {
        return res.status(404).json({ 
            message: "Cliente não encontrado." 
        });
    }   
    return res.json(cliente);
    }
}

