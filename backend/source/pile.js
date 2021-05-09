const Cards = require('./cards');
const Card = require('./card');

class Pile extends Cards {

  constructor() {
    super([]);
  }


  add(cards) {
    for (let c of cards) {
      this.cards.push(c);
    }
  }

  /** 
   * @param {Card} card - card from hand
   * @param {Cards} cards - cards from pile
   */
  checkIfLegalMove(card, cards) {
    
    let rankHand = card.getRank();
    let suitHand = card.getSuit();
    let rankPile = cards.getCard().getRank();
    let suitPile = cards.getCard().getRank();
    // ako je zandar mozemo ga staviti sigurno
    if (rank == "j") {
      return true;
    }
    else if (rankHand == rankPile || suitHand == suitPile) { 
      return true;
    }
    else {
      return false;
    }
  }

}

module.exports = Pile;
