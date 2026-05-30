import { Prisma } from "../lib/prisma;"

const clientes = await Prisma.cliente.findMany();

console.log(clientes);  