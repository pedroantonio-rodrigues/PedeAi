import { Cliente } from "../models/Cliente";
import { PaginationParams } from "../utils/pagination";

const CAMPOS_PERMITIDOS = ["nome", "cpf", "telefone", "endereco"] as const;

export class ClienteService {

    async criarCliente(clienteData: { 
        nome: string; 
        cpf: string; 
        telefone: string;
        endereco: string;

    }) {

    const clienteExistente = await Cliente.findOne({ 
        where: { cpf: clienteData.cpf },
    }); 

    if (clienteExistente) {
        throw new Error("Cliente com este CPF já existe.");
    }

    const novoCliente = await Cliente.create(clienteData, {
        fields: [...CAMPOS_PERMITIDOS],
    });
    return novoCliente;
}

async listarClientes({ limit, offset }: PaginationParams) {
    return Cliente.findAndCountAll({
        limit,
        offset,
        order: [["id", "ASC"]],
    });
}

async obterClientePorId(id: number) {
    return Cliente.findByPk(id);
}   

async atualizarCliente(id: number, clienteData: { 
    nome: string;
    cpf: string;
    telefone: string;
    endereco: string;
}) {
    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
        throw new Error("Cliente não encontrado.");
    }
    const clienteExistente = await Cliente.findOne({
        where: { cpf: clienteData.cpf, },

    }); 

    if (clienteExistente && clienteExistente.id !== id) {
    
    throw new Error("Outro cliente com este CPF já existe.");
    }

    await cliente.update(clienteData, {
        fields: [...CAMPOS_PERMITIDOS],
    });
    return cliente;
}   

async deletarCliente(id: number) {

    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
        throw new Error("Cliente não encontrado.");
    }

    await cliente.destroy();

    return { message: "Cliente deletado com sucesso." };
}

}
