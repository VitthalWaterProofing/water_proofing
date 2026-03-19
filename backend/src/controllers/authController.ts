import { Request, Response } from 'express';
import * as authService from '../services/authService';
import sendEmail from '../utils/sendEmail';
import { otpEmailTemplate } from '../utils/emailTemplates';
// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const authUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await authService.loginUser(email, password);

    if (result) {
      const { user, otp } = result;

      // Log OTP to console for local dev testing
      // console.log(`[DEV] OTP for ${user.email}: ${otp}`);

      try {
        const template = otpEmailTemplate(otp);
        await sendEmail({
          email: user.email,
          subject: template.subject,
          message: `Your OTP is: ${otp}. It expires in 10 minutes.`,
          html: template.html,
        });
      } catch (emailError) {
        console.error('Failed to send OTP email:', emailError);
        // Don't block the flow - OTP is saved in DB, email failure is non-fatal
      }

      res.json({
        _id: user._id,
        message: "OTP sent successfully",
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error during authentication' });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  const {userId, otpCode} = req.body;
  if(!userId || !otpCode){
    return res.status(400).json({ message: "UserId and OTP is required" });
  }
  try {
    const result = await authService.verifyOtp(userId, otpCode);
    if(result){
      res.cookie("jwt", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.json({
        _id: result.user._id,
        name: result.user.name,
        email: result.user.email,
        role: result.user.role,
      });
    }
  }catch (error: any) {
    res.status(401).json({ message: error.message }); 
  }
}

// @desc    Register a new admin user (Initially only reachable internally or via CLI)
// @route   POST /api/auth/register
// @access  Private/SuperAdmin
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
      const user = await authService.registerAdmin(name, email, password, role);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
  } catch(error: any) {
      if (error.message === 'User already exists') {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Server error during registration' });
      }
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Public
export const logoutUser = (req: Request, res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await authService.getProfile(req.user?._id as string);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching profile' });
  }
};
