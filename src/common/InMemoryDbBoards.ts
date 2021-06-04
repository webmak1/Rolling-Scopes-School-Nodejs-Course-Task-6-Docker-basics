// @ts-check

import { DELAY } from 'common/constants';
import { DBTasks } from 'common/InMemoryDbTasks';
import { remove } from 'lodash';
import { IBoard } from 'resources/boards/board.model';

const BoardsData: IBoard[] = [];

// GET ALL BOARDS
const getAllBoards = (): Promise<IBoard[]> => {
  console.log('GET ALL BOARDS');
  return new Promise((success, failure) => {
    setTimeout(() => {
      try {
        const res = BoardsData.slice(0);
        console.log('GET ALL BOARDS SUCCESS');
        success(res);
      } catch (error) {
        console.log('GET ALL BOARDS FAILURE');
        failure(new Error('Error: Something went wrong'));
      }
    }, DELAY);
  });
};

// GET BOARD BY ID
const getBoard = (boardId: string): Promise<IBoard> => {
  console.log(`GET BOARD BY ID...${boardId}`);
  return new Promise((success, failure) => {
    setTimeout(async () => {
      try {
        const allBoards = await getAllBoards();
        const res = allBoards.filter((el) => el?.id === boardId)[0];
        success(res);
      } catch (error) {
        console.log('GET BOARD BY ID FAILURE');
        failure(new Error('Error: Something went wrong'));
      }
    }, DELAY);
  });
};

// CREATE BOARD
const createBoard = (board: IBoard): Promise<IBoard> => {
  console.log('CREATING BOARD...');
  console.log(board);
  return new Promise((success, failure) => {
    setTimeout(() => {
      try {
        BoardsData.push(board);
        console.log('CREATING BOARD...SUCCESS');
        success(getBoard(board.id));
      } catch (error) {
        console.log('CREATING BOARD...FAILURE');
        failure(new Error('Error: Something went wrong'));
      }
    }, DELAY);
  });
};

// UPDATE BOARD
const updateBoard = async (updateBoard: IBoard): Promise<IBoard> => {
  console.log('UPDATING BOARD...');
  return new Promise((success, failure) => {
    setTimeout(async () => {
      try {
        removeBoard(updateBoard.id);
        createBoard(updateBoard);
        const res = await getBoard(updateBoard.id);
        success(res);
      } catch (error) {
        console.log('UPDATING BOARD...FAILURE');
        failure(new Error('Error: Something went wrong'));
      }
    }, DELAY);
  });
};

// REMOVE BOARD
const removeBoard = async (boardId: string): Promise<IBoard> => {
  console.log('DELETING BOARD...');
  return new Promise((success, failure) => {
    setTimeout(async () => {
      try {
        const deletedBoard = await getBoard(boardId);
        remove(BoardsData, (board) => board.id === boardId);
        DBTasks.removeTaskByBoardId(boardId);
        const res = deletedBoard;
        success(res);
      } catch (error) {
        console.log('DELETING BOARD...FAILURE');
        failure(new Error('Error: Something went wrong'));
      }
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
