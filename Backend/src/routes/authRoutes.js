import express from 'express';
const router = express.Router();
import { login,signup,logout,checkAuth } from '../controllers/authController.js';
import { protectRoute } from '../middleware/authMiddleware.js';
router.post('/login', login);
router.post('/signup',signup);
router.post('/logout',logout);
router.get('/checkAuth',protectRoute,checkAuth);
export default router;