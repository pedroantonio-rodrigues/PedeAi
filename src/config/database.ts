import { Sequelize } from 'sequelize-typescript';
import { Cliente } from '../models/Cliente';
import { Produto } from '../models/Produto';
import { Carrinho } from '../models/Carrinho';
import { ItemCarrinho } from '../models/ItemCarrinho';
import { ItemPedido } from '../models/ItemPedido';
import { Pedido } from '../models/Pedido';

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: "localhost",
    port: 5432,
    username: "pedeai",
    password: "pedeai",
    database: "pedeai",
    logging: false,
    models: [Cliente, Produto, Carrinho, ItemCarrinho, Pedido, ItemPedido],
});