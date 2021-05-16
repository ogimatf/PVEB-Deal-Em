import { io } from 'socket.io-client';
import * as st from './game_state';
import { initDeck, initSprites, playersNames } from './play_screen';
import { setTurn } from './actions';

let host = 'http://localhost:4004'
let mySocketId = null;

export const initConnection = () => {
  let socket = io(host);

  socket.on('successful', (msg) => {
    mySocketId = msg.id;
    console.log(mySocketId);
  });

  socket.on('ready', (data) => {

    if (data.msg != 'rematch') {
      // TODO delete home screen
    }

    st.setPlayer1Name(data.playerName);
    st.setPlayer2Name(data.opponentName);

    initSprites();
    playersNames(st.player1Name, st.player2Name);

    initDeck();

    socket.emit('gameStart', "game run");
  });

  socket.on('turnOn', (res) => {
    applyActions(res);
    setTurn(res.turn);
  });
}



export const gameRequest = () => {
  socket.emit('gameRequest', 'rand game');
}
