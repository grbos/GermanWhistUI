import { Injectable } from '@angular/core';
import { Card } from '../models/card';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { GameState } from '../models/gameState';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private baseGameUrl = "games/GermanWhist"
  private getCardsUrl = "Cards";
  private getGameStateUrl = "player-view";
  private makeMoveUrl = "move";
  private cardsList : Card[] = [];


  private apiUrl = "https://localhost:7005/api"

  constructor(private http : HttpClient) { }



  public getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(`${environment.apiUrl}/${this.baseGameUrl}/${this.getCardsUrl}`)
  }

  public addUrlToCards(cards: Card[]){
    for(let card of cards){
      card.url = `/assets/images/cards/${card.name.toLowerCase()}_of_${card.suitName.toLowerCase()}.svg`
    }
  }

  public getGameState(gameId : number){
    return this.http.get<GameState>(
      `${environment.apiUrl}/${this.baseGameUrl}/${gameId}/${this.getGameStateUrl}`)
  }

  public makeMove(gameId : number, cardId: number){
    return this.http.post<GameState>(
      `${environment.apiUrl}/${this.baseGameUrl}/${gameId}/${this.makeMoveUrl}`,
      {
        "cardId":cardId
      })
  }
 
}
