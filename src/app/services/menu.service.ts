import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameInfo } from '../models/game-info';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private baseGamesUrl = "games/GermanWhist";
  private ongoingGamesURL = "Users/games/GermanWhist";

  constructor(private http: HttpClient) { }

  getOpenGames(): Observable<GameInfo[]> {
    return this.http.get<GameInfo[]>(`${environment.apiUrl}/${this.baseGamesUrl}`);
  }
 
  public startNewGameAgainstHuman(): Observable<GameInfo>{
    return this.http.post<GameInfo>(`${environment.apiUrl}/${this.baseGamesUrl}`, 
    {
      "opponentPlayerId": null,
      "againstBotOpponent": false
    });
  }

  getOngoingGames(): Observable<GameInfo[]> {
    return this.http.get<GameInfo[]>(`${environment.apiUrl}/${this.ongoingGamesURL}`);
  }
  
  public deleteGame(gameId : number): Observable<any>{
    return  this.http.delete<any>(`${environment.apiUrl}/${this.baseGamesUrl}/${gameId}`);
  }

  public joinGame(gameId : number): Observable<GameInfo>{
    return this.http.post<any>(`${environment.apiUrl}/${this.baseGamesUrl}/${gameId}`, {});
  }


  public startNewGameAgainstBot(){
    return this.http.post<GameInfo>(`${environment.apiUrl}/${this.baseGamesUrl}`, 
    {
      "againstBotOpponent": true,
      "botDifficulty": 0
    });
  }
}
