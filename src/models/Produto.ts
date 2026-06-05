import { 
    Table, 
    Column, 
    Model,
    DataType,
    Default,
} from 'sequelize-typescript';

@Table({
    tableName: 'produtos',
})

export class Produto extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    nome!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    descricao?: string;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    preco!: number;
    
    @Default(0)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    estoque!: number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    imagemUrl?: string;

    @Default(true)
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    ativo!: boolean;
}

