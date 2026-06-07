import { Carrinho } from "../models/Carrinho";
import { ItemCarrinho } from "../models/ItemCarrinho";
import { Pedido } from "../models/Pedido";
import { ItemPedido } from "../models/ItemPedido";


class PedidoService {

    async finalizarPedido(clienteId: number) {

        const carrinho = await Carrinho.findOne({
            where: { clienteId },
            include: [{ model: ItemCarrinho }]
        });

        console.log("Carrinho completo:");
console.log(JSON.stringify(carrinho, null, 2));

console.log("Itens:", carrinho?.itens);
console.log("Quantidade:", carrinho?.itens?.length);

        if (!carrinho) {
            throw new Error("Carrinho não encontrado"); 
        }

        const itens = carrinho.get('itens') as ItemCarrinho[];

        if (!itens || itens.length === 0) {

            throw new Error("Carrinho vazio");

        }

        let valorTotal = 0;

        for (const item of itens) {
            valorTotal += Number(item.precoUnitario) * item.quantidade;
        }

        const pedido = await Pedido.create({
            clienteId,
            status: 'PENDENTE',
            valorTotal,
        });

        for (const item of itens) {
            await ItemPedido.create({
                pedidoId: pedido.id,
                produtoId: item.produtoId,
                quantidade: item.quantidade,
                precoUnitario: item.precoUnitario,
            });
        }

        await ItemCarrinho.destroy({
            where: { carrinhoId: carrinho.id }
        });

        return pedido;
    }
}

export default new PedidoService();