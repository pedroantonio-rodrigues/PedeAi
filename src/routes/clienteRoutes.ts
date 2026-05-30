import { Router } from 'express';
import { ClienteController } from '../controllers/clienteController';

const router = Router();
const clienteController = new ClienteController();

router.post('/', clienteController.criarCliente);
router.get('/', clienteController.listarClientes);
router.get('/:id', clienteController.obterClientePorId);


export default router;