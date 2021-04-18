import * as PIXI from 'pixi.js';
import { postHomeScreen } from './home-screen.js';
import { deleteHomeScreen } from './home_screen.js';

export let w = window.innerWidth;
export let h = window.innerHeight;

export let scene = null;
export let app = null;

export let isPlayActive = false;

export const initPixi = () => {

  app = new PIXI.Application({
    backgroundColor: 0x000000,
  });
  document.body.appendChild(app.view);

  scene = new PIXI.Container();
  app.stage.addChild(scene);
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

export const setSceen = () => {
  if (!isPlayActive) {
    deletePlayingScreen
    postHomeScreen();
  } else {
    deleteHomeScreen();
    postPlayingScreen();
  }
}

