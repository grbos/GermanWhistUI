import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameInfo } from '../models/game-info';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private openGamesURL = "games/GermanWhist";
  private ongoingGamesURL = "Users/games/GermanWhist";

  constructor(private http: HttpClient) { }

  getOpenGames(): Observable<GameInfo[]> {
    return this.http.get<GameInfo[]>(`${environment.apiUrl}/${this.openGamesURL}`);
  }

  getOngoingGames(): Observable<GameInfo[]> {
    return this.http.get<GameInfo[]>(`${environment.apiUrl}/${this.ongoingGamesURL}`);
  }
  
  public resumeGame(gameId : number){
    //TODO
    console.log(`starting game ${gameId}`)
  }

  public deleteGame(gameId : number){
    //TODO
    console.log(`deleting game ${gameId}`)
  }

  public joinGame(gameId : number){
    //TODO
    console.log(`joining game ${gameId}`)
  }

  public startNewGameAgainstHuman(gameId : number){
    //TODO
    console.log(`joining game ${gameId}`)
  }

  public startNewGameAgainstBot(gameId : number){
    //TODO
    console.log(`joining game ${gameId}`)
  }
}
