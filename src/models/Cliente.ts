import { Table, Column, Model, DataType, Unique, CreatedAt, UpdatedAt, HasOne } from 'sequelize-typescript';
import { Carrinho } from './Carrinho';

@Table({
    tableName: 'clientes',
    defaultScope: {
        attributes: { exclude: ['senha'] },
    },
    scopes: {
        comSenha: {
            attributes: { include: ['senha'] },
        },
    },
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

    @Unique
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare senha: string;

    @Column({
        type: DataType.ENUM('ADMIN', 'CLIENTE'), 
        allowNull: false,
        defaultValue: 'CLIENTE',  
    })
    declare role: string;

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;
}