const Cards = require("./cards");

class Hands extends Cards {
  constructor() {
    super([]);
  }

  add(cards) {
    for (let c of cards) {
      this.cards.push(c);
    }
  }

  remove(card) {
    let pos = -1;
    for (let i = 0; i < this.size(); i++) {
      if (
        card.getRank() == this.cards[i].getRank() &&
        card.getSuit() == this.cards[i].getSuit()
      ) {
        pos = i;
        break;
      }
    }

    if (pos >= 0) {
      this.cards.splice(pos, 1);
      return true;
    } else return false;
  }

  countPoints() {
    let points = 0;

    for (let card of this.cards) {
      let rank = card.getRank();
      let suit = card.getSuit();

      if (rank == "j") {
        points += 20;
        continue;
      }
      if ((rank == "2" && suit == "c") || rank == "7") {
        points += 10;
        continue;
      }

      let num = Number(rank);

      if (!isNaN(num)) {
        points += num;
      } else {
        points += 10;
      }
    }

    return points;
  }
}

module.exports = Hands;
