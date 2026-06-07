import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';

import { Pedido } from './Pedido';
import { Produto } from './Produto';


@Table({
    tableName: 'itens_pedido',
})

export class ItemPedido extends Model {

    @ForeignKey(() => Pedido)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare pedidoId: number;

    @ForeignKey(() => Produto)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare produtoId: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare quantidade: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    declare precoUnitario: number;

    @BelongsTo(() => Pedido)
    declare pedido: Pedido;

    @BelongsTo(() => Produto)
    declare produto: Produto;
}