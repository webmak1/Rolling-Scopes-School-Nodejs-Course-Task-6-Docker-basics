// @ts-check

import { Application, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { usersService } from 'resources/users/user.service';
import express = require('express');

const router: Application = express();

export interface IUserReqBody {
  login: string;
  password: string;
  name: string;
}

// GET ALL
router.route('/').get(async (_req: Request, res: Response) => {
  try {
    return res.json(await usersService.getAll());
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send('Something bad happened!');
  }
});

// GET USER BY ID
router.route('/:id').get(async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.params;
    if (userId) {
      return res.json(await usersService.get(userId));
    }
    return res.status(StatusCodes.BAD_REQUEST).send('[App] invalid req params');
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send('Something bad happened!');
  }
});

// CREATE USER
router.route('/').post(async (req: Request, res: Response) => {
  try {
    const { login, password, name } = req.body as IUserReqBody;
    return res
      .status(StatusCodes.CREATED)
      .json(await usersService.create(login, password, name));
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send('Something bad happened!');
  }
});

// UPDATE USER
router.route('/:id').put(async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.params;
    const { login, password, name } = req.body as IUserReqBody;

    if (userId) {
      return res.json(await usersService.update(userId, login, password, name));
    }
    return res.status(StatusCodes.BAD_REQUEST).send('[App] invalid req params');
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send('Something bad happened!');
  }
});

// DELETE USER
router.route('/:id').delete(async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.params;
    if (userId) {
      return res.json(await usersService.remove(userId));
    }
    return res.status(StatusCodes.BAD_REQUEST).send('[App] invalid req params');
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send('Something bad happened!');
  }
});

export { router };
