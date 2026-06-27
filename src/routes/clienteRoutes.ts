import { Router } from 'express';
import { ClienteController } from '../controllers/clienteController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { validate } from '../middlewares/validate';
import {
    criarClienteValidator,
    atualizarClienteValidator,
    idParamValidator,
} from '../validators/clienteValidator';

const router = Router();
const clienteController = new ClienteController();

router.use(authMiddleware, roleMiddleware('ADMIN'));

router.post('/', validate(criarClienteValidator), clienteController.criarCliente);
router.get('/', clienteController.listarClientes);
router.get('/:id', validate(idParamValidator), clienteController.obterClientePorId);
router.put('/:id', validate(atualizarClienteValidator), clienteController.atualizarCliente);
router.delete('/:id', validate(idParamValidator), clienteController.deletarCliente);


export default router;
