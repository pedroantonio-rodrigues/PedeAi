import { Table, Column, Model, DataType, Unique, CreatedAt, UpdatedAt, HasOne } from 'sequelize-typescript';
import { Carrinho } from './Carrinho';

@Table({
    tableName: 'clientes',
})

export class Cliente extends Model {
    @Column({
        type: DataType.STRING(150),
        allowNull: false,
    })
    declare nome: string;

    @HasOne(() => Carrinho)
    carrinho!: Carrinho;

    @Unique
    @Column({
        type: DataType.STRING(11),
        allowNull: false,
    })
    declare cpf: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare telefone: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare endereco: string;

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;

}