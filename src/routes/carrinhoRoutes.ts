import { Router } from 'express';
import CarrinhoController from '../controllers/carrinhoController';

const router = Router();

router.get('/:clienteId', CarrinhoController.buscarCarrinho);
router.post('/:clienteId/adicionar', CarrinhoController.adicionarProduto);
router.delete('/item/:itemId', CarrinhoController.removerProduto);
router.delete('/:clienteId', CarrinhoController.limparCarrinho);

export default router;