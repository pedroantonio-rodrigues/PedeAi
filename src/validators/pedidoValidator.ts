import { body, param } from "express-validator";
import { StatusPedido } from "../enum/StatusPedido";

export const pedidoIdParamValidator = [
    param("pedidoId")
        .isInt({ gt: 0 }).withMessage("O pedidoId deve ser um número inteiro válido."),
];

export const atualizarStatusValidator = [
    param("pedidoId")
        .isInt({ gt: 0 }).withMessage("O pedidoId deve ser um número inteiro válido."),

    body("status")
        .notEmpty().withMessage("O status é obrigatório.")
        .isIn(Object.values(StatusPedido))
        .withMessage(`O status deve ser um dos valores: ${Object.values(StatusPedido).join(", ")}.`),
];
