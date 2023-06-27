import { Component } from '@angular/core';
import { Card } from './models/card';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GermanWhistUI';
  cards: Card[] = [];
  
  constructor(private gameService : GameService) {}
  
  ngOnInit() : void {
  }
}