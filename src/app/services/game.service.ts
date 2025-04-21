import { Injectable } from '@angular/core';
import { ConnectFourGame, ConnectFourState } from '../../game/connect-four';
import { Client } from 'boardgame.io/client';
import { Subject } from 'rxjs';
import { ClientState } from 'boardgame.io/dist/types/src/client/client';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  $gameState = new Subject<ClientState<ConnectFourState>>();
  gameClient = Client({
    game: ConnectFourGame,
    numPlayers: 2,
    debug: true,
  });

  constructor() {
    this.gameClient.start();
    this.gameClient.subscribe((state) => this.$gameState.next(state));
  }

  dropChecker(column: number): void {
    this.gameClient.moves['dropChecker'](column);
  }
}
