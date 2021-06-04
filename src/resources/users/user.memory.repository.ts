// @ts-check

import { DBUsers } from 'common/InMemoryDbUsers';
import { IUser, User } from 'resources/users/user.model';

// GET ALL USERS
const getAll = async (): Promise<IUser[]> => {
  const res = await DBUsers.getAllUsers();
  if (res) {
    return res;
  }
  throw new Error('[App] Null Pointer Exception!');
};

// GET USER BY ID
const get = async (userId: string): Promise<IUser> => {
  const user = await DBUsers.getUser(userId);
  if (!user) {
    throw new Error(`[App Error] The user with id: ${userId} was not found!`);
  }
  return user;
};

// CREATE USER
const create = async (
  login: string,
  password: string,
  name: string
): Promise<IUser> => {
  const user = new User({
    id: undefined,
    login,
    password,
    name,
  });
  await DBUsers.createUser(user);
  return DBUsers.getUser(user.id);
};

// UPDATE USER
const update = async (
  userId: string,
  login: string,
  password: string,
  name: string
): Promise<IUser> => {
  const newUserData = new User({
    id: userId,
    login,
    password,
    name,
  });
  await DBUsers.updateUser(newUserData);
  const user = await DBUsers.getUser(newUserData.id);
  if (!user) {
    throw new Error(`[App Error] The user with id: ${userId} was not found!`);
  }
  return user;
};

// DELETE USER
const remove = async (userId: string): Promise<IUser> =>
  await DBUsers.removeUser(userId);

export const usersRepo = {
  getAll,
  get,
  create,
  update,
  remove,
};
