import * as PIXI from 'pixi.js';
import * as st from './game_state';
import { deleteHomeScreen , postHomeScreen} from './home_screen.js';
import { loader } from './load.js';
import { initDeck, initSprites, playersNames } from './play_screen';

export let w = window.innerWidth;
export let h = window.innerHeight;

export let scene = null;
export let app = null;

export let isPlayActive = false;

export const initPixi = () => {

  app = new PIXI.Application({
    resizeTo: window,
    backgroundColor: 0x000000,
  });
  //

  scene = new PIXI.Container();
  app.stage.addChild(scene);

  loader.onComplete.add(() => {
    initSprites();
    playersNames(st.player1Name, st.player2Name);
    initDeck();
  })
}

export const setPlayActive = (mode) => {
  isPlayActive = mode;
}

const deletePlayingScreen = () => {
  document.body.removeChild(app.view)
}

const postPlayingScreen = () => {
  document.body.appendChild(app.view);
}

export const setScreen = () => {
  //postHomeScreen();

  postPlayingScreen();
}

