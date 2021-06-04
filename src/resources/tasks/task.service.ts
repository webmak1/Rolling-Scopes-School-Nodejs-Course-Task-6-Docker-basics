// @ts-check

import { tasksRepo } from 'resources/tasks/task.memory.repository';
import { ITask, Task } from 'resources/tasks/task.model';

// GET ALL TASKS
const getAll = async (): Promise<ITask[]> => {
  const tasks = await tasksRepo.getAll();
  return tasks.map(Task.toResponse);
};

// GET TASK BY ID
const get = async (boardId: string, taskId: string): Promise<ITask> => {
  const task = await tasksRepo.get(boardId, taskId);
  return Task.toResponse(task);
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
  const createdTask = await tasksRepo.create(
    boardId,
    title,
    order,
    description,
    userId,
    columnId
  );

  if (createdTask) {
    return Task.toResponse(createdTask);
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
  const updatedTask = await tasksRepo.update(
    boardId,
    taskId,
    title,
    order,
    description,
    userId,
    columnId
  );

  if (updatedTask) {
    return Task.toResponse(updatedTask);
  }
  throw new Error('[App] Null Pointer Exception!');
};

// DELETE TASK
const remove = async (deletionId: string): Promise<ITask> => {
  const task = await tasksRepo.remove(deletionId);
  if (task) {
    return Task.toResponse(task);
  }
  throw new Error('[App] Null Pointer Exception!');
};

export const tasksService = {
  getAll,
  get,
  create,
  update,
  remove,
};
