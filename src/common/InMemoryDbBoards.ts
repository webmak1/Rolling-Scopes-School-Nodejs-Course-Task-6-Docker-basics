// @ts-check

import { DELAY } from 'common/constants';
import { DBTasks } from 'common/InMemoryDbTasks';
import { remove } from 'lodash';
import { IBoard } from 'resources/boards/board.model';

const BoardsData: IBoard[] = [];

// GET ALL BOARDS
const getAllBoards = (): Promise<IBoard[]> => {
  return new Promise((success, failure) => {
    setTimeout(() => {
      try {
        const res = BoardsData.slice(0);
        success(res);
      } catch (error) {
        failure(new Error('Error: Something went wrong'));
      }
    }, DELAY);
  });
};

// GET BOARD BY ID
const getBoard = (boardId: string): Promise<IBoard> => {
  return new Promise((success, failure) => {
    setTimeout(() => {
      (async () => {
        try {
          const allBoards = await getAllBoards();
          const res = allBoards.filter((el) => el?.id === boardId)[0];
          if (!res) {
            throw new Error('[App] Null Pointer Exception!');
          }
          success(res);
        } catch (error) {
          failure(new Error('Error: Something went wrong'));
        }
      })();
    }, DELAY);
  });
};

// CREATE BOARD
const createBoard = (board: IBoard): Promise<IBoard> => {
  return new Promise((success, failure) => {
    setTimeout(() => {
      try {
        BoardsData.push(board);
        success(getBoard(board.id));
      } catch (error) {
        failure(new Error('Error: Something went wrong'));
      }
    }, DELAY);
  });
};

// UPDATE BOARD
const updateBoard = async (updateBoard: IBoard): Promise<IBoard> => {
  return new Promise((success, failure) => {
    setTimeout(() => {
      (async () => {
        try {
          await removeBoard(updateBoard.id);
          await createBoard(updateBoard);
          const res = await getBoard(updateBoard.id);
          success(res);
        } catch (error) {
          failure(new Error('Error: Something went wrong'));
        }
      })();
    }, DELAY);
  });
};

// REMOVE BOARD
const removeBoard = async (boardId: string): Promise<IBoard> => {
  return new Promise((success, failure) => {
    setTimeout(() => {
      (async () => {
        try {
          const deletedBoard = await getBoard(boardId);
          remove(BoardsData, (board) => board.id === boardId);
          DBTasks.removeTaskByBoardId(boardId);
          const res = deletedBoard;
          success(res);
        } catch (error) {
          failure(new Error('Error: Something went wrong'));
        }
      })();
    }, DELAY);
  });
};

export const DBBoards = {
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  removeBoard,
};
