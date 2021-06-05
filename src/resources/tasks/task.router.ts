// @ts-check

import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { tasksService } from 'resources/tasks/task.service';
import express = require('express');

const router = express.Router({ mergeParams: true });

export interface ITaskReqBody {
  title: string;
  order: string;
  description: string;
  userId: string;
  columnId: string;
}

// GET ALL TASKS
router.route('/').get(async (_req: Request, res: Response) => {
  try {
    return res.json(await tasksService.getAll());
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send('Something bad happened!');
  }
});

// GET TASK BY ID
router.route('/:id').get(async (req: Request, res: Response) => {
  try {
    const { boardId, id: taskId } = req.params;
    if (boardId && taskId) {
      return res.json(await tasksService.get(boardId, taskId));
    }
    return res.status(StatusCodes.BAD_REQUEST).send('[App] invalid req params');
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send('Something bad happened!');
  }
});

// CREATE TASK
router.route('/').post(async (req: Request, res: Response) => {
  try {
    const { boardId } = req.params;
    const {
      title,
      order,
      description,
      userId,
      columnId,
    } = req.body as ITaskReqBody;
    if (boardId) {
      return res
        .status(StatusCodes.CREATED)
        .json(
          await tasksService.create(
            boardId,
            title,
            order,
            description,
            userId,
            columnId
          )
        );
    }
    return res.status(StatusCodes.BAD_REQUEST).send('[App] invalid req params');
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send('Something bad happened!');
  }
});

// UPDATE TASK
router.route('/:id').put(async (req: Request, res: Response) => {
  console.log('ROUTE UPDATE TASK');

  try {
    const { boardId, id: taskId } = req.params;
    const {
      title,
      order,
      description,
      userId,
      columnId,
    } = req.body as ITaskReqBody;

    console.log('ROUTE UPDATE TASK boardId');
    console.log(boardId);

    console.log('ROUTE UPDATE TASK taskId');
    console.log(taskId);

    if (boardId && taskId) {
      return res.json(
        await tasksService.update(
          boardId,
          taskId,
          title,
          order,
          description,
          userId,
          columnId
        )
      );
    }

    return res.status(StatusCodes.BAD_REQUEST).send('[App] invalid req params');
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.NOT_FOUND).send('Something bad happened!');
  }
});

// DELETE TASK
router.route('/:id').delete(async (req: Request, res: Response) => {
  try {
    const { id: deletionId } = req.params;
    if (deletionId) {
      return res.json(await tasksService.remove(deletionId));
    }
    return res.status(StatusCodes.BAD_REQUEST).send('[App] invalid req params');
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send('Something bad happened!');
  }
});

export { router };
