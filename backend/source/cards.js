const Card = require('./card');

class Cards {

    constructor(cards) {
      let cardsArray = [];

      for (let s of cards) {
        cardsArray.push(new Card(s));
      }
      this.cards = cardsArray;
    }

    toStringArray() {
      let strings = [];

      for (let card of this.cards) {
        strings.push(card.toString());
      }
      return strings;
    }

    size() {
      return this.cards.length;
    }

    show() {
      return [...this.cards];
    }

    getCard() {
      return this.cards.pop();
    }
  }

  module.exports = Cards;
