import anime from 'animejs/lib/anime.es.js';
import { moveFromHandToPile, pilePointerDown, playerPointerDown, turn } from './actions';
import { hand, pile } from './game_state';
import { cardsSprites } from './load';
import * as ps from './play_screen';
import { w } from './scene';

export const dealCardsAnimation = () => {
  let ease = 'easeOutSine';
  let dur = 500;

  let handWidth = w * .4;
  const firstCard = ps.deckCards.pop();

  anime({
    targets: firstCard.position,
    x: ps.playerCont.x - ps.deckCont.x,
    duration: dur,
    easing: ease,
    delay: anime.stagger(0, { start: 500 }),
    complete: () => {
      transferCard(ps.deckCont, null, ps.pileCont, ps.pileCards, firstCard);
      firstCard.x = 0;
      firstCard.y = 0;
      let cardFace = cardsSprites[pile[0]];
      faceUpCard(firstCard, cardFace, ps.pileCont, ps.pileCards, pilePointerDown);
    }
  });

  for (let i = 0; i < 6; i++) {
    let startAnim = 500 * i + 1000;

    const card = ps.deckCards.pop();

    anime({
      targets: card.position,
      x: ps.playerCont.x - ps.deckCont.x - handWidth/2 + i * handWidth/6 + ps.cardWidth/2,
      y: ps.playerCont.y - ps.deckCont.y - ps.cardHeigth * .7,
      duration: dur,
      easing: ease,
      delay: anime.stagger(0, { start: startAnim }),
      complete: () => {
        transferCard(ps.deckCont, null, ps.playerCont, ps.playerCards, card);

        card.x = -handWidth/2 + i * handWidth/6 + ps.cardWidth/2;
        card.y = - ps.cardHeigth * .7;

        let cardFace = cardsSprites[hand[i]];
        faceUpCard(card, cardFace, ps.playerCont, ps.playerCards, playerPointerDown);
      }
    })

    const cardOpp = ps.deckCards.pop();

    anime({
      targets: cardOpp.position,
      x: ps.opponentCont.x - ps.deckCont.x -handWidth/2 + i * handWidth/6 + ps.cardWidth/2,
      y: ps.opponentCont.y - ps.deckCont.y + ps.cardHeigth * .7,
      duration: dur,
      easing: ease,
      delay: anime.stagger(0, { start: startAnim }),
      complete: () => {
        transferCard(ps.deckCont, null, ps.opponentCont, ps.opponentCards, cardOpp);
        cardOpp.x = -handWidth/2 + i * handWidth/6 + ps.cardWidth/2;
        cardOpp.y = ps.cardHeigth * .7;
        interactivity(cardOpp, null);
      }
    });
  }
}

export const cardToPlayerAnimation = (card) => {
  let ease = 'easeOutSine';
  let dur = 500;

  let startAnim = 500;
  let handWidth = w * .4;

  formatHand(ps.playerCards);

  let cardFace = card;
  card = ps.deckCards.pop();

  anime({
    targets: card.position,
    x: ps.playerCont.x - ps.deckCont.x + handWidth/2 - ps.cardWidth/2,
    y: ps.playerCont.y - ps.deckCont.y - ps.cardHeigth * .7,
    duration: dur,
    easing: ease,
    delay: anime.stagger(0, { start: startAnim }),
    complete: () => {
      transferCard(ps.deckCont, null, ps.playerCont, ps.playerCards, card);

      card.x = handWidth/2 - ps.cardWidth/2;
      card.y = - ps.cardHeigth * .7;

      faceUpCard(card, cardFace, ps.playerCont, ps.playerCards, playerPointerDown);
      formatHand(ps.playerCards);
    }
  })
}

export const cardToOpponentAnimation = () => {
  let ease = 'easeOutSine';
  let dur = 500;

  let startAnim = 500;
  let handWidth = w * .4;

  formatHand(ps.opponentCards);

  let card = ps.deckCards.pop();

  anime({
    targets: card.position,
    x: ps.opponentCont.x - ps.deckCont.x + handWidth/2 - ps.cardWidth/2,
    y: ps.opponentCont.y - ps.deckCont.y + ps.cardHeigth * .7,
    duration: dur,
    easing: ease,
    delay: anime.stagger(0, { start: startAnim }),
    complete: () => {
      transferCard(ps.deckCont, null, ps.opponentCont, ps.opponentCards, card);
      card.x = handWidth/2 - ps.cardWidth/2;
      card.y = ps.cardHeigth * .7;
      interactivity(card, null);
      formatHand(ps.opponentCards)
    }
  })
}

