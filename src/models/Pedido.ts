import { 
    Table, 
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    HasMany,
    Default

} from 'sequelize-typescript';
import { Cliente } from './Cliente';
import { ItemPedido } from './ItemPedido';

@Table({
    tableName: 'pedidos',
})
export class Pedido extends Model {

    @ForeignKey(() => Cliente)
    @Column({
    type: DataType.INTEGER,
    allowNull: false,
    })
    declare clienteId: number;

    @BelongsTo(() => Cliente)
    declare cliente: Cliente;

    @Default('PENDENTE')
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare status: string;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
    })
    declare valorTotal: number;

    @HasMany(() => ItemPedido)
    declare itens: ItemPedido[];
}