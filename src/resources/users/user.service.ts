// @ts-check

import { usersRepo } from 'resources/users/user.memory.repository';
import { IUserOutput, User } from 'resources/users/user.model';

// GET ALL
const getAll = (): IUserOutput[] => {
  const users = usersRepo.getAll();
  return users.map(User.toResponse);
};

// GET USER BY ID
const get = (userId: string): IUserOutput => {
  const user = usersRepo.get(userId);
  return User.toResponse(user);
};

// CREATE USER
const create = (login: string, password: string, name: string): IUserOutput => {
  const createdUser = usersRepo.create(login, password, name);
  if (createdUser) {
    return User.toResponse(createdUser);
  }
  throw new Error('[App] Null Pointer Exception!');
};

// UPDATE USER
const update = (
  userId: string,
  login: string,
  password: string,
  name: string
): IUserOutput => {
  const updatedUser = usersRepo.update(userId, login, password, name);
  if (updatedUser) {
    return User.toResponse(updatedUser);
  }
  throw new Error('[App] Null Pointer Exception!');
};

// DELETE USER
const remove = (userId: string): IUserOutput => {
  const user = usersRepo.remove(userId);
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
