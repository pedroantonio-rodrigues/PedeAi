import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";

import { Cliente } from "../models/Cliente";
import { JWT_SECRET } from "../config/auth";

class AuthService { 

    async register( 
        nome: string, 
        cpf: string,
        telefone: string,
        endereco: string,
        email: string, 
        senha: string 
    ){ 
        const clienteExistente = await Cliente.findOne({
            where: { email }
        }); 

        if (clienteExistente){
            throw new Error('Email ja cadastrado. '); 
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const cliente = await Cliente.create({
            nome,
            cpf,
            telefone,
            endereco,
            email,
            senha: senhaHash,
            role: 'CLIENTE'
        });

        return Cliente.findByPk(cliente.id);
    }

    async login(
        email: string,
        senha: string
    ){

        const cliente = await Cliente.scope('comSenha').findOne({
            where: { email }
        });

        if (!cliente){
            throw new Error('Credenciais invalidas.');
        }

        const senhaValida = await bcrypt.compare(
            senha,
            cliente.senha
        );

        if (!senhaValida){
            throw new Error('Credenciais invalidas.');
        }

        const token = jwt.sign(
            {
                id: cliente.id,
                role: cliente.role
            },
            JWT_SECRET,
            {
                expiresIn: '1d'
            }
        );
            return { 
                token,
                cliente: {
                    id: cliente.id,
                    nome: cliente.nome,
                    email: cliente.email,
                    role: cliente.role 
                }
            };
        }
    }

export default new AuthService();
