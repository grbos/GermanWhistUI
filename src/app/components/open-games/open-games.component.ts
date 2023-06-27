import { Component, OnInit } from '@angular/core';
import { GameInfo } from 'src/app/models/game-info';
import { GameService } from 'src/app/services/game.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-open-games',
  templateUrl: './open-games.component.html',
  styleUrls: ['./open-games.component.css']
})
export class OpenGamesComponent {
  openGames : GameInfo[] = [];

  constructor(private menuService : MenuService, private gameService : GameService){}
  
  ngOnInit() {
    this.menuService.getOpenGames().subscribe({
      next: (games) => this.openGames = games,
      error: (e) => console.log(e),
      complete: () => {}
  });
  }

  onResumeGame(gameId : number){
    this.gameService.resumeGame(gameId);
  }
}
