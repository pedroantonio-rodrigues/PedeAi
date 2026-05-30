import { Cliente } from "../models/Cliente";

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

    const novoCliente = await Cliente.create(clienteData);
    return novoCliente;
}

async listarClientes() {
    return Cliente.findAll();
}

async obterClientePorId(id: number) {
    return Cliente.findByPk(id);
}   
}