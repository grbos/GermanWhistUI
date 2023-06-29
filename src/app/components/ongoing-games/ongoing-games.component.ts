import { Component } from '@angular/core';
import { GameInfo } from 'src/app/models/game-info';
import { GameService } from 'src/app/services/game.service';
import { MenuService } from 'src/app/services/menu.service';
import { AppRoutes } from 'src/constants';

@Component({
  selector: 'app-ongoing-games',
  templateUrl: './ongoing-games.component.html',
  styleUrls: ['./ongoing-games.component.css']
})
export class OngoingGamesComponent {
  ongoingGames : GameInfo[] = [];
  AppRoutes = AppRoutes;

  constructor(private menuService: MenuService){}
  
  ngOnInit() {
    this.loadOngoingGames();
  }

  loadOngoingGames(){
    this.menuService.getOngoingGames().subscribe({
      next: (games) => this.ongoingGames = games,
      error: (e) => console.error(e)
  });
  }

  onDeleteGame(gameId : number){
    if (confirm(`Are you sure that you want to delete Game ${gameId}?`)){
      this.menuService.deleteGame(gameId).subscribe({
        next : () => this.loadOngoingGames(),
        error : (e) => console.error(e)
      });
    }
  }
}