export const playersCardsToPile = (cards) => {
  let ease = 'easeOutSine';
  let dur = 500;
  let startAnim = 500;

  for (let i = 0; i < cards.length; i++){
    let card = cards[i];
    transferCard(ps.playerCont, ps.playerCards, ps.pileCont, ps.pileCards, card);
    card.x += -ps.pileCont.x + ps.playerCont.x;
    card.y += -ps.pileCont.y + ps.playerCont.y;

    anime({
      targets: card.position,
      x: 0,
      y: 0,
      duration: dur,
      easing: ease,
      delay: anime.stagger(0, { start: startAnim }),
      complete: () => {
        transferCard(ps.playerCont, null, ps.pileCont, ps.pileCards, card);
        card.x = 0;
        card.y = 0;
        interactivity(card, pilePointerDown);
        formatHand(ps.playerCards)
      }
    })
  }
}

export const opponentsCardsToPile = (cards) => {
  let ease = 'easeOutSine';
  let dur = 500;
  let startAnim = 500;

  for (let i = 0; i < cards.length; i++){
    let card = ps.opponentCards.pop();
    transferCard(ps.opponentCont, null, ps.pileCont, ps.pileCards, card);
    card.x += ps.pileCont.x - ps.playerCont.x;
    card.y += ps.pileCont.y - ps.playerCont.y;

    anime({
      targets: card.position,
      x: 0,
      y: 0,
      duration: dur,
      easing: ease,
      delay: anime.stagger(0, { start: startAnim }),
      complete: () => {
        transferCard(ps.playerCont, null, ps.pileCont, ps.pileCards, card);
        card.x = 0;
        card.y = 0;

        faceUpCard(card, cards[i], ps.pileCont, ps.pileCards, pilePointerDown);
        formatHand(ps.opponentCards)
      }
    })
  }
}

const faceUpCard = (card, face, cardCont, cardArr, pointerFunc) => {
  face.width = ps.cardWidth;
  face.height = ps.cardHeigth;

  anime({
      targets: card,
      width: 0,
      duration: 100,
      easing: 'easeInQuad',

      complete: () => {
          cardCont.removeChild(card);
          removeCardFromArr(card, cardArr);

          cardCont.addChild(face);
          cardArr.push(face);

          let faceW = face.width;
          face.width = 0;
          face.x = card.x;
          face.y = card.y;
          face.anchor = card.anchor;
          face.angle = card.angle;

          anime({
              targets: face,
              width: faceW,
              duration: 100,
              easing: 'easeInQuad',

              complete: () => {
                  interactivity(face, pointerFunc);
              }
          });
      }
  })
}

export const interactivity = (card, func) => {
  card.removeAllListeners();
  card.width = ps.cardWidth;
  card.height = ps.cardHeigth;

  if (func == null) return;

  card.interactive = true//turn;
  card
      .on('pointerdown', () => {
          func(card);
      })
      .on('pointerover', () => {
          card.width = ps.cardWidth * 1.1;
          card.height = ps.cardHeigth * 1.1;
      })
      .on('pointerout', () => {
          card.width = ps.cardWidth;
          card.height = ps.cardHeigth;
      })
}

const transferCard = (fromCont, fromArr, toCont, toArr, card) => {
  removeCardFromArr(card, fromArr);
  fromCont.removeChild(card);
  toCont.addChild(card);
  toArr.push(card);
}

const removeCardFromArr = (card, arr) => {
  if (arr == null) return;
  let index = arr.indexOf(card);
  arr.splice(index, 1);
}


const formatHand = (cards) => {
  let ease = 'easeOutSine';
  let dur = 500;

  let startAnim = 500;
  let handWidth = w * .4;

  for (let i = 0; i < cards.length; i++){
    let playerCard = cards[i];
    anime({
      targets: playerCard.position,
      x: -handWidth/2 + i * handWidth/(cards.length) + ps.cardWidth/2,
      duration: dur,
      easing: ease,
      delay: anime.stagger(0, { start: startAnim }),
    })
  }
}
