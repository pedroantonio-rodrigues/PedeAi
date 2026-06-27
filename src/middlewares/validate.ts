import { Request, Response, NextFunction } from "express";
import { ValidationChain, validationResult } from "express-validator";

export function validate(validations: ValidationChain[]) {
    return async (req: Request, res: Response, next: NextFunction) => {

        await Promise.all(validations.map((validation) => validation.run(req)));

        const errors = validationResult(req);

        if (errors.isEmpty()) {
            return next();
        }

        return res.status(422).json({
            message: "Dados inválidos.",
            errors: errors.array().map((err) => ({
                campo: err.type === "field" ? err.path : undefined,
                mensagem: err.msg,
            })),
        });
    };
}
