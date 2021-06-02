import { setIsLoged, setPlayer1Name } from "./game_state.js";
import * as home_screen from "./home_screen.js";

let screen = null;

let blur;
let registWin;
let title;
let form;

export const initLogScreen = () => {
  screen = document.createElement("div");
  screen.id = "logScreen";

  let buttonLogovanje = document.createElement("div");
  buttonLogovanje.id = "btnLogovanje";
  buttonLogovanje.onclick = () => {
    setWindow();
    logUser();
  };

  let buttonRegist = document.createElement("div");
  buttonRegist.id = "btnRegist";
  buttonRegist.onclick = () => {
    setWindow();
    registUser();
  };

  let buttonBack = document.createElement("div");
  buttonBack.id = "btnLogBack";
  buttonBack.onclick = () => {
    document.body.removeChild(screen);
    home_screen.postHomeScreen();
  };

  screen.appendChild(buttonBack);
  screen.appendChild(buttonLogovanje);
  screen.appendChild(buttonRegist);
};

export const postRegistScreen = () => {
  document.body.appendChild(screen);
};

export const deleteRegistScreen = () => {
  document.body.removeChild(regist);
};

export const setWindow = () => {
//TODO
};

const registUser = () => {
//TODO
};

const registRequest = async () => {
//TODO
};

const removeRegistWindow = () => {
//TODO
};

export const setRegistWindow = () => {
//TODO
};

const logUser = () => {
//TODO
};

const logRequest = async () => {
//TODO
};

const removeLogWindow = () => {
//TODO
};

export let errorMsg = "";

export const setErrorMsg = (msg) => {
  errorMsg = msg;
};

export const writeErrorMsg = () => {
  let msgBar = document.getElementById("msg-bar");
  msgBar.innerHTML = errorMsg;
};

export const getInputValue = (elementName, minlength, maxlength) => {
  let value = document.getElementsByName(elementName)[0].value;
  let element = document.getElementsByName(elementName)[0];

  if (minlength && value == "") {
    errorMsg += elementName + " is required.<br>";
    element.style.borderColor = "red";
    writeErrorMsg();
  } else if (minlength && value.length < minlength) {
    errorMsg +=
      elementName + " should contains " + minlength + " or more characters<br>";
    element.style.borderColor = "red";
    writeErrorMsg();
  } else if (maxlength && value.length > maxlength) {
    errorMsg +=
      elementName +
      " should not contains more then<br>" +
      maxlength +
      " characters<br>";
    element.style.borderColor = "red";
    writeErrorMsg();
  } else if (value != "") {
    element.style.borderColor = "#EBE9ED";
    return value;
  }

  return null;
};