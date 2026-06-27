import { Router } from 'express';
import ProdutoController from '../controllers/produtoController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { validate } from '../middlewares/validate';
import { criarProdutoValidator, atualizarProdutoValidator } from '../validators/produtoValidator';

const router = Router();

router.post('/', authMiddleware, roleMiddleware('ADMIN'), validate(criarProdutoValidator), ProdutoController.criarProduto);
router.get('/', ProdutoController.listarProdutos);
router.get('/:id', ProdutoController.obterProdutoPorId);
router.put('/:id', authMiddleware, roleMiddleware('ADMIN'), validate(atualizarProdutoValidator), ProdutoController.atualizarProduto);
router.delete('/:id', authMiddleware, roleMiddleware('ADMIN'), ProdutoController.deletarProduto);

export default router;
