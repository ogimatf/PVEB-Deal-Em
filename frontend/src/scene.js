import * as PIXI from 'pixi.js';
import { postHomeScreen} from './home_screen.js';
import { loader } from './load.js';
import { initConnection } from './socket_conn';

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

  scene = new PIXI.Container();
  app.stage.addChild(scene);

  loader.onComplete.add(() => {
    initConnection();
  })
}

export const setPlayActive = (mode) => {
  isPlayActive = mode;
}

export const deletePlayingScreen = () => {
  document.body.removeChild(app.view)
}

export const postPlayingScreen = () => {
  document.body.appendChild(app.view);
}

export const setScreen = () => {
  postHomeScreen();
}


