// @ts-check

import { DBBoards } from 'common/InMemoryDbBoards';
import { Board, IBoard } from 'resources/boards/board.model';

// GET ALL
const getAll = (): IBoard[] => {
  const res = DBBoards.getAllBoards();
  if (res) {
    return res;
  }
  throw new Error('[App] Null Pointer Exception!');
};

// GET BY ID
const get = (id: string): IBoard => {
  const board = DBBoards.getBoard(id);
  if (!board) {
    throw new Error(`[App Error] The board with id: ${id} was not found!`);
  }
  return board;
};

// CREATE BOARD
const create = (title: string, columns: string): IBoard => {
  const newBoard = new Board({
    id: undefined,
    title,
    columns,
  });
  DBBoards.createBoard(newBoard);
  return DBBoards.getBoard(newBoard.id);
};

// UPDATE BOARD
const update = (boardId: string, title: string, columns: string): IBoard => {
  const updateBoard = new Board({
    id: boardId,
    title,
    columns,
  });

  const res = DBBoards.updateBoard(updateBoard);

  if (!res) {
    throw new Error(`[App Error] The board with id: ${boardId} was not found!`);
  }
  return res;
};

// REMOVE BOARD
const remove = (boardId: string): IBoard => DBBoards.removeBoard(boardId);

export const boardsRepo = {
  getAll,
  get,
  create,
  update,
  remove,
};
