// @ts-check

import { DBTasks } from 'common/InMemoryDbTasks';
import { ITask, Task } from 'resources/tasks/task.model';

// GET ALL TASKS
const getAll = (): ITask[] => {
  const res = DBTasks.getAllTasks();
  if (res) {
    return res;
  }
  throw new Error('[App] Null Pointer Exception!');
};

// GET TASK BY ID
const get = (boardId: string, taskId: string): ITask => {
  const task = DBTasks.getTask(boardId, taskId);
  if (!task) {
    throw new Error(`[App Error] The task with id: ${taskId} was not found!`);
  }
  return task;
};

// CREATE TASK
const create = (
  boardId: string,
  title: string,
  order: string,
  description: string,
  userId: string,
  columnId: string
): ITask => {
  const newTask = new Task({
    id: undefined,
    boardId,
    title,
    order,
    description,
    userId,
    columnId,
  });

  const res = DBTasks.createTask(newTask);
  if (res) {
    return res;
  }
  throw new Error('[App] Null Pointer Exception!');
};

// UPDATE TASK
const update = (
  boardId: string,
  taskId: string,
  title: string,
  order: string,
  description: string,
  userId: string,
  columnId: string
): ITask => {
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

  const res = DBTasks.getTask(updateTask.boardId, updateTask.id);
  if (res) {
    return res;
  }
  throw new Error('[App] Null Pointer Exception!');
};

// REMOVE TASK
const remove = (id: string): ITask => {
  const res = DBTasks.removeTask(id);
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
