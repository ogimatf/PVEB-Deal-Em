import { cardsSprites } from './load.js';
import { playerCards } from './play_screen.js';

export let turn = false;

export function setTurn(_flag) {
  turn = _flag

  playerCards.map(x => x.interactive = turn);

  // changeTurnColor();
}


export const playerPointerDown = (card) => {

  if (turn) {
    moveFromHandToPile(card);
  }

}

/**
 * @description Sends signal to server for move
 * @param {PIXI.Sprite} card
 */
export const moveFromHandToPile = (card) => {
  const code = getKeyByValue(cardsSprites, card);

  // socket.emit('turn', {
  //   card: code,
  //   cards: []
  // });
}

export const moveFromDeckToPlayer = (card) => {

  // socket.emit('turn', {
  //   card: code,
  //   cards: talonCodes
  // });
}

const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value);
}
