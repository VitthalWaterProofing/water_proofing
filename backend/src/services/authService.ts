import User from '../models/User';
import { generateToken } from '../utils/generateToken';

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select('+password');
  if (user && (await user.comparePassword(password))) {
    const token = generateToken(user._id as unknown as string, user.role);
    return { user, token };
  }
  return null;
};

export const registerAdmin = async (name: string, email: string, password: string, role: string) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role || 'staff',
  });

  return user;
};

export const getProfile = async (id: string) => {
  return await User.findById(id);
};
