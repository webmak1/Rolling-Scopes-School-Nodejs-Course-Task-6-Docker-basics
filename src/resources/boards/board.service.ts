// @ts-check

import { boardsRepo } from 'resources/boards/board.memory.repository';
import { Board, IBoard } from 'resources/boards/board.model';

// GET ALL BOARDS
const getAll = async (): Promise<IBoard[]> => {
  const boards = await boardsRepo.getAll();
  return boards.map(Board.toResponse);
};

// GET BOARD
const get = async (boardId: string): Promise<IBoard> => {
  const board = await boardsRepo.get(boardId);
  return Board.toResponse(board);
};

// CREATE BOARD
const create = async (title: string, columns: string): Promise<IBoard> => {
  const board = await boardsRepo.create(title, columns);
  if (board) {
    return Board.toResponse(board);
  }
  throw new Error('[App] Null Pointer Exception!');
};

// UPDATE BOARD
const update = async (
  boardId: string,
  title: string,
  columns: string
): Promise<IBoard> => {
  const board = await boardsRepo.update(boardId, title, columns);
  if (board) {
    return Board.toResponse(board);
  }
  throw new Error('[App] Null Pointer Exception!');
};

// DELETE BOARD
const remove = async (boardId: string): Promise<IBoard> => {
  const board = await boardsRepo.remove(boardId);
  if (board) {
    return Board.toResponse(board);
  }
  throw new Error('[App] Null Pointer Exception!');
};

export const boardsService = {
  getAll,
  get,
  create,
  remove,
  update,
};
