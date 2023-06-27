export class GameState{
    id = 0;
    hand: number[] = [];
    newHandCardId?: number;
    numberOfHandCardsOpponent = 0;
    topCardId = 0;
    playedCardIdPlayer?: number;
    playedCardIdOpponent?: number;
    previousPlayedCardIdPlayer?: number;
    previousPlayedCardIdOpponent?: number;
    isPlayerStartingPlayer = true;
    isPlayerTrickStartPlayer= true;
    isPlayerCurrentPlayer = true;
    isPlayerPreviousTrickWinner = true;
    trumpSuit = 0;
    trumpSuitName = "";
    targetScore = 0;
    totalScorePlayer = 0;
    totalScoreOpponent = 0;
    roundScorePlayer = 0;
    roundScoreOpponent = 0;
    validMoves : number[] = [];
    isTrickOngoing = true;
  }