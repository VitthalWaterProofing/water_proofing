import User from '../models/User';
import crypto from 'crypto';
import { generateToken } from '../utils/generateToken';

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select('+password');
  if (user && (await user.comparePassword(password))) {
    // const token = generateToken(user._id as unknown as string, user.role);
    const otp = crypto.randomInt(100000, 999999);
    user.otpCode = otp.toString();
    user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();
    return { user, otp };
  }
  return null;
};

export const verifyOtp = async (userId: string, otpCode: string) => {
  const user = await User.findById(userId);
  if(!user){
    throw new Error('User not found');
  }
  if(user.otpCode !== otpCode){
    throw new Error('Invalid OTP');
  }
  if(user.otpExpiresAt && user.otpExpiresAt.getTime() < Date.now()){
    throw new Error('OTP expired');
  }
  user.otpCode = undefined;
  user.otpExpiresAt = undefined;
  await user.save();
  
  const token = generateToken(userId, user.role);
  return {user, token};
}

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
