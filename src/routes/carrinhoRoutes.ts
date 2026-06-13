import { Router } from 'express';
import CarrinhoController from '../controllers/carrinhoController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authMiddleware, CarrinhoController.buscarCarrinho);
router.post('/adicionar', authMiddleware, CarrinhoController.adicionarProduto);
router.delete('/item/:itemId',authMiddleware, CarrinhoController.removerProduto);
router.delete('/limpar', authMiddleware, CarrinhoController.limparCarrinho);

export default router;