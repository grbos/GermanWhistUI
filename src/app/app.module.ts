import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { JwtService } from './services/interceptors/jwt.service';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { OpenGamesComponent } from './components/open-games/open-games.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainMenuComponent,
    OpenGamesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
