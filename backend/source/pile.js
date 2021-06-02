const Cards = require("./cards");
const Card = require("./card");

class Pile extends Cards {
  constructor() {
    super([]);
  }

  add(cards) {
    for (let c of cards) {
      this.cards.push(c);
    }
  }
  getTopCard() {
    return this.cards[this.cards.length - 1];
  }

  /**
   * @param {Cards} cards - cards from hand
   */
  checkIfLegalMove(cards, card) {
    let rankPile = card.getRank();
    let suitPile = card.getSuit();

    if (cards.length == 1) {
      let card = cards[0];
      let rankHand = card.getRank();
      let suitHand = card.getSuit();
      if (rankHand == "j") {
        return true;
      } else if (rankHand == rankPile || suitHand == suitPile) {
        return true;
      } else {
        return false;
      }
    } else {
      let card = cards.pop();
      if (card.getRank() == "1") {
        return this.checkIfLegalMove(cards, card);
      } else {
        return false;
      }
    }
  }
}

module.exports = Pile;
