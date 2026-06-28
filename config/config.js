require('dotenv').config();

// Configuração consumida pelo sequelize-cli (migrations/seeders).
// Todos os ambientes usam a mesma DATABASE_URL definida no .env.
const base = {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
};

module.exports = {
    development: base,
    test: base,
    production: base,
};
