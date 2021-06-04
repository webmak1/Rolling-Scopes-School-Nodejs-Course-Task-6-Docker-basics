// @ts-check

import { DBTasks } from 'common/InMemoryDbTasks';
import { remove } from 'lodash';
import { IBoard } from 'resources/boards/board.model';

const BoardsData: IBoard[] = [];

// GET ALL BOARDS
const getAllBoards = (): IBoard[] => {
  const res = BoardsData.slice(0);
  if (!res) {
    throw new Error('[App] Null Pointer Exception!');
  }
  return res;
};

// GET BOARD BY ID
const getBoard = (id: string): IBoard => {
  const allBoards = getAllBoards();
  const res = allBoards.filter((el) => el?.id === id)[0];
  if (!res) {
    throw new Error('[App] Null Pointer Exception!');
  }
  return res;
};

// CREATE BOARD
const createBoard = (board: IBoard): IBoard => {
  BoardsData.push(board);
  const res = getBoard(board.id);
  if (!res) {
    throw new Error('[App] Null Pointer Exception!');
  }
  return res;
};

// UPDATE BOARD
const updateBoard = (updateBoard: IBoard): IBoard => {
  removeBoard(updateBoard.id);
  createBoard(updateBoard);
  const res = getBoard(updateBoard.id);
  if (!res) {
    throw new Error('[App] Null Pointer Exception!');
  }
  return res;
};

// REMOVE BOARD
const removeBoard = (boardId: string): IBoard => {
  const deletedBoard = getBoard(boardId);
  remove(BoardsData, (board) => board.id === boardId);
  DBTasks.removeTaskByBoardId(boardId);
  const res = deletedBoard;
  if (!res) {
    throw new Error('[App] Null Pointer Exception!');
  }
  return res;
};

export const DBBoards = {
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  removeBoard,
};
