import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {path: '', component: MainMenuComponent, canActivate: [AuthService]  },
  {path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
