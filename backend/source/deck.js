const Cards = require('./cards');
const newDeck = require('./cardCodes.json');

class Deck extends Cards {

    constructor() {
        const deck = newDeck.codes;
        super(deck);
    }

    shuffle() {

        let i = this.cards.length;
        while (i > 1) {
            i -= 1;
            let j = Math.floor(Math.random() * i);
            let tmp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = tmp;
        }

    }

    getCard() {
        return this.cards.pop();
    }
}

module.exports = Deck;
 