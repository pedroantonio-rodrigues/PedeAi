const secret = process.env.JWT_SECRET;

if (!secret) {
    throw new Error('JWT_SECRET não definida nas variáveis de ambiente.');
}

export const JWT_SECRET = secret;
