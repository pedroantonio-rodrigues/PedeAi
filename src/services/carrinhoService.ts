import { Carrinho } from "../models/Carrinho";
import { ItemCarrinho } from "../models/ItemCarrinho";
import { Produto } from "../models/Produto";

class CarrinhoService {

    async adicionarProduto(
        clienteId: number,
        produtoId: number,
        quantidade: number
    ) { 
        const produto = await Produto.findByPk(produtoId);

        if (!produto) {
            throw new Error("Produto não encontrado.");
    }
        let carrinho = await Carrinho.findOne({ where: { clienteId } });

        if (!carrinho) { 
            carrinho = await Carrinho.create({ clienteId });
        }

        const itemExistente = await ItemCarrinho.findOne({
            where: {
                carrinhoId: carrinho.id,
                produtoId
            }
        });

        if (itemExistente) {
            itemExistente.quantidade += quantidade;

            await itemExistente.save();

            return itemExistente;

        } 

        return await ItemCarrinho.create({
            carrinhoId: carrinho.id,
            produtoId,
            quantidade,
            precoUnitario: produto.preco
        });
}

async buscarCarrinho(clienteId: number) {

            const carrinho = await Carrinho.findOne({
                where: { clienteId },
                include: [{ 
                    model: ItemCarrinho,
                    include: [Produto]
                }]
            });

            if (!carrinho) {
                throw new Error("Carrinho não encontrado");
            }

            return carrinho;
        }

async removerProduto(itemId: number) {
    const item = await ItemCarrinho.findByPk(itemId);
    
    if (!item) {
        throw new Error("Item não encontrado.");
    }
    
    await item.destroy();

    return { message: "Produto removido do carrinho." };
    }

async limparCarrinho(clienteId: number) {
    
    const carrinho = await Carrinho.findOne({ where: { clienteId } });

    if (!carrinho) {
        throw new Error("Carrinho não encontrado.");
    }

    await ItemCarrinho.destroy({ where: { carrinhoId: carrinho.id } });
    return { message: "Carrinho limpo." };
    }

}
export default new CarrinhoService();