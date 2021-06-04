// @ts-check

import { boardsRepo } from 'resources/boards/board.memory.repository';
import { Board, IBoard } from 'resources/boards/board.model';

// GET ALL BOARDS
const getAll = (): IBoard[] => {
  const boards = boardsRepo.getAll();
  return boards.map(Board.toResponse);
};

// GET BOARD
const get = (boardId: string): IBoard => {
  const board = boardsRepo.get(boardId);
  return Board.toResponse(board);
};

// CREATE BOARD
const create = (title: string, columns: string): IBoard => {
  const board = boardsRepo.create(title, columns);
  if (board) {
    return Board.toResponse(board);
  }
  throw new Error('[App] Null Pointer Exception!');
};

// UPDATE BOARD
const update = (boardId: string, title: string, columns: string): IBoard => {
  const board = boardsRepo.update(boardId, title, columns);
  if (board) {
    return Board.toResponse(board);
  }
  throw new Error('[App] Null Pointer Exception!');
};

// DELETE BOARD
const remove = (boardId: string): IBoard => {
  const board = boardsRepo.remove(boardId);
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
