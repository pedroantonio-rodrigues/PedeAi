import express from "express";
import cors from "cors";
import clienteRoutes from './routes/clienteRoutes';
import produtoRoutes from './routes/produtoRoutes';
import carrinhoRoutes from "./routes/carrinhoRoutes";
import pedidosRoutes from "./routes/pedidosRoutes";
import authRoutes from "./routes/authRoutes"
import { notFoundHandler, errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

app.use('/clientes', clienteRoutes);
app.use('/produtos', produtoRoutes);
app.use('/carrinho', carrinhoRoutes);
app.use('/pedidos', pedidosRoutes);
app.use('/auth', authRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
