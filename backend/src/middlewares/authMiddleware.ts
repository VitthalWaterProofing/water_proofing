import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import { JwtPayload } from '../utils/generateToken';

// Extend express Request to include the user
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.cookies.jwt) {
    try {
      token = req.cookies.jwt;

      const secret = process.env.JWT_SECRET;
      if (!secret) throw new Error('JWT_SECRET missing');

      const decoded = jwt.verify(token, secret) as JwtPayload;

      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Admin middleware checker
export const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && (req.user.role === 'super_admin' || req.user.role === 'staff')) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};
