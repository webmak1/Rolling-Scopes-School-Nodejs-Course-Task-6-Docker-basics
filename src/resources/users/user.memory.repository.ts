// @ts-check

import { DBUsers } from 'common/InMemoryDbUsers';
import { IUser, User } from 'resources/users/user.model';

// GET ALL USERS
const getAll = (): IUser[] => {
  const res = DBUsers.getAllUsers();
  if (res) {
    return res;
  }
  throw new Error('[App] Null Pointer Exception!');
};

// GET USER BY ID
const get = (userId: string): IUser => {
  const user = DBUsers.getUser(userId);
  if (!user) {
    throw new Error(`[App Error] The user with id: ${userId} was not found!`);
  }
  return user;
};

// CREATE USER
const create = (login: string, password: string, name: string): IUser => {
  const user = new User({
    id: undefined,
    login,
    password,
    name,
  });
  DBUsers.createUser(user);
  return DBUsers.getUser(user.id);
};

// UPDATE USER
const update = (
  userId: string,
  login: string,
  password: string,
  name: string
): IUser => {
  const newUserData = new User({
    id: userId,
    login,
    password,
    name,
  });
  DBUsers.updateUser(newUserData);

  const user = DBUsers.getUser(newUserData.id);
  if (!user) {
    throw new Error(`[App Error] The user with id: ${userId} was not found!`);
  }
  return user;
};

// DELETE USER
const remove = (userId: string): IUser => DBUsers.removeUser(userId);

export const usersRepo = {
  getAll,
  get,
  create,
  update,
  remove,
};
