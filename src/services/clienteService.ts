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

    await cliente.update(clienteData);
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
