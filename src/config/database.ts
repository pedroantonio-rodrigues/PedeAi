import { Sequelize } from 'sequelize-typescript';
import { Cliente } from '../models/Cliente';
import { Produto } from '../models/Produto';
import { Carrinho } from '../models/Carrinho';
import { ItemCarrinho } from '../models/ItemCarrinho';
import { ItemPedido } from '../models/ItemPedido';
import { Pedido } from '../models/Pedido';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error('DATABASE_URL não definida nas variáveis de ambiente.');
}

export const sequelize = new Sequelize(databaseUrl, {
    dialect: 'postgres',
    logging: false,
    models: [Cliente, Produto, Carrinho, ItemCarrinho, Pedido, ItemPedido,],
});