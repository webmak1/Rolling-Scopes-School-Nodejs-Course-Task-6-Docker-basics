// @ts-check

import { DBBoards } from 'common/InMemoryDbBoards';
import { Board, IBoard } from 'resources/boards/board.model';

// GET ALL
const getAll = async (): Promise<IBoard[]> => {
  const res = await DBBoards.getAllBoards();
  if (res) {
    return res;
  }
  throw new Error('[App] Null Pointer Exception!');
};

// GET BY ID
const get = async (id: string): Promise<IBoard> => {
  const board = await DBBoards.getBoard(id);
  if (!board) {
    throw new Error(`[App Error] The board with id: ${id} was not found!`);
  }
  return board;
};

// CREATE BOARD
const create = async (title: string, columns: string): Promise<IBoard> => {
  const newBoard = new Board({
    id: undefined,
    title,
    columns,
  });
  DBBoards.createBoard(newBoard);
  return await DBBoards.getBoard(newBoard.id);
};

// UPDATE BOARD
const update = async (
  boardId: string,
  title: string,
  columns: string
): Promise<IBoard> => {
  const updateBoard = new Board({
    id: boardId,
    title,
    columns,
  });

  const res = await DBBoards.updateBoard(updateBoard);

  if (!res) {
    throw new Error(`[App Error] The board with id: ${boardId} was not found!`);
  }
  return res;
};

// REMOVE BOARD
const remove = async (boardId: string): Promise<IBoard> =>
  await DBBoards.removeBoard(boardId);

export const boardsRepo = {
  getAll,
  get,
  create,
  update,
  remove,
};
