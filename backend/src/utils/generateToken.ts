import jwt from 'jsonwebtoken';

// Define the payload structure
export interface JwtPayload {
  id: string;
  role: string;
}

// Generate token
export const generateToken = (id: string, role: string): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  return jwt.sign({ id, role }, secret, {
    expiresIn: '30d',
  });
};
