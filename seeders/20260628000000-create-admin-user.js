'use strict';

require('dotenv').config();
const bcrypt = require('bcryptjs');

/**
 * Seed do primeiro usuario ADMIN.
 *
 * Necessario porque o registro publico (/auth/register) sempre cria role
 * CLIENTE, entao nao ha como criar o primeiro ADMIN sem mexer no banco.
 *
 * Credenciais vem de variaveis de ambiente (ver .env.example). A senha e
 * obrigatoria (fail-fast) para nao versionar/usar uma senha padrao fraca.
 * O seed e idempotente: se ja existir um cliente com o email informado,
 * nao faz nada.
 */
module.exports = {
    async up(queryInterface, Sequelize) {
        const nome = process.env.ADMIN_NOME || 'Administrador';
        const email = process.env.ADMIN_EMAIL || 'admin@pedeai.com';
        const senha = process.env.ADMIN_SENHA;
        const cpf = process.env.ADMIN_CPF || '00000000000';
        const telefone = process.env.ADMIN_TELEFONE || '00000000000';
        const endereco = process.env.ADMIN_ENDERECO || 'Nao informado';

        if (!senha) {
            throw new Error(
                'ADMIN_SENHA nao definida. Defina ADMIN_SENHA no .env antes de rodar o seed do admin.',
            );
        }

        const existente = await queryInterface.sequelize.query(
            'SELECT id FROM clientes WHERE email = :email LIMIT 1;',
            {
                replacements: { email },
                type: queryInterface.sequelize.QueryTypes.SELECT,
            },
        );

        if (existente.length > 0) {
            console.log(`Admin com email ${email} ja existe. Seed ignorado.`);
            return;
        }

        const senhaHash = await bcrypt.hash(senha, 10);
        const agora = new Date();

        await queryInterface.bulkInsert('clientes', [
            {
                nome,
                cpf,
                telefone,
                endereco,
                email,
                senha: senhaHash,
                role: 'ADMIN',
                createdAt: agora,
                updatedAt: agora,
            },
        ]);

        console.log(`Admin ${email} criado com sucesso.`);
    },

    async down(queryInterface, Sequelize) {
        const email = process.env.ADMIN_EMAIL || 'admin@pedeai.com';
        await queryInterface.bulkDelete('clientes', { email, role: 'ADMIN' });
    },
};
