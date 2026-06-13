import { Router } from 'express';
import PedidoController from '../controllers/pedidoController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';

const router = Router();

router.get('/', PedidoController.listarPedidos);
router.get('/cliente/:clienteId', PedidoController.listarPedidosPorCliente);
router.get('/:pedidoId', PedidoController.buscarPedidoPorId);
router.post('/:clienteId/finalizar', PedidoController.finalizarPedido);
router.patch('/:pedidoId/status',authMiddleware, roleMiddleware ('ADMIN'), PedidoController.atualizarStatusPedido);


export default router;