import express from 'express';
import {
  logout,
  login,
  signup,
  getMe,
  verifyEmail,
  resendVerificationCode,
  googleCallback  // Import the new callback function
} from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.get("/me", protectRoute, getMe);

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

// Add the new route for email verification
router.post('/verify', verifyEmail);

// Add the new route for resending verification code
router.post('/resend-verification', protectRoute, resendVerificationCode);

// Add the new route for handling Google OAuth callback
router.post('/google/callback', googleCallback);

export default router;
