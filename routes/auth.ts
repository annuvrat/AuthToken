import express from 'express';
import {
  loginController,
  refreshTokenController,
  logoutController,
} from '../controllers/auth.controller';

const router = express.Router();

router.post('/login', loginController);
router.post('/refresh-token', refreshTokenController);
router.post('/logout', logoutController);

export default router;
