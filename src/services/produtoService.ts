import { Produto } from '../models/Produto';

const CAMPOS_PERMITIDOS = ["nome", "descricao", "preco", "estoque", "imagemUrl", "ativo"] as const;

class ProdutoService {

    async criarProduto(produtoData: {
        nome: string;
        descricao?: string;
        preco: number;
        estoque: number;
        imagemUrl?: string;
        ativo?: boolean;
    }) {
        return await Produto.create(produtoData, {
            fields: [...CAMPOS_PERMITIDOS],
        });
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
        return await produto.update(produtoData, {
            fields: [...CAMPOS_PERMITIDOS],
        });
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


