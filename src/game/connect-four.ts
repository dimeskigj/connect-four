import type { Game, Move } from 'boardgame.io';
import { INVALID_MOVE } from 'boardgame.io/core';

export interface ConnectFourState {
  board: number[][];
}

const dropChecker: Move<ConnectFourState> = ({ G, ctx }, col: number) => {
  const hasFreeSpace = G.board[0][col] === 0;
  if (!hasFreeSpace) {
    return INVALID_MOVE;
  }

  for (let row = G.board.length - 1; row >= 0; row--) {
    const isCellEmpty = G.board[row][col] === 0;
    if (isCellEmpty) {
      G.board[row][col] = (ctx.turn % 2) + 1;
      break;
    }
  }

  return;
};

export const ConnectFourGame: Game<ConnectFourState> = {
  name: 'connect-four',
  maxPlayers: 2,
  setup: () => ({
    board: Array(6)
      .fill(undefined)
      .map(() => Array(7).fill(0)),
  }),
  turn: {
    minMoves: 1,
    maxMoves: 1,
  },
  moves: {
    dropChecker: dropChecker,
  },
  endIf: ({ G, ctx }): void | { winner: number } => {
    const rows = G.board.length;
    const cols = G.board[0].length;

    const directions = [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, -1],
    ];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cell = G.board[row][col];
        if (cell === 0) continue;

        for (const [dr, dc] of directions) {
          let count = 1;
          let r = row + dr;
          let c = col + dc;

          while (
            r >= 0 &&
            r < rows &&
            c >= 0 &&
            c < cols &&
            G.board[r][c] === cell
          ) {
            count++;
            if (count === 4) return { winner: cell };
            r += dr;
            c += dc;
          }
        }
      }
    }
  },
  ai: {
    enumerate: (G, ctx, playerID) => {
      const moves: { move: string; args?: any[] }[] = [];

      for (let col = 0; col <= G.board.length; col++) {
        if (G.board[0][col] === 0) {
          moves.push({
            move: 'dropChecker',
            args: [col],
          });
        }
      }

      return moves;
    },
  },
};
