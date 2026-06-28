import 'reflect-metadata';

// Variáveis exigidas pelos módulos de config ao importar o app.
// Os testes deste pacote não tocam o banco, então a URL é apenas um placeholder.
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';
process.env.DATABASE_URL =
    process.env.DATABASE_URL || 'postgresql://test:test@localhost:5432/test_db';
