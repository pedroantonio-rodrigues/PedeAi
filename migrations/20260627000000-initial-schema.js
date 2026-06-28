'use strict';

/**
 * Schema inicial do PedeAi.
 * Recria a estrutura que antes era gerada por sequelize.sync():
 * clientes, produtos, carrinhos, itens_carrinho, pedidos, itens_pedido.
 */
module.exports = {
    async up(queryInterface, Sequelize) {
        const timestamps = {
            createdAt: { type: Sequelize.DATE, allowNull: false },
            updatedAt: { type: Sequelize.DATE, allowNull: false },
        };

        // clientes
        await queryInterface.createTable('clientes', {
            id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
            nome: { type: Sequelize.STRING(150), allowNull: false },
            cpf: { type: Sequelize.STRING(11), allowNull: false, unique: true },
            telefone: { type: Sequelize.STRING, allowNull: false },
            endereco: { type: Sequelize.STRING, allowNull: false },
            email: { type: Sequelize.STRING, allowNull: false, unique: true },
            senha: { type: Sequelize.STRING, allowNull: false },
            role: {
                type: Sequelize.ENUM('ADMIN', 'CLIENTE'),
                allowNull: false,
                defaultValue: 'CLIENTE',
            },
            ...timestamps,
        });

        // produtos
        await queryInterface.createTable('produtos', {
            id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
            nome: { type: Sequelize.STRING, allowNull: false },
            descricao: { type: Sequelize.STRING, allowNull: true },
            preco: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
            estoque: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
            imagemUrl: { type: Sequelize.STRING, allowNull: true },
            ativo: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
            ...timestamps,
        });

        // carrinhos
        await queryInterface.createTable('carrinhos', {
            id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
            clienteId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
                references: { model: 'clientes', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            ...timestamps,
        });

        // itens_carrinho
        await queryInterface.createTable('itens_carrinho', {
            id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
            carrinhoId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'carrinhos', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            produtoId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'produtos', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            quantidade: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
            precoUnitario: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
            ...timestamps,
        });

        // pedidos
        await queryInterface.createTable('pedidos', {
            id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
            clienteId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'clientes', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            status: {
                type: Sequelize.ENUM(
                    'PENDENTE',
                    'CONFIRMADO',
                    'EM_PREPARO',
                    'SAIU_PARA_ENTREGA',
                    'ENTREGUE',
                    'CANCELADO',
                ),
                allowNull: false,
            },
            valorTotal: { type: Sequelize.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
            ...timestamps,
        });

        // itens_pedido
        await queryInterface.createTable('itens_pedido', {
            id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
            pedidoId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'pedidos', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            produtoId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'produtos', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            quantidade: { type: Sequelize.INTEGER, allowNull: false },
            precoUnitario: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
            ...timestamps,
        });
    },

    async down(queryInterface, Sequelize) {
        // Ordem inversa por causa das foreign keys
        await queryInterface.dropTable('itens_pedido');
        await queryInterface.dropTable('pedidos');
        await queryInterface.dropTable('itens_carrinho');
        await queryInterface.dropTable('carrinhos');
        await queryInterface.dropTable('produtos');
        await queryInterface.dropTable('clientes');

        // Postgres mantém os tipos ENUM ao dropar as tabelas; removê-los explicitamente
        await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_pedidos_status";');
        await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_clientes_role";');
    },
};
