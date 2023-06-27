import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GameService } from 'src/app/services/game.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent {
  constructor(private authService : AuthService, private router: Router, private menuService : MenuService) {}

  onLogout(){
    this.authService.logout()
    this.router.navigate(["/login"]);
  }

  onStartNewGameAgainstHuman(gameId: number){
    this.menuService.startNewGameAgainstHuman(gameId);
  }

  startNewGameAgainstBot(gameId: number){
    this.menuService.startNewGameAgainstBot(gameId);
  }
}
