import { Router } from 'express';
import PedidoController from '../controllers/pedidoController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';

const router = Router();

router.get('/', authMiddleware, roleMiddleware('ADMIN'), PedidoController.listarPedidos);
router.get('/meus-pedidos', authMiddleware, PedidoController.listarPedidosPorCliente);
router.get('/:pedidoId', authMiddleware, roleMiddleware('ADMIN'), PedidoController.buscarPedidoPorId);
router.post('/finalizar',authMiddleware, PedidoController.finalizarPedido);
router.patch('/:pedidoId/status',authMiddleware, roleMiddleware ('ADMIN'), PedidoController.atualizarStatusPedido);


export default router;