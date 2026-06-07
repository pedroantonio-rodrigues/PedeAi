import { Router } from 'express';
import CarrinhoController from '../controllers/carrinhoController';

const router = Router();

router.post('/:clienteId/adicionar', CarrinhoController.adicionarProduto);
router.get('/:clienteId', CarrinhoController.buscarCarrinho);
export default router;