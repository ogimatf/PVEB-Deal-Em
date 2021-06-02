export let hand = [];
export let pile = [];
export let player1Name = "Player1";
export let player2Name = "Player2";
export let isLoged = false;

export const setHand = (value) => {
  hand = value;
};

export const setPile = (value) => {
  pile = value;
};

export const setPlayer1Name = (value) => {
  player1Name = value || player1Name;
};

export const setPlayer2Name = (value) => {
  player2Name = value || player2Name;
};

export const addToHand = (card) => {
  hand.push(card);
};

export const setIsLoged = (value) => {
  isLoged = value;
};
