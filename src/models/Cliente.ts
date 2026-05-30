import { Table, Column, Model, DataType, Unique, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({
    tableName: 'clientes',
})

export class Cliente extends Model {
    @Column({
        type: DataType.STRING(150),
        allowNull: false,
    })
    nome!: string;

    @Unique
    @Column({
        type: DataType.STRING(11),
        allowNull: false,
    })
    cpf!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    telefone!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    endereco!: string;

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;

}