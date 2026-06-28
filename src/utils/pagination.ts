import { Request } from "express";

export interface PaginationParams {
    page: number;
    limit: number;
    offset: number;
}

export interface PaginatedResult<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

// Le page/limit da query string e normaliza para valores seguros.
// Valores ausentes/invalidos caem nos defaults; limit e limitado a MAX_LIMIT
// para nao permitir que o cliente peca a tabela inteira de uma vez.
export function getPaginationParams(query: Request["query"]): PaginationParams {
    let page = Number(query.page);
    let limit = Number(query.limit);

    if (!Number.isInteger(page) || page < 1) {
        page = DEFAULT_PAGE;
    }
    if (!Number.isInteger(limit) || limit < 1) {
        limit = DEFAULT_LIMIT;
    }
    if (limit > MAX_LIMIT) {
        limit = MAX_LIMIT;
    }

    return { page, limit, offset: (page - 1) * limit };
}

// Monta o envelope padrao de resposta paginada a partir do resultado
// de um findAndCountAll ({ rows, count }).
export function buildPaginatedResult<T>(
    rows: T[],
    total: number,
    page: number,
    limit: number,
): PaginatedResult<T> {
    return {
        data: rows,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
}
