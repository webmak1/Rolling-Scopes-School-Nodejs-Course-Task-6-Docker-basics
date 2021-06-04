// @ts-check

import { usersRepo } from 'resources/users/user.memory.repository';
import { IUserOutput, User } from 'resources/users/user.model';

// GET ALL
const getAll = async (): Promise<IUserOutput[]> => {
  const users = await usersRepo.getAll();
  return users.map(User.toResponse);
};

// GET USER BY ID
const get = async (userId: string): Promise<IUserOutput> => {
  const user = await usersRepo.get(userId);
  return User.toResponse(user);
};

// CREATE USER
const create = async (
  login: string,
  password: string,
  name: string
): Promise<IUserOutput> => {
  const createdUser = await usersRepo.create(login, password, name);
  if (createdUser) {
    return User.toResponse(createdUser);
  }
  throw new Error('[App] Null Pointer Exception!');
};

// UPDATE USER
const update = async (
  userId: string,
  login: string,
  password: string,
  name: string
): Promise<IUserOutput> => {
  const updatedUser = await usersRepo.update(userId, login, password, name);
  if (updatedUser) {
    return User.toResponse(updatedUser);
  }
  throw new Error('[App] Null Pointer Exception!');
};

// DELETE USER
const remove = async (userId: string): Promise<IUserOutput> => {
  const user = await usersRepo.remove(userId);
  if (user) {
    return User.toResponse(user);
  }
  throw new Error('[App] Null Pointer Exception!');
};

export const usersService = {
  getAll,
  get,
  create,
  update,
  remove,
};
