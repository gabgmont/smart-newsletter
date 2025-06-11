import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

interface User {
  id: string;
  username: string;
  password: string;
  [key: string]: any;
}

const file = path.join(__dirname, '../../users.json');

const read = (): User[] => JSON.parse(fs.readFileSync(file, 'utf-8'));
const write = (data: User[]): void => fs.writeFileSync(file, JSON.stringify(data, null, 2));

export const getAllUsers = (): User[] => read();

export const createUser = (data: Omit<User, 'id'>): User => {
  const users = read();
  const newUser: User = {
    id: uuidv4(),
    username: data.username,
    password: data.password,
    ...data
  };
  users.push(newUser);
  write(users);
  return newUser;
};

export const updateUser = (id: string, data: Partial<User>): User | null => {
  const users = read();
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return null;
  users[index] = { ...users[index], ...data };
  write(users);
  return users[index];
};

export const deleteUser = (id: string): boolean => {
  const users = read();
  const filtered = users.filter(u => u.id !== id);
  if (filtered.length === users.length) return false;
  write(filtered);
  return true;
};

export const validateUser = (username: string, password: string): User | undefined => {
  const users = read();
  return users.find(u => u.username === username && u.password === password);
};