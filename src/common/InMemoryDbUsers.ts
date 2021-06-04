// @ts-check

import { DBTasks } from 'common/InMemoryDbTasks';
import { remove } from 'lodash';
import { IUser } from 'resources/users/user.model';

const UsersData: IUser[] = [];

// GET ALL USERS
const getAllUsers = (): Promise<IUser[]> => {
  console.log('GET ALL USERS');
  return new Promise((success, failure) => {
    setTimeout(() => {
      try {
        const res = UsersData.slice(0);
        console.log('GET ALL USERS SUCCESS');
        success(res);
      } catch (error) {
        console.log('GET ALL USERS SUCCESS FAILURE');
        failure(new Error('Error: Something went wrong'));
      }
    }, 2000);
  });
};

// GET USER BY ID
const getUser = (userId: string): Promise<IUser> => {
  console.log(`GET USER BY ID...${userId}`);
  return new Promise((success, failure) => {
    setTimeout(() => {
      try {
        const allUsers = getAllUsers();
        const user = allUsers.filter((el) => el?.id === userId)[0];
        console.log('GET USER SUCCESS');
        success(user);
      } catch (error) {
        console.log('GET USER FAILURE');
        failure(new Error('Error: Something went wrong'));
      }
    }, 2000);
  });
};

// CREATE USER
const createUser = (user: IUser): Promise<IUser> => {
  console.log('CREATING USER...');
  console.log(user);
  return new Promise((success, failure) => {
    setTimeout(() => {
      try {
        UsersData.push(user);
        console.log('SUCCESS');
        success(getUser(user.id));
      } catch (error) {
        console.log('FAILURE');
        failure(new Error('Error: Something went wrong'));
      }
    }, 2000);
  });
};

// REMOVE USER
const removeUser = async (userId: string): Promise<IUser> => {
  const deletedUser = await getUser(userId);
  remove(UsersData, (user) => user.id === userId);
  DBTasks.deleteUserFromTasks(userId);
  const res = deletedUser;
  if (!res) {
    throw new Error('[App] Null Pointer Exception!');
  }
  return res;
};

// UPDATE USER
const updateUser = async (newUserData: IUser): Promise<IUser> => {
  removeUser(newUserData.id);
  createUser(newUserData);
  const res = await getUser(newUserData.id);
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
