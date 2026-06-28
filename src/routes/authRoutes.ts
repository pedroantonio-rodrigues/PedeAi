import { Router } from "express";
import authController from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";
import { validate } from "../middlewares/validate";
import { loginLimiter } from "../middlewares/rateLimiter";
import { registerValidator, loginValidator } from "../validators/authValidator";

const router = Router();

router.post('/register', validate(registerValidator), authController.register);
router.post('/login', loginLimiter, validate(loginValidator), authController.login);
router.get('/profile', authMiddleware, authController.profile)
router.get('/admin', authMiddleware, roleMiddleware('ADMIN'), (req, res) => { return res.json({message: 'Area administrativa'});});

export default router;
