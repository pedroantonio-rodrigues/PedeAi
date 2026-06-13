import { Router } from 'express';
import ProdutoController from '../controllers/produtoController';   
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';

const router = Router();

router.post('/', authMiddleware, roleMiddleware('ADMIN'), ProdutoController.criarProduto);
router.get('/', ProdutoController.listarProdutos);
router.get('/:id', ProdutoController.obterProdutoPorId);
router.put('/:id', authMiddleware, roleMiddleware ('ADMIN'), ProdutoController.atualizarProduto);
router.delete('/:id', authMiddleware, roleMiddleware ('ADMIN'), ProdutoController.deletarProduto);

export default router;