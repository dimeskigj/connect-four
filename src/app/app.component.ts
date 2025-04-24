import { Component } from '@angular/core';

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

  constructor() {}

  dropChecker(column: number): void {
    console.log('Dropped checker @ ', column);
  }
}
