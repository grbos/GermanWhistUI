import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, interval, switchMap } from 'rxjs';
import { Card } from 'src/app/models/card';
import { GameState } from 'src/app/models/gameState';
import { GameService } from 'src/app/services/game.service';
import { AppRoutes } from 'src/constants';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  gameState : GameState = new GameState();
  cardsList : Card[] = [];
  showPreviousCards = false;
  pollingInterval: Subscription | null = null;
  gameId : number = 0;
  AppRoutes = AppRoutes;

  constructor(private gameService : GameService, private changeDetector: ChangeDetectorRef, 
    private route: ActivatedRoute, private router : Router){}

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.gameId = +params['gameId']; // (+) converts string 'gameId' to a number
      this.loadGameState();
    });
    this.loadCardsList()
  }

  private loadCardsList(){
    this.gameService.getCards().subscribe({
      next: (cardsList) => {
        this.cardsList = cardsList;
        this.gameService.addUrlToCards(this.cardsList);
      },
      error: (e) => console.log(e)
    });
  }

  private loadGameState(){
    this.gameService.getGameState(this.gameId).subscribe({
      next: (newGameState) => {
        this.processNewGameState(newGameState);
        this.showPreviousCards = false;
      },
      error: (e) => console.log(e),
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
    if (this.gameState.validMoves.includes(cardId)){
      this.gameService.makeMove(this.gameId, cardId).subscribe({
        next: (newGameState) => {
          this.processNewGameState(newGameState);
        },
        error: (e) => console.error(e),

    });
    }
    else{
      console.error(`Card with Id ${cardId} is not a valid move`);
    }
  }

  private processNewGameState(newGameState : GameState){
    if (this.areGameStatesEqual(this.gameState, newGameState)){
      return;
    }
    this.gameState = newGameState;
    this.stopPolling()
    this.gameState.hand.sort((cardId1, cardId2) => this.cardSortingFunction(cardId1, cardId2));
    if(!this.gameState.isTrickOngoing && (this.gameState.previousPlayedCardIdPlayer != null)){
      this.showPreviousCards = true;
    }
    if (!this.gameState.isPlayerCurrentPlayer && !this.gameState.hasGameEnded) {
      this.startPolling();
    }
    if(this.gameState.hasGameEnded){
      if(this.gameState.totalScorePlayer > this.gameState.totalScoreOpponent){
        alert("Congratulations, you Won!")
      }
      else{
        alert("Too bad, you lost!")
      }
      this.router.navigate(['/' + AppRoutes.MENU]);
    }
    this.changeDetector.detectChanges();
  }

  private cardSortingFunction(cardId1 : number, cardId2 : number): number{
    let card1 = this.cardsList.find(card => card.id == cardId1);
    let card2 = this.cardsList.find(card => card.id == cardId2);
    if (card1 == undefined || card2 == undefined){
      return 0;
    }
    let suitDiff = card1.suit - card2.suit;
    if (suitDiff != 0){
      return suitDiff;
    }
    return card1.number - card2.number;
  }

  startPolling() {
    this.pollingInterval = interval(1000)
      .pipe(
        switchMap(() => this.gameService.getGameState(this.gameId))
      )
      .subscribe({
        next: (newGameState) => {
          this.processNewGameState(newGameState);
        },
        error: (e) => console.error(e),
      });
  }

  stopPolling() {
    if (this.pollingInterval) {
      this.pollingInterval.unsubscribe();
      this.pollingInterval = null;
    }
  }

  ngOnDestroy() {
    this.stopPolling();
  }

  removeCards(){
    this.showPreviousCards = false;
  }

  areGameStatesEqual(gameState1 : GameState, gameState2 : GameState) : boolean{
    return(
      gameState1.id == gameState2.id &&
      gameState1.playedCardIdOpponent == gameState2.playedCardIdOpponent &&
      gameState1.playedCardIdPlayer == gameState2.playedCardIdPlayer &&
      gameState1.previousPlayedCardIdOpponent == gameState2.previousPlayedCardIdOpponent &&
      gameState1.previousPlayedCardIdPlayer == gameState2.previousPlayedCardIdPlayer &&
      gameState1.isPlayerCurrentPlayer == gameState2.isPlayerCurrentPlayer
    );
  }



}
