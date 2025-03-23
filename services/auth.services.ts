import { PrismaClient } from '@prisma/client';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new Error('Invalid credentials');
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  // Save refresh token to the database
  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
    },
  });

  return { accessToken, refreshToken };
};

export const refreshAccessToken = async (refreshToken: string) => {
  const decoded = verifyRefreshToken(refreshToken);

  // Check if the refresh token exists in the database
  const tokenExists = await prisma.refreshToken.findUnique({
    where: { token: refreshToken },
  });

  if (!tokenExists) {
    throw new Error('Invalid refresh token');
  }

  // Generate a new access token
  const accessToken = generateAccessToken(decoded.userId);
  return { accessToken };
};

export const logout = async (refreshToken: string) => {
  // Delete the refresh token from the database
  await prisma.refreshToken.delete({ where: { token: refreshToken } });
};
