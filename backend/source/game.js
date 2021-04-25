 const Hands = require('./hands');
 const Deck = require('./deck');
 const Pile = require('./pile');
 
 class Game {
   
   constructor(id1, id2) {

     // game id koji bi iz baze isao
     let newId = null;
 
     this.gameId = newId;
     this.playersId = { player1: id1, player2: id2 };
     this.deckOfCards = new Deck();
     this.pile = new Pile();
     this.playersHand = { player1: new Hands(), player2: new Hands() };
     this.playersTalon = { player1: 0, player2: 0 };
     this.turn = 1;
     this.turnCounter = 1;
     this.lastTaker = 'player1';
   }
   putOnPileFromDeck() {
     if (this.deckOfCards.size() >= 1) {
        let card = this.deckOfCards.getCard();
        this.pile.add(card);
     }
     else {
       throw new Error("Deck does not have cards");
     }
   }
   // podelimo svakom igracu po 6 karata
   dealCards() {
     if (this.deckOfCards.size() >= 12) {
       let cards1 = [];
       let cards2 = [];
       for (let i = 0; i < 6; i++) {
         let card1 = this.deckOfCards.getCard();
         let card2 = this.deckOfCards.getCard();
         cards1.push(card1);
         cards2.push(card2);
       }
       this.playersHand.player1.add(cards1);
       this.playersHand.player2.add(cards2);
     }
     else {
       throw new Error("Deck does not have cards");
     }
   }
   moveFromHandsToPile(player, card) {
    let cardRemoved = this.playersHand[player].remove(card);

    if (cardRemoved) {
      this.pile.add(card);
      return true;
    }
    else {
      return false
    }
   }

   setTurn(num) {
    this.turn = num;
   }

   setTurnCounter(value) {
    this.turnCounter = value;
   }
 }
 
 module.exports = Game
 