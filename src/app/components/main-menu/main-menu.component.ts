import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GameService } from 'src/app/services/game.service';
import { MenuService } from 'src/app/services/menu.service';
import { AppRoutes } from 'src/constants';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent {
  AppRoutes = AppRoutes;
  constructor(private authService : AuthService, private router: Router, private menuService : MenuService) {}

  public onLogout(){
    this.authService.logout()
    this.router.navigate(["/login"]);
  }

  public onStartNewGameAgainstHuman(){
    this.menuService.startNewGameAgainstHuman().subscribe({
      next: (gameInfo) => this.router.navigate([`/${AppRoutes.GAME}/${gameInfo.id}`]),
      error : (e) => console.error(e),
    });
  }

  public onStartNewGameAgainstBot(){
    this.menuService.startNewGameAgainstBot().subscribe({
      next: (gameInfo) => this.router.navigate([`/${AppRoutes.GAME}/${gameInfo.id}`]),
      error : (e) => console.error(e),
    });
  }
}
