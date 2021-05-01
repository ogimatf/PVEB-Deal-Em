import * as PIXI from 'pixi.js';
import { table } from './load';
import { h, scene, w } from './scene';

export let cardWidth = 0;
export let cardHeigth = 0;

export let background = null;
export let playerCont = null;
export let opponentCont = null;
export let playerName = null;
export let opponentName = null;
export let deckCont = null;

export const initSprites = () => {
  background = table;
  background.height = h;
  background.width = w;
  background.position.set(0,0);
  background.anchor.set(0);
  scene.addChild(background);

  playerCont = new PIXI.Container();
  playerCont.position.set(w/2, h * 0.95);
  scene.addChild(playerCont);

  opponentCont = new PIXI.Container();
  opponentCont.position.set(w/2, h * 0.05);
  scene.addChild(opponentCont);
}

export const playersNames = (name1, name2) => {

  let frameWidth = w/8
  let frameHeigth = frameWidth / 5;
  let fontSize = frameHeigth * 0.8;

  let textStyle = {
    fill: 0x000000,
    fontFamily: "Helvetica",
    fontSize: fontSize,
    align: 'center'
  }

  playerName = new PIXI.Graphics();
  playerName.beginFill(0xa3753f);
  playerName.drawRoundedRect(-frameWidth/2, -frameHeigth/2, frameWidth, frameHeigth, 5);
  playerName.endFill();
  playerCont.addChild(playerName);

  const pName = new PIXI.Text(name1, textStyle);
  pName.anchor.set(0.5);
  playerName.addChild(pName);

  opponentName = new PIXI.Graphics();
  opponentName.beginFill(0xa3753f);
  opponentName.drawRoundedRect(-frameWidth/2, -frameHeigth/2, frameWidth, frameHeigth, 5);;
  opponentName.endFill();
  opponentCont.addChild(opponentName);

  const oName = new PIXI.Text(name2, textStyle);
  oName.anchor.set(0.5);
  opponentName.addChild(oName);
}

export const initDeck = () => {
  deckCont = new PIXI.Container();
  deckCont.position.set(w * 0.75, h/2);
  scene.addChild(deckCont);

  cardWidth = w/12;
  cardHeigth = 1.5 * cardWidth;

  for (let i = 0; i < 52; i++) {
    let card = new PIXI.Sprite(PIXI.Texture.WHITE);
    card.width = cardWidth;
    card.height = cardHeigth;
    card.anchor.set(0.5);
    deckCont.addChild(card);
  }
}
