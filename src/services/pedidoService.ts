import { Carrinho } from "../models/Carrinho";
import { ItemCarrinho } from "../models/ItemCarrinho";
import { Pedido } from "../models/Pedido";
import { ItemPedido } from "../models/ItemPedido";
import { StatusPedido } from "../enum/StatusPedido";


class PedidoService {

    async finalizarPedido(clienteId: number) {

        const carrinho = await Carrinho.findOne({
            where: { clienteId },
            include: [{ model: ItemCarrinho }]
        });

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

    async listarPedidos() {

        return await Pedido.findAll({
            include: [ItemPedido]
        });
    }


        async buscarPedidoPorId(pedidoId: number) {
        const pedido = await Pedido.findByPk(pedidoId, {
            include: [ItemPedido]
        });

        if (!pedido) {
            throw new Error("Pedido não encontrado");
        }

        return pedido;
    }


    async listarPedidosPorCliente(clienteId: number) {
        return await Pedido.findAll({
            where: { clienteId },
            include: [ItemPedido]
        });
    }

    async atualizarStatusPedido(pedidoId: number, status: string) {

        if(!Object.values(StatusPedido).includes(status as StatusPedido)) {
            throw new Error("Status inválido");
        }

        const pedido = await Pedido.findByPk(pedidoId);

        if (!pedido) {
            throw new Error("Pedido não encontrado");
        }

        pedido.status = status as StatusPedido;
        await pedido.save();
        return pedido;
    }

}

export default new PedidoService();