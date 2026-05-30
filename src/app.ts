import express from "express";
import clienteRoutes from './routes/clienteRoutes';

const app = express();

app.use(express.json());
app.use('/clientes', clienteRoutes);

export default app;