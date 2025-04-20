import { Component, OnInit } from '@angular/core';

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

  populateRandomField() {
    this.board[this.getRandomInt(this.board.length)][
      this.getRandomInt(this.board[0].length)
    ] = this.getRandomInt(3);
  }

  getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }
}
