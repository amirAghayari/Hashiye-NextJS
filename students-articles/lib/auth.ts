
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '@/models/User';
import connectDB from './mongoose';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch (error) {
    return null;
  }
}

export async function createUser(userData: {
  fullName: string;
  email: string;
  password: string;
  role: 'student' | 'professor';
  university: string;
  field: string;
}) {
  await connectDB();
  
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error('کاربری با این ایمیل از قبل وجود دارد');
  }
  
  const hashedPassword = await hashPassword(userData.password);
  
  const user = new User({
    ...userData,
    password: hashedPassword
  });
  
  await user.save();
  
  const token = generateToken(user._id.toString());
  
  return {
    user: {
      id: user._id.toString(),
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      university: user.university,
      field: user.field
    },
    token
  };
}

export async function authenticateUser(email: string, password: string) {
  await connectDB();
  
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('ایمیل یا رمز عبور اشتباه است');
  }
  
  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    throw new Error('ایمیل یا رمز عبور اشتباه است');
  }
  
  const token = generateToken(user._id.toString());
  
  return {
    user: {
      id: user._id.toString(),
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      university: user.university,
      field: user.field
    },
    token
  };
}
