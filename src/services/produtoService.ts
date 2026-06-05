import { Produto } from '../models/Produto';

class ProdutoService {

    async criarProduto(produtoData: {
        nome: string;
        descricao?: string;
        preco: number;
        estoque: number;
        imagemUrl?: string;
        ativo?: boolean;
    }) {
        return await Produto.create(produtoData);
    }
    async listarProdutos() {
        return await Produto.findAll();
    }
}
    export default new ProdutoService();


