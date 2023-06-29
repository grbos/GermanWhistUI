import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameInfo } from 'src/app/models/game-info';
import { GameService } from 'src/app/services/game.service';
import { MenuService } from 'src/app/services/menu.service';
import { AppRoutes } from 'src/constants';

@Component({
  selector: 'app-open-games',
  templateUrl: './open-games.component.html',
  styleUrls: ['./open-games.component.css']
})
export class OpenGamesComponent {
  openGames : GameInfo[] = [];

  constructor(private menuService : MenuService, private router : Router){}
  
  ngOnInit() {
    this.menuService.getOpenGames().subscribe({
      next: (games) => this.openGames = games,
      error: (e) => console.log(e)
  });
  }

  onJoinGame(gameId : number){
    this.menuService.joinGame(gameId).subscribe({
      next: (gameInfo) => this.router.navigate([`/${AppRoutes.GAME}/${gameInfo.id}`]),
      error : (e) => console.error(e),
    });
  }
}
