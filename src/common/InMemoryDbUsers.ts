// @ts-check

import { DELAY } from 'common/constants';
import { DBTasks } from 'common/InMemoryDbTasks';
import { remove } from 'lodash';
import { IUser } from 'resources/users/user.model';

const UsersData: IUser[] = [];

// GET ALL USERS
const getAllUsers = (): Promise<IUser[]> => {
  return new Promise((success, failure) => {
    setTimeout(() => {
      try {
        const res = UsersData.slice(0);
        success(res);
      } catch (error) {
        failure(new Error('Error: Something went wrong'));
      }
    }, DELAY);
  });
};

// GET USER BY ID
const getUser = (userId: string): Promise<IUser> => {
  return new Promise((success, failure) => {
    setTimeout(() => {
      (async () => {
        try {
          const allUsers = await getAllUsers();
          const user = allUsers.filter((el) => el?.id === userId)[0];
          if (!user) {
            throw new Error('[App] Null Pointer Exception!');
          }
          success(user);
        } catch (error) {
          failure(new Error('Error: Something went wrong'));
        }
      })();
    }, DELAY);
  });
};

// CREATE USER
const createUser = (user: IUser): Promise<IUser> => {
  return new Promise((success, failure) => {
    setTimeout(() => {
      try {
        UsersData.push(user);
        success(getUser(user.id));
      } catch (error) {
        failure(new Error('Error: Something went wrong'));
      }
    }, DELAY);
  });
};

// UPDATE USER
const updateUser = async (newUserData: IUser): Promise<IUser> => {
  return new Promise((success, failure) => {
    setTimeout(() => {
      (async () => {
        try {
          await removeUser(newUserData.id);
          await createUser(newUserData);
          const res = await getUser(newUserData.id);
          success(res);
        } catch (error) {
          failure(new Error('Error: Something went wrong'));
        }
      })();
    }, DELAY);
  });
};

// REMOVE USER
const removeUser = async (userId: string): Promise<IUser> => {
  return new Promise((success, failure) => {
    setTimeout(() => {
      (async () => {
        try {
          const deletedUser = await getUser(userId);
          remove(UsersData, (user) => user.id === userId);
          await DBTasks.deleteUserFromTasks(userId);
          success(deletedUser);
        } catch (error) {
          failure(new Error('Error: Something went wrong'));
        }
      })();
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
