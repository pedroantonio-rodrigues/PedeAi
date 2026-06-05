import { Router } from 'express';
import ProdutoController from '../controllers/produtoController';   

const router = Router();

router.post('/', ProdutoController.criarProduto);
router.get('/', ProdutoController.listarProdutos);
router.get('/:id', ProdutoController.obterProdutoPorId);
router.put('/:id', ProdutoController.atualizarProduto);
router.delete('/:id', ProdutoController.deletarProduto);

export default router;