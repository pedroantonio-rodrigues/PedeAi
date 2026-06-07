import { 
    Table, Column, Model, ForeignKey, BelongsTo, 
    DataType
} from 'sequelize-typescript';

import { Carrinho } from './Carrinho';
import { Produto } from './Produto';

@Table({
    tableName: 'itens_carrinho',
})
export class ItemCarrinho extends Model {

    @ForeignKey(() => Carrinho)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare carrinhoId: number;


    @ForeignKey(() => Produto)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare produtoId: number;
    
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 1,
    })
    declare quantidade: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    declare precoUnitario: number;

    @BelongsTo(() => Carrinho)
    carrinho!: Carrinho;

    @BelongsTo(() => Produto)
    produto!: Produto;
}