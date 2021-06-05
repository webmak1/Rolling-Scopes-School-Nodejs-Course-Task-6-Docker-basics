// @ts-check

import { DELAY } from 'common/constants';
import { map, remove } from 'lodash';
import { ITask } from 'resources/tasks/task.model';

const TasksData: ITask[] = [];

// GET ALL TASKS
const getAllTasks = (): Promise<ITask[]> => {
  return new Promise((success, failure) => {
    setTimeout(() => {
      try {
        const res = TasksData.slice(0);
        success(res);
      } catch (error) {
        failure(new Error('Error: Something went wrong'));
      }
    }, DELAY);
  });
};

// GET TASK BY BOARD ID AND TASK ID
const getTask = (boardId: string, taskId: string): Promise<ITask> => {
  return new Promise((success, failure) => {
    setTimeout(() => {
      (async () => {
        try {
          const allTasks = await getAllTasks();
          const res = allTasks.filter(
            (el) => el?.boardId === boardId && el?.id === taskId
          )[0];
          if (!res) {
            throw new Error('[App] Null Pointer Exception!');
          }
          success(res);
        } catch (error) {
          failure(new Error('Error: Something went wrong'));
        }
      })();
    }, DELAY);
  });
};

// GET TASK BY ID
const getTaskById = (taskId: string): Promise<ITask> => {
  return new Promise((success, failure) => {
    setTimeout(() => {
      (async () => {
        try {
          const allTasks = await getAllTasks();
          const res = allTasks.filter((el) => el.id === taskId)[0];
          if (!res) {
            throw new Error('[App] Null Pointer Exception!');
          }
          success(res);
        } catch (error) {
          failure(new Error('Error: Something went wrong'));
        }
      })();
    }, DELAY);
  });
};

// CREATE TASK
const createTask = (task: ITask): Promise<ITask> => {
  return new Promise((success, failure) => {
    setTimeout(() => {
      (async () => {
        try {
          TasksData.push(task);
          const res = await getTaskById(task.id);
          success(res);
        } catch (error) {
          failure(new Error('Error: Something went wrong'));
        }
      })();
    }, DELAY);
  });
};

// UPDATE TASK
const updateTask = async (updatedTask: ITask): Promise<ITask> => {
  return new Promise((success, failure) => {
    setTimeout(() => {
      (async () => {
        try {
          console.log('----------------------');
          console.log('UPDATE TASK');
          console.log(updatedTask);
          console.log('----------------------');

          await removeTask(updatedTask.id);
          await createTask(updatedTask);
          const res = await getTaskById(updatedTask.id);

          console.log('----------------------');
          console.log('res');
          console.log(res);
          console.log('----------------------');

          success(res);
        } catch (error) {
          failure(new Error('Error: Something went wrong'));
        }
      })();
    }, DELAY);
  });
};

// REMOVE TASK
const removeTask = async (taskId: string): Promise<ITask> => {
  return new Promise((success, failure) => {
    setTimeout(() => {
      (async () => {
        try {
          const deletedTask = await getTaskById(taskId);
          remove(TasksData, (task) => task.id === taskId);
          const res = deletedTask;
          success(res);
        } catch (error) {
          failure(new Error('Error: Something went wrong'));
        }
      })();
    }, DELAY);
  });
};

const deleteUserFromTasks = (userId: string): Promise<string> => {
  // console.log('DELETING TASK...');
  return new Promise((success, failure) => {
    setTimeout(() => {
      try {
        map(TasksData, async (task) => {
          if (task.userId === userId) {
            console.log('---------------------------');
            console.log('DELETE');
            console.log(userId);
            console.log('---------------------------');

            await removeTask(task.id);
            await createTask({ ...task, userId: null });

            console.log('---------------------------');
            console.log('getTaskById');
            console.log(await getTaskById(task.id));
            console.log('---------------------------');
          }
        });
        success('Delete User From Task is OK');
      } catch (error) {
        // console.log('DELETING TASK');
        failure(new Error('Error: Something went wrong'));
      }
    }, DELAY);
  });
};

const removeTaskByBoardId = (boardId: string): Promise<string> => {
  return new Promise((success, failure) => {
    setTimeout(() => {
      try {
        remove(TasksData, (task) => task.boardId === boardId);
        success('Delete User From Task is OK');
      } catch (error) {
        failure(new Error('Error: Something went wrong'));
      }
    }, DELAY);
  });
};

export const DBTasks = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  removeTask,
  deleteUserFromTasks,
  removeTaskByBoardId,
};
