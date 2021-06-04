// @ts-check

import { DBTasks } from 'common/InMemoryDbTasks';
import { remove } from 'lodash';
import { IUser } from 'resources/users/user.model';

const UsersData: IUser[] = [];

const getAllUsers = (): IUser[] => {
  const res = UsersData.slice(0);
  if (!res) {
    throw new Error('[App] Null Pointer Exception!');
  }
  return res;
};

const getUser = (userId: string): IUser => {
  const allUsers = getAllUsers();
  const res = allUsers.filter((el) => el?.id === userId)[0];
  if (!res) {
    throw new Error('[App] Null Pointer Exception!');
  }
  return res;
};

const createUser = (user: IUser): IUser => {
  UsersData.push(user);
  const res = getUser(user.id);
  if (!res) {
    throw new Error('[App] Null Pointer Exception!');
  }
  return res;
};

const removeUser = (userId: string): IUser => {
  const deletedUser = getUser(userId);
  remove(UsersData, (user) => user.id === userId);
  DBTasks.deleteUserFromTasks(userId);
  const res = deletedUser;
  if (!res) {
    throw new Error('[App] Null Pointer Exception!');
  }
  return res;
};

const updateUser = (newUserData: IUser): IUser => {
  removeUser(newUserData.id);
  createUser(newUserData);
  const res = getUser(newUserData.id);
  if (res) {
    throw new Error('[App] Null Pointer Exception!');
  }
  return res;
};

export const DBUsers = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
};
