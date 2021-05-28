const Card = require('./card');
const Cards = require('./cards');
const Game = require('./game');

let gamesCounter = 0;

let allGames = [];
let gameIndex = {};
let playersNames = {};
lobby = '';

socketHandler = (socket) => {
    console.log('Established connection: ' + socket.id);

    socket.emit('successful', {
        id: socket.id,
    });

    socket.on('enterToLobby', (msg) => {

        playersNames[socket.id] = msg.name
        if (lobby === '') {
            lobby = socket.id;
        }
        else {
            const game = new Game(socket.id, lobby);

            game.deckOfCards.shuffle();
            game.putFirstCardOnPile();
            game.dealCards();

            allGames.push(game);
            gameIndex[lobby] = gamesCounter;
            gameIndex[socket.id] = gamesCounter;

            socket.emit('ready', {
                opponentName: playersNames[lobby],
                playerName: playersNames[socket.id]
            });

            socket.to(lobby).emit('ready', {
                opponentName: playersNames[socket.id],
                playerName: playersNames[lobby]
            });

            lobby = '';

            gamesCounter += 1;
        }
    })

    socket.on('gameStart', (msg) => {
        const index = gameIndex[socket.id];
        const game = allGames[index];
        const num = socket.id == game.playersId.player1 ? 1 : 2;
        const turn = game.turn;
        const player = 'player' + num;

        socket.emit('turnOn', {
            action: 'deal',
            hand: game.playersHand[player].toStringArray(),
            pile: game.pile.toStringArray(),
            turn: num == turn
        });
    });

    socket.on('turn', (res) => {
        const index = gameIndex[socket.id];
        const game = allGames[index];
        const num = socket.id == game.playersId.player1 ? 1 : 2;
        const player = 'player' + num;
        const opponent = 'player' + (num == 1 ? 2 : 1);
        const opp = socket.id == game.playersId.player1
            ? game.playersId.player2 : game.playersId.player1;
        const turn = game.turn;

        if (res.msg == 'getCard'){
            let card = game.getCardFromDeck(player)

            socket.emit('turnOn', {
                action: 'cardToPlayersHand',
                card: card.toString(),
                turn: true,
            });

            socket.to(opp).emit('turnOn', {
                action: 'cardToOpponentHand',
                turn: false,
            });
            return;
        }

        const cards = new Cards(res.cards);

        if ( game.putCardsOnPile(player, cards.show(), game.pile.getTopCard())) {
            const lastCard = cards.show().pop();

            if( lastCard.getRank() == '7'){
                takeCards(socket, game, opponent, opp, 2);
            }
            if (lastCard.toString() == '2c'){
                takeCards(socket, game, opponent, opp, 4);
            }


            socket.emit('turnOn', {
                action: 'myCardsToPile',
                cards: cards.toStringArray(),
                turn: false,
            });

            socket.to(opp).emit('turnOn', {
                action: 'oppCardsToPile',
                cards: cards.toStringArray(),
                turn: true,
            });

            game.setTurn(turn == 1 ? 2 : 1);
        } else {
            socket.emit('turnOn', {
                action: 'wrongCards'
            });
        }

        let playerCards = game.playersHand[player].show().length;
        let opponentCards = game.playersHand[opponent].show().length;
        if( playerCards == 0 || opponentCards == 0 ) {
            // END GAME
            let msg1 = 'lose';
            let msg2 = 'lose'

            if (playerCards == 0 )
                msg1 = 'win'
            else
                msg2 = 'win'

            socket.emit('endGame', {
                msg: msg1
            });

            socket.to(opp).emit('endGame', {
               msg: msg2
            });
        }

    });

    socket.on('disconnect', () => {
        console.log('disconnected: ' + socket.id)

        const index = gameIndex[socket.id];

        if (index >= 0) {
            const game = allGames[index];
            const oppId = socket.id == game.playersId.player1
                ? game.playersId.player2 : game.playersId.player1;

            socket.to(oppId).emit('end', {
                msg: 'disconnected'
            });

            delete gameIndex[socket.id];
            delete gameIndex[oppId];
        }

        delete playersNames[socket.id];

    });
}

const takeCards = (socket, game, player, pl1, num) => {
    for (let i = 0; i < num; i++){
        let card = game.getCardFromDeck(player)

        socket.to(pl1).emit('turnOn', {
            action: 'cardToPlayersHand',
            card: card.toString(),
            turn: true,
        });

        socket.emit('turnOn', {
            action: 'cardToOpponentHand',
            turn: false,
        });
    }
}

module.exports = socketHandler;
