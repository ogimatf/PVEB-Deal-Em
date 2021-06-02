import * as home_screen from "./home_screen.js";

let screen = null;

let scoreBoard = null;
let scoreTable = null;

export const initTableScreen = () => {
  screen = document.createElement("div");
  screen.id = "tableScreen";

  let divNaslov = document.createElement("div");
  divNaslov.id = "tableNaslov";

  let divTelo = document.createElement("div");
  divTelo.id = "tableTelo";

  let tabelaIstorija = document.createElement("div");
  tabelaIstorija.id = "tabelaIstorija";

  let naslovIstorija = document.createElement("div");
  naslovIstorija.id = "naslovIstorija";

  let buttonBack = document.createElement("div");
  buttonBack.id = "btnTabBack";
  buttonBack.onclick = () => {
    document.body.removeChild(screen);
    home_screen.postHomeScreen();
  };

  screen.appendChild(buttonBack);

  screen.appendChild(divNaslov);
  screen.appendChild(divTelo);

  divTelo.appendChild(tabelaIstorija);

  tabelaIstorija.appendChild(naslovIstorija);

  scoreBoard = document.createElement("div");
  scoreBoard.id = "table-board";
  tabelaIstorija.appendChild(scoreBoard);

  scoreTable = document.createElement("table");
  scoreTable.id = "score-table";
  scoreBoard.appendChild(scoreTable);
};

export const postTableScreen = () => {
  document.body.appendChild(screen);
};

export const deleteTableScreen = () => {
  document.body.removeChild(log);
};

export const getUsers = () => {
  getUsersRequest().then((res) => {
    res.json().then((data) => {
      let users = data.result;

      let table =
        "<tr><th> Ime </th><th> Pobede </th> " +
        "<th> Porazi </th> <th> Poeni </th> " +
        "</tr> ";

      for (let user of users) {
        table += "<tr><td>" + user.name + "</td><td>" + user.winNum;
        table += "</td><td>" + user.loseNum;
        table += "</td><td>" + user.points + "</td></tr>";
      }
      scoreTable.innerHTML = table;
    });
  });
};

const getUsersRequest = async () => {
  let url = "http://localhost:4004" + "/user/all";

  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};