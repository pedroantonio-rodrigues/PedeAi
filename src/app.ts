import express from "express";
import clienteRoutes from './routes/clienteRoutes';
import produtoRoutes from './routes/produtoRoutes';
import carrinhoRoutes from "./routes/carrinhoRoutes";

const app = express();

app.use(express.json());
app.use('/clientes', clienteRoutes);
app.use('/produtos', produtoRoutes);
app.use('/carrinhos', carrinhoRoutes);

export default app;