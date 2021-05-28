import { player1Name, player2Name } from "./game_state.js";
import { postHomeScreen } from "./home_screen.js";
import { deletePlayingScreen } from "./scene.js";

let endScreen = null;
let scoreBoard = null;
let scoreTable = null;
let btnBack = null;

export const showEndScreen = () => {
  addChildrenEndScreen();
}

export const initEndScreen = (data) => {
  endScreen = document.createElement('div');
  endScreen.id = 'end-screen';

  scoreBoard = document.createElement('div');
  scoreBoard.id = 'score-board';
  endScreen.appendChild(scoreBoard);

  scoreTable = document.createElement('table');
  scoreTable.id = 'score-table';
  scoreTable.innerHTML = writeScore(data);
  scoreBoard.appendChild(scoreTable);

  btnBack = document.createElement('button');
  btnBack.id = 'btn-back';
  btnBack.innerHTML = 'Back To Home';
  btnBack.onclick = btnBackAction;
  scoreBoard.appendChild(btnBack);
}

export const removeScoreBoard = () => {
  if (document.getElementById('score-board')) {
    document.body.removeChild(endScreen);
  }
}

const addChildrenEndScreen = () => {
  document.body.appendChild(endScreen);
}

const writeScore = (data) => {
  const player = data.player;
  const opponent = data.opponent;

  console.log(data)

  let table = '<tr>'
    + '<th> ' + player1Name + ' </th> <th> </th> <th> ' + player2Name + ' </th> '
    + '</tr> <tr>'
    + '<td>' + player + '</td> <td> Result </td> <td>' + opponent + '</td>'
    + '</tr>';

  table += '<h2>' + data.msg + '</h2>'

  return table;
}

const btnBackAction = () => {
  removeScoreBoard();
  deletePlayingScreen();
  postHomeScreen();
}
