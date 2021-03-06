const Cards = require("./cards");
const Game = require("./game");

let gamesCounter = 0;

let allGames = [];
let gameIndex = {};
let playersNames = {};
lobby = "";

socketHandler = (socket) => {
  console.log("Established connection: " + socket.id);

  socket.emit("successful", {
    id: socket.id,
  });

  socket.on("enterToLobby", (msg) => {
    playersNames[socket.id] = msg.name;
    if (lobby === "") {
      lobby = socket.id;
    } else {
      let game = new Game(socket.id, lobby);

      game.setNames(playersNames[lobby], playersNames[socket.id]);

      game.deckOfCards.shuffle();
      game.putFirstCardOnPile();
      game.dealCards();

      allGames.push(game);
      gameIndex[lobby] = gamesCounter;
      gameIndex[socket.id] = gamesCounter;

      socket.emit("ready", {
        opponentName: playersNames[lobby],
      });

      socket.to(lobby).emit("ready", {
        opponentName: playersNames[socket.id],
      });

      lobby = "";

      gamesCounter += 1;
    }
  });

  socket.on("cancel", (msg) => {
    if (msg == "leftGame") {
      const index = gameIndex[socket.id];
      const game = allGames[index];
      const opp =
        socket.id == game.playersId.player1
          ? game.playersId.player2
          : game.playersId.player1;
      socket.to(opp).emit("opponentLeftGame", {});
    } else {
      lobby = "";
    }
  });

  socket.on("gameStart", (msg) => {
    const index = gameIndex[socket.id];
    const game = allGames[index];
    const num = socket.id == game.playersId.player1 ? 1 : 2;
    const turn = game.turn;
    const player = "player" + num;

    socket.emit("turnOn", {
      action: "deal",
      hand: game.playersHand[player].toStringArray(),
      pile: game.pile.toStringArray(),
      turn: num == turn,
    });
  });

  socket.on("turn", (res) => {
    const index = gameIndex[socket.id];
    const game = allGames[index];
    const num = socket.id == game.playersId.player1 ? 1 : 2;
    const player = "player" + num;
    const opponent = "player" + (num == 1 ? 2 : 1);
    const opp =
      socket.id == game.playersId.player1
        ? game.playersId.player2
        : game.playersId.player1;
    const turn = game.turn;

    if (res.msg == "next") {
      socket.emit("turnOn", {
        action: "setTurn",
        turn: false,
      });

      socket.to(opp).emit("turnOn", {
        action: "setTurn",
        turn: true,
      });
      return;
    }

    if (res.msg == "getCard") {
      let card = game.getCardFromDeck(player);

      socket.emit("turnOn", {
        action: "cardToPlayersHand",
        card: card.toString(),
        turn: true,
      });

      socket.to(opp).emit("turnOn", {
        action: "cardToOpponentHand",
        turn: false,
      });
      return;
    }

    const cards = new Cards(res.cards);

    if (game.putCardsOnPile(player, cards.show(), game.pile.getTopCard())) {
      const lastCard = cards.show().pop();

      if (lastCard.getRank() == "7") {
        takeCards(socket, game, opponent, opp, 2);
      }
      if (lastCard.toString() == "2c") {
        takeCards(socket, game, opponent, opp, 4);
      }

      socket.emit("turnOn", {
        action: "myCardsToPile",
        cards: cards.toStringArray(),
        turn: false,
      });

      socket.to(opp).emit("turnOn", {
        action: "oppCardsToPile",
        cards: cards.toStringArray(),
        turn: true,
      });

      game.setTurn(turn == 1 ? 2 : 1);
    } else {
      return;
    }

    let playerCards = game.playersHand[player].show().length;
    let opponentCards = game.playersHand[opponent].show().length;
    if (playerCards == 0 || opponentCards == 0) {
      let resultPlayer = game.playersHand[player].countPoints();
      let resultOpponent = game.playersHand[opponent].countPoints();

      let msg1 = "LOSE";
      let msg2 = "LOSE";

      if (playerCards == 0) msg1 = "WIN";
      else msg2 = "WIN";

      socket.emit("endGame", {
        data: {
          msg: msg1,
          player: resultPlayer,
          opponent: resultOpponent,
        },
      });

      socket.to(opp).emit("endGame", {
        data: {
          msg: msg2,
          player: resultOpponent,
          opponent: resultPlayer,
        },
      });

      game.writeResult(player, resultPlayer, resultOpponent);

      let newGame = new Game(socket.id, opp);
      newGame.setNames(playersNames[lobby], playersNames[socket.id]);

      newGame.deckOfCards.shuffle();
      newGame.putFirstCardOnPile();
      newGame.dealCards();

      allGames.push(newGame);
    }
  });

  socket.on("turnChange", (res) => {});

  socket.on("disconnect", () => {
    console.log("disconnected: " + socket.id);

    const index = gameIndex[socket.id];

    if (index >= 0) {
      const game = allGames[index];
      const oppId =
        socket.id == game.playersId.player1
          ? game.playersId.player2
          : game.playersId.player1;

      socket.to(oppId).emit("end", {
        msg: "disconnected",
      });

      delete gameIndex[socket.id];
      delete gameIndex[oppId];
    }

    delete playersNames[socket.id];
  });
};

const takeCards = (socket, game, player, pl1, num) => {
  for (let i = 0; i < num; i++) {
    let card = game.getCardFromDeck(player);

    socket.to(pl1).emit("turnOn", {
      action: "cardToPlayersHand",
      card: card.toString(),
      turn: true,
    });

    socket.emit("turnOn", {
      action: "cardToOpponentHand",
      turn: false,
    });
  }
};

module.exports = socketHandler;
