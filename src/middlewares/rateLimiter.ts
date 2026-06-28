import rateLimit from "express-rate-limit";

// Limitador geral da API: protege contra abuso/scraping sem atrapalhar
// o uso normal. Janela de 15 minutos.
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Muitas requisicoes. Tente novamente mais tarde." },
});

// Limitador estrito para o login: dificulta ataques de forca bruta de
// credenciais. Apenas tentativas mal-sucedidas contam para o limite.
export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    message: { message: "Muitas tentativas de login. Tente novamente em alguns minutos." },
});
