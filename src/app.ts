import express from "express";
import clienteRoutes from './routes/clienteRoutes';
import produtoRoutes from './routes/produtoRoutes';

const app = express();

app.use(express.json());
app.use('/clientes', clienteRoutes);
app.use('/produtos', produtoRoutes);

export default app;