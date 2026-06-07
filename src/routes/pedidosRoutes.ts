import { Router } from 'express';
import PedidoController from '../controllers/pedidoController';

const router = Router();

router.post('/:clienteId/finalizar', PedidoController.finalizarPedido);

export default router;