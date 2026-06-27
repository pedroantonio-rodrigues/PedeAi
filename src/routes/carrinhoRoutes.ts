import { Router } from 'express';
import CarrinhoController from '../controllers/carrinhoController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validate';
import { adicionarProdutoValidator, itemCarrinhoParamValidator } from '../validators/carrinhoValidator';

const router = Router();

router.get('/', authMiddleware, CarrinhoController.buscarCarrinho);
router.post('/adicionar', authMiddleware, validate(adicionarProdutoValidator), CarrinhoController.adicionarProduto);
router.delete('/item/:itemId', authMiddleware, validate(itemCarrinhoParamValidator), CarrinhoController.removerProduto);
router.delete('/limpar', authMiddleware, CarrinhoController.limparCarrinho);

export default router;
