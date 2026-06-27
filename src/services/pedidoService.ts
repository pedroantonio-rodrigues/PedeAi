import { Transaction } from "sequelize";
import { sequelize } from "../config/database";
import { Carrinho } from "../models/Carrinho";
import { ItemCarrinho } from "../models/ItemCarrinho";
import { Produto } from "../models/Produto";
import { Pedido } from "../models/Pedido";
import { ItemPedido } from "../models/ItemPedido";
import { StatusPedido } from "../enum/StatusPedido";


class PedidoService {

    async finalizarPedido(clienteId: number) {

        return await sequelize.transaction(async (transaction) => {

            const carrinho = await Carrinho.findOne({
                where: { clienteId },
                include: [{ model: ItemCarrinho }],
                transaction,
            });

            if (!carrinho) {
                throw new Error("Carrinho não encontrado");
            }

            const itens = carrinho.get('itens') as ItemCarrinho[];

            if (!itens || itens.length === 0) {
                throw new Error("Carrinho vazio");
            }

            let valorTotal = 0;
            const baixasEstoque: { produto: Produto; quantidade: number }[] = [];

            // Valida estoque (com lock de linha) e calcula o total
            for (const item of itens) {
                const produto = await Produto.findByPk(item.produtoId, {
                    transaction,
                    lock: Transaction.LOCK.UPDATE,
                });

                if (!produto) {
                    throw new Error(`Produto ${item.produtoId} não encontrado.`);
                }

                if (produto.estoque < item.quantidade) {
                    throw new Error(`Estoque insuficiente para o produto "${produto.nome}".`);
                }

                valorTotal += Number(item.precoUnitario) * item.quantidade;
                baixasEstoque.push({ produto, quantidade: item.quantidade });
            }

            const pedido = await Pedido.create(
                {
                    clienteId,
                    status: StatusPedido.PENDENTE,
                    valorTotal,
                },
                { transaction }
            );

            await ItemPedido.bulkCreate(
                itens.map((item) => ({
                    pedidoId: pedido.id,
                    produtoId: item.produtoId,
                    quantidade: item.quantidade,
                    precoUnitario: item.precoUnitario,
                })),
                { transaction }
            );

            // Baixa de estoque
            for (const { produto, quantidade } of baixasEstoque) {
                await produto.decrement("estoque", { by: quantidade, transaction });
            }

            await ItemCarrinho.destroy({
                where: { carrinhoId: carrinho.id },
                transaction,
            });

            return pedido;
        });
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