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
    async obterProdutoPorId(id: number) {
        return await Produto.findByPk(id);
    }

    async atualizarProduto(id: number,
        produtoData: {
            nome: string;
            descricao?: string;
            preco: number;
            estoque: number;
            imagemUrl?: string;
            ativo?: boolean;
        }) {
        const produto = await Produto.findByPk(id);
        if (!produto) {
            throw new Error("Produto não encontrado."); 
        }
        return await produto.update(produtoData);
        return produto;
    }

    async deletarProduto(id: number) {
        const produto = await Produto.findByPk(id);
        if (!produto) {
            throw new Error("Produto não encontrado.");
        }
        return await produto.destroy();
    }
}
    export default new ProdutoService();


