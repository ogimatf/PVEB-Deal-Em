const Hands = require("./hands");
const Deck = require("./deck");
const Pile = require("./pile");
const db = require("./db");

class Game {
  constructor(id1, id2) {
    // game id koji bi iz baze isao
    let newId = null;

    this.gameId = newId;
    this.names = { player1: "player", player2: "player" };
    this.playersId = { player1: id1, player2: id2 };
    this.deckOfCards = new Deck();
    this.pile = new Pile();
    this.playersHand = { player1: new Hands(), player2: new Hands() };
    this.turn = 1;
  }

  setNames(name1, name2) {
    this.names.player1 = name1;
    this.names.player2 = name2;
  }

  takeCardFromDeck(player) {
    if (this.deckOfCards.size() >= 1) {
      let card = this.deckOfCards.getCard();
      this.playersHand[player].add(card);
    } else {
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
    } else {
      throw new Error("Deck does not have cards");
    }
  }

  getCardFromDeck(player) {
    let card = this.deckOfCards.getCard();
    this.playersHand[player].add([card]);
    return card;
  }

  putCardsOnPile(player, cards, card) {
    if (this.pile.checkIfLegalMove(cards, card)) {
      this.playersHand[player].remove(cards[0]);
      this.pile.add(cards);

      return true;
    } else {
      return false;
    }
  }

  putFirstCardOnPile() {
    this.pile.add([this.deckOfCards.getCard()]);
  }

  setTurn(num) {
    this.turn = num;
  }

  writeResult(player, p1, p2) {
    writeintoDb(player, this.names.player1, this.names.player2, p1, p2);
  }
}

const writeintoDb = async (player, name1, name2, p1, p2) => {
  const database = await db.getDatabase();

  let win1 = 0;
  let win2 = 0;
  let point1 = 0;
  let point2 = 0;

  if (player == "player1") {
    win1 = 1;
    point1 = p1;
    point2 = p2;
  } else {
    win2 = 1;
    point1 = p2;
    point2 = p1;
  }

  database
    .collection("user")
    .findOne({ name: name1 })
    .then((result) => {
      if (result === null) {
        console.log("Not Found");
      } else {
        let win = result.winNum + win2;
        let lose = result.loseNum + win1;
        let points = result.points + point2;

        database
          .collection("user")
          .updateOne(
            { name: name1 },
            {
              $set: {
                winNum: win,
                loseNum: lose,
                points,
              },
            }
          )
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });

  database
    .collection("user")
    .findOne({ name: name2 })
    .then((result) => {
      if (result === null) {
        console.log("Not Found");
      } else {
        let win = result.winNum + win1;
        let lose = result.loseNum + win2;
        let points = result.points + point1;

        database
          .collection("user")
          .updateOne(
            { name: name2 },
            {
              $set: {
                winNum: win,
                loseNum: lose,
                points,
              },
            }
          )
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = Game;
