const Card = require('./card');
const Game = require('./game');

let gamesCounter = 0;

let allGames = [];
let gameIndex = {};
let rematch = {};
let accept = {};
let playersNames = {};
lobby = '';

let gameDuration = 48;


socketHandler = (socket) => {
    console.log('Established connection: ' + socket.id);

    socket.emit('successful', {
        id: socket.id,
    });

    socket.on('gameLobby', (msg) => {
        
        playersNames[socket.id] = msg.name
        if (lobby === '') {
            lobby = socket.id;
        }
        else {
            const game = new Game(socket.id, lobby);

            game.deckOfCards.shuffle();
            
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
            turn: num == turn,
            turnNum: game.turnCounter
        });

    });

    socket.on('turn', (res) => {
        const card = new Card(res.card);
        const cards = res.cards.map(x => new Card(x));
        const index = gameIndex[socket.id];
        const game = allGames[index];
        const num = socket.id == game.playersId.player1 ? 1 : 2;
        const player = 'player' + num;
        const opp = socket.id == game.playersId.player1
            ? game.playersId.player2 : game.playersId.player1;
        const turn = game.turn;
        const opponent = 'player' + (num == 1 ? 2 : 1);
        const turnCount = game.turnCounter;

        // TODO

        game.setTurnCounter(game.turnCounter + 1);

        game.setTurn(turn == 1 ? 2 : 1);

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

            game.setTurnCounter(-1);

            delete gameIndex[socket.id];
            delete gameIndex[oppId];
        }

        delete playersNames[socket.id];
        
    });


}

module.exports = socketHandler;
