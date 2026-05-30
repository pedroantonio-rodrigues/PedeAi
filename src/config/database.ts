import { Sequelize } from 'sequelize-typescript';
import { Cliente } from '../models/Cliente';

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: "localhost",
    port: 5432,
    username: "pedeai",
    password: "pedeai",
    database: "pedeai",
    logging: false,
    models: [Cliente,],
});