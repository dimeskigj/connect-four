import { Component, OnInit } from '@angular/core';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  board: number[][] = Array(6)
    .fill(undefined)
    .map(() => Array(7).fill(0));
  currentPlayer: number = 1;

  constructor(private gameService: GameService) {
    this.gameService.$gameState.subscribe((state) => {
      this.board = state?.G.board!;
      this.currentPlayer = +state?.ctx.currentPlayer! + 1;
      console.log(this.currentPlayer)
    });
  }

  dropChecker(column: number): void {
    this.gameService.dropChecker(column);
  }
}
