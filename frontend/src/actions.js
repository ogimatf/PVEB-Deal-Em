import { cardsSprites, table } from './load.js';
import { playerCards } from './play_screen.js';
import * as Animation from './animation.js'
import { addToHand, setHand, setPile } from './game_state.js';
import { socket } from './socket_conn.js';

let selected = [];
export let turn = false;

export function setTurn(_flag) {
  turn = _flag

  Animation.turnAnimation(turn)

  playerCards.map(x => x.interactive = turn);
}

export const playerPointerDown = (card) => {

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

export const pilePointerDown = (card) => {
  if (!turn) return;

  const codes = selected.map(card => getKeyByValue(cardsSprites, card))

  console.log(codes);

  if (codes.length > 0){
    socket.emit('turn', {
      cards: codes,
    });
  }
}

export const deckPointerDown = () => {
  if (turn){
    moveFromDeckToPlayer();
  }
}

export const moveFromHandToPile = (cards) => {

  Animation.playersCardsToPile(cards);

  selected.map(x => x.tint = 0xffffff);
  selected = [];
}

export const moveFromDeckToPlayer = (card) => {
  socket.emit('turn', {
    msg: 'getCard'
  });
}

const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value);
}

export const applyActions = (res) => {

  let cardCode = null;
  let card = null;
  let cards = null;

  switch (res.action) {
    case 'deal':
      setHand(res.hand);
      setPile(res.pile);

      Animation.dealCardsAnimation();
      break;
    case 'myCardsToPile':
      cards =  res.cards.map(card => cardsSprites[card]);

      moveFromHandToPile(cards)

      break;
    case 'oppCardsToPile':
      cards = res.cards.map(card => cardsSprites[card]);

      Animation.opponentsCardsToPile(cards);

      break;
    case 'cardToPlayersHand':
      cardCode = res.card;
      card = cardsSprites[cardCode];

      setTurn(res.turn);
      addToHand(res.card);

      Animation.cardToPlayerAnimation(card)
      break;
    case 'cardToOpponentHand':
      setTurn(res.turn);

      Animation.cardToOpponentAnimation();

      break;
  }
}
