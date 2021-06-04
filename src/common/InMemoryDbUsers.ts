// @ts-check

import { DELAY } from 'common/constants';
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
        console.log('GET ALL USERS FAILURE');
        failure(new Error('Error: Something went wrong'));
      }
    }, DELAY);
  });
};

// GET USER BY ID
const getUser = (userId: string): Promise<IUser> => {
  console.log(`GET USER BY ID...${userId}`);
  return new Promise((success, failure) => {
    setTimeout(async () => {
      try {
        const allUsers = await getAllUsers();
        const user = allUsers.filter((el) => el?.id === userId)[0];
        console.log('GET USER SUCCESS', user);

        success(user);
      } catch (error) {
        console.log('GET USER FAILURE');
        failure(new Error('Error: Something went wrong'));
      }
    }, DELAY);
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
    }, DELAY);
  });
};

// UPDATE USER
const updateUser = async (newUserData: IUser): Promise<IUser> => {
  console.log('UPDATING USER...');
  return new Promise((success, failure) => {
    setTimeout(async () => {
      try {
        removeUser(newUserData.id);
        createUser(newUserData);
        const res = await getUser(newUserData.id);
        success(res);
      } catch (error) {
        console.log('UPDATING USER...FAILURE');
        failure(new Error('Error: Something went wrong'));
      }
    }, DELAY);
  });
};

// REMOVE USER
const removeUser = async (userId: string): Promise<IUser> => {
  console.log('DELETING USER...', userId);
  return new Promise((success, failure) => {
    setTimeout(async () => {
      try {
        const deletedUser = await getUser(userId);
        remove(UsersData, (user) => user.id === userId);
        DBTasks.deleteUserFromTasks(userId);
        success(deletedUser);
      } catch (error) {
        console.log('FAILURE');
        failure(new Error('Error: Something went wrong'));
      }
    }, DELAY);
  });
};

export const DBUsers = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
};
