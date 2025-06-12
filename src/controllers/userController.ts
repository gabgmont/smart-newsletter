import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService';
import generateToken from '../utils/generateToken';
import { IUser } from '../models/user';


export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const user = await userService.validateUser(email, password);

  if (!user) {
    res.status(401).json({ message: 'Credenciais inválidas' });
    return;
  }

  const token = generateToken(user.id);
  res.json({ token });
};

export const getAll = async (_req: Request, res: Response): Promise<void> => {
  const users = await userService.getAllUsers();
  res.json(users);
};

export const getById = async (_req: Request, res: Response): Promise<void> => {
  const { id } = _req.params;
  const users = await userService.getUserById(id);
  res.json(users);
};


export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = req.body as Omit<IUser, '_id'>;
    const user = await userService.createUser(data);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};


export const update = async (req: Request, res: Response): Promise<void> => {
  const updatedUser = await userService.updateUser(req.params.id, req.body);
  if (!updatedUser) {
    res.status(404).json({ message: 'Usuário não encontrado' });
    return;
  }
  res.json(updatedUser);
};


export const remove = async (req: Request, res: Response): Promise<void> => {
  const deleted = await userService.deleteUser(req.params.id);
  if (!deleted) {
    res.status(404).json({ message: 'Usuário não encontrado' });
    return;
  }
  res.json({ message: 'Usuário removido' });
};