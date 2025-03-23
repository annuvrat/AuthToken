import { Request, Response } from 'express';
import { login, refreshAccessToken, logout } from '../services/auth.service';

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const tokens = await login(email, password);
    res.json(tokens);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const refreshTokenController = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  try {
    const { accessToken } = await refreshAccessToken(refreshToken);
    res.json({ accessToken });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const logoutController = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  try {
    await logout(refreshToken);
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
