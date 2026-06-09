import { Router } from 'express';
import PedidoController from '../controllers/pedidoController';

const router = Router();

router.get('/', PedidoController.listarPedidos);
router.get('/cliente/:clienteId', PedidoController.listarPedidosPorCliente);
router.get('/:pedidoId', PedidoController.buscarPedidoPorId);
router.post('/:clienteId/finalizar', PedidoController.finalizarPedido);
router.patch('/:pedidoId/status', PedidoController.atualizarStatusPedido);


export default router;