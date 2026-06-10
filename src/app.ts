import express from "express";
import clienteRoutes from './routes/clienteRoutes';
import produtoRoutes from './routes/produtoRoutes';
import carrinhoRoutes from "./routes/carrinhoRoutes";
import pedidosRoutes from "./routes/pedidosRoutes";
import authRoutes from "./routes/authRoutes"

const app = express();

app.use(express.json());
app.use('/clientes', clienteRoutes);
app.use('/produtos', produtoRoutes);
app.use('/carrinho', carrinhoRoutes);
app.use('/pedidos', pedidosRoutes);
app.use('/auth', authRoutes);

export default app;