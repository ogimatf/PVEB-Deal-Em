import { cardsSprites } from './load.js';
import { playerCards } from './play_screen.js';
import * as Animation from './animation.js'

let selected = [];
export let turn = false;

export function setTurn(_flag) {
  turn = _flag

  playerCards.map(x => x.interactive = turn);

  // changeTurnColor();
}


export const playerPointerDown = (card) => {
  Animation.cardToOpponentAnimation(card);
  if (turn) {
    moveFromHandToPile(card);
  }

  const index = selected.indexOf(card);

  if (index >= 0) {
    selected.splice(index, 1);
    card.tint = 0xffffff;
  }
  else {
    selected.push(card);
    card.tint = 0xaaaaff;
  }

}

/**
 * @description Sends signal to server for move
 * @param {PIXI.Sprite} card
 */
export const moveFromHandToPile = (card) => {
  const code = getKeyByValue(cardsSprites, card);

  Animation.playersCardsToPile(selected);
  // socket.emit('turn', {
  //   card: code,
  //   cards: []
  // });
}

export const moveFromDeckToPlayer = (card) => {
 Animation.cardToPlayerAnimation(card)
  // socket.emit('turn', {
  //   card: code,
  //   cards: talonCodes
  // });
}

export const pilePointerDown = (card) => {
  const size = selected.length;
  if (size != 0) {
    moveFromHandToPile(card);
  }

  selected.map(x => x.tint = 0xffffff);
  selected = [];
}

const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value);
}
