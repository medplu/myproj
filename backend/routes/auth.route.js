import express from 'express';
import { logout, login, signup, getMe, verifyEmail } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.get("/me", protectRoute, getMe);

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

// Add the new route for email verification
router.post('/verify', verifyEmail);

export default router;
