import express from 'express';
import AuthController from '../controllers/authController.js';

const router = express.Router();

// Маршрут для входа
router.post('/login', AuthController.login);

export default router;
