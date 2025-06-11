import { Request, Response } from 'express';
import * as userService from '../services/userService';
import generateToken from '../utils/generateToken';

export const login = (req: Request, res: Response): void => {
  const { username, password } = req.body;
  const user = userService.validateUser(username, password);

  if (!user) {
    res.status(401).json({ message: 'Credenciais inválidas' });
    return;
  }

  const token = generateToken(user.id);
  res.json({ token });
};

export const getAll = (_req: Request, res: Response): void => {
  res.json(userService.getAllUsers());
};

export const create = (req: Request, res: Response): void => {
  const newUser = userService.createUser(req.body);
  res.status(201).json(newUser);
};

export const update = (req: Request, res: Response): void => {
  const updatedUser = userService.updateUser(req.params.id, req.body);
  if (!updatedUser) {
    res.status(404).json({ message: 'Usuário não encontrado' });
    return;
  }
  res.json(updatedUser);
};

export const remove = (req: Request, res: Response): void => {
  const deleted = userService.deleteUser(req.params.id);
  if (!deleted) {
    res.status(404).json({ message: 'Usuário não encontrado' });
    return;
  }
  res.json({ message: 'Usuário removido' });
};