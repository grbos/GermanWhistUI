import { Component } from '@angular/core';
import { Card } from 'src/app/models/card';
import { GameState } from 'src/app/models/gameState';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  gameState : GameState = new GameState();
  cardsList : Card[] = [];
  showPreviousCards = false;

  constructor(private gameService : GameService){}

  ngOnInit(){
    let gameId = 29;
    this.gameService.getGameState(gameId).subscribe({
      next: (gameState) => {
        this.gameState = gameState;
        this.gameState.hand.sort();
      },
      error: (e) => console.log(e),
      complete: () => {}
  });

  this.gameService.getCards().subscribe({
    next: (cardsList) => {
      this.cardsList = cardsList;
      this.gameService.addUrlToCards(this.cardsList);
    },
    error: (e) => console.log(e),
    complete: () => {}

  });
}

  public getCardUrlFromId(cardId : number| undefined):string {
    if (cardId === undefined){
      return "";
    }
    let card = this.cardsList.find(card => card.id == cardId);
    if (card === undefined){
      return "";
    }    
    return card.url;
  }

  public onCardClick(cardId : number){
    console.log("Clicked card with id"+cardId);
  }

}
