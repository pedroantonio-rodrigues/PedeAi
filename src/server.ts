import "reflect-metadata";
import "dotenv/config";

import app from "./app";7
import { sequelize } from "./config/database";

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Banco de dados conectado com sucesso.');

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }

}

startServer();