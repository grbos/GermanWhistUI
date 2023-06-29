import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { RegisterComponent } from './components/register/register.component';
import { GameComponent } from './components/game/game.component';
import { AppRoutes } from 'src/constants';

const routes: Routes = [
  {path: AppRoutes.MENU, component: MainMenuComponent, canActivate: [AuthService]  },
  { path: AppRoutes.GAME + '/:gameId', component: GameComponent, canActivate: [AuthService] },
  {path: AppRoutes.LOGIN, component: LoginComponent },
  {path: AppRoutes.REGISTER, component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
