import { io } from 'socket.io-client';
import * as st from './game_state';
import { initDeck, initSprites, playersNames } from './play_screen';
import { applyActions, setTurn } from './actions';
import { deleteHomeScreen, postHomeScreen, removeWindow } from './home_screen';
import { deletePlayingScreen, postPlayingScreen, setScreen } from './scene';
import { endGameAnimate } from './animation';
import { initEndScreen, showEndScreen } from './end_screen';

export let socket = null;

let host = 'http://localhost:4004'
let mySocketId = null;

export const initConnection = () => {
  socket = io(host);

  socket.on('successful', (msg) => {
    mySocketId = msg.id;
    console.log(mySocketId);
  });

  socket.on('ready', (data) => {

    removeWindow();

    st.setPlayer1Name(data.playerName);
    st.setPlayer2Name(data.opponentName);

    initSprites();
    playersNames(st.player1Name, st.player2Name);

    initDeck();

    deleteHomeScreen();
    postPlayingScreen();

    socket.emit('gameStart', "game run");
  });

  socket.on('turnOn', (res) => {
    applyActions(res);
    setTurn(res.turn);
  });

  socket.on('endGame', (res) => {
    initEndScreen(res.data)
    showEndScreen();
    console.log('end')
  })

  socket.on('opponentLeftGame',(msg) => {
    deletePlayingScreen();
    postHomeScreen();
  })
}

export const gameRequest = () => {
  socket.emit('gameRequest', 'rand game');
}
