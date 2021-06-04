// @ts-check

import { DBTasks } from 'common/InMemoryDbTasks';
import { ITask, Task } from 'resources/tasks/task.model';

// GET ALL TASKS
const getAll = async (): Promise<ITask[]> => {
  const res = await DBTasks.getAllTasks();
  if (res) {
    return res;
  }
  throw new Error('[App] Null Pointer Exception!');
};

// GET TASK BY ID
const get = async (boardId: string, taskId: string): Promise<ITask> => {
  const task = await DBTasks.getTask(boardId, taskId);
  if (!task) {
    throw new Error(`[App Error] The task with id: ${taskId} was not found!`);
  }
  return task;
};

// CREATE TASK
const create = async (
  boardId: string,
  title: string,
  order: string,
  description: string,
  userId: string,
  columnId: string
): Promise<ITask> => {
  const newTask = new Task({
    id: undefined,
    boardId,
    title,
    order,
    description,
    userId,
    columnId,
  });

  const res = await DBTasks.createTask(newTask);
  if (res) {
    return res;
  }
  throw new Error('[App] Null Pointer Exception!');
};

// UPDATE TASK
const update = async (
  boardId: string,
  taskId: string,
  title: string,
  order: string,
  description: string,
  userId: string,
  columnId: string
): Promise<ITask> => {
  const updateTask = new Task({
    id: taskId,
    boardId,
    title,
    order,
    description,
    userId,
    columnId,
  });

  DBTasks.updateTask(updateTask);

  const res = await DBTasks.getTask(updateTask.boardId, updateTask.id);
  if (res) {
    return res;
  }
  throw new Error('[App] Null Pointer Exception!');
};

// REMOVE TASK
const remove = async (id: string): Promise<ITask> => {
  const res = await DBTasks.removeTask(id);
  if (res) {
    return res;
  }
  throw new Error('[App] Null Pointer Exception!');
};

export const tasksRepo = {
  getAll,
  get,
  create,
  update,
  remove,
};
