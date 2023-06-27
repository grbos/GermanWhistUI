import { Component } from '@angular/core';
import { GameInfo } from 'src/app/models/game-info';
import { GameService } from 'src/app/services/game.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-ongoing-games',
  templateUrl: './ongoing-games.component.html',
  styleUrls: ['./ongoing-games.component.css']
})
export class OngoingGamesComponent {
  ongoingGames : GameInfo[] = [];

  constructor(private menuService: MenuService){}
  
  ngOnInit() {
    this.menuService.getOngoingGames().subscribe({
      next: (games) => this.ongoingGames = games,
      error: (e) => console.log(e),
      complete: () => {}
  });
  }

  onJoinGame(gameId : number){
    this.menuService.joinGame(gameId);
  }

  onDeleteGame(gameId : number){
    this.menuService.deleteGame(gameId);
  }
}
