import {
    Table,
    Column,
    Model,
    ForeignKey,
    BelongsTo,
    DataType,
    HasMany
} from 'sequelize-typescript';

import { Cliente } from './Cliente';
import { ItemCarrinho } from './ItemCarrinho';

@Table({
    tableName: 'carrinhos',
})
export class Carrinho extends Model {
    @ForeignKey(() => Cliente)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        unique: true,
    })
    declare clienteId: number;

    @BelongsTo(() => Cliente)
    cliente!: Cliente;

    @HasMany(() => ItemCarrinho)
    itens!: ItemCarrinho[];
}