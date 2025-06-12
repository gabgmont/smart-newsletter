import { User, IUser } from '../models/user';
import bcrypt from 'bcryptjs';

export const getAllUsers = async (): Promise<IUser[]> => {
  return await User.find().exec();
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  return await User.findById(id).exec();
};

export const createUser = async (data: Omit<IUser, '_id'>): Promise<IUser> => {
  const userExists = await User.findOne({ email: data.email }).exec();
  if (userExists) {
    throw new Error('User with this email already exists');
  }
  const user = new User(data);
  await user.save();
  return user;
};

export const updateUser = async (id: string, data: Partial<IUser>): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(id, data, { new: true }).exec();
};

export const deleteUser = async (id: string): Promise<boolean> => {
  const result = await User.deleteOne({ _id: id }).exec();
  return result.deletedCount === 1;
};

export const validateUser = async (email: string, password: string): Promise<IUser | null> => {
   const user = await User.findOne({ email }).exec();
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;
  return user;
};
