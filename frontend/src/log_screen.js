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
  blur = document.createElement("div");
  blur.id = "blur";
  screen.appendChild(blur);

  registWin = document.createElement("div");
  registWin.id = "regist-win";
  screen.appendChild(registWin);

  let btnBack = document.createElement("div");
  btnBack.id = "regist-back";
  btnBack.innerHTML = "+";
  btnBack.onclick = () => {
    removeRegistWindow();
  };
  registWin.appendChild(btnBack);
};

const registUser = () => {
  title = document.createElement("div");
  title.id = "title";
  title.innerHTML = "Registracija";
  registWin.appendChild(title);

  form = document.createElement("div");
  form.id = "regist-form";
  form.innerHTML = `
      Username <br> <input type="text" name="Name"><br>
      `;
  registWin.appendChild(form);

  let msgBar = document.createElement("div");
  msgBar.id = "msg-bar";
  form.appendChild(msgBar);

  let btnRegist = document.createElement("button");
  btnRegist.id = "btn-regist";
  btnRegist.innerHTML = "Registruje Se";
  btnRegist.onclick = () => {
    registRequest().then((res) => {
      msgBar.innerHTML = "";
      console.log(res);
      if (res.status == 200) {
        removeRegistWindow();
      } else {
        msgBar.innerHTML = "Igrac je vec registrovan";
      }
    });
  };
  form.appendChild(btnRegist);
};

const registRequest = async () => {
  let name = getInputValue("Name", 1, 11);

  if (errorMsg !== "") {
    setErrorMsg("");
    throw new Error(errorMsg);
  }

  let url = "http://localhost:4004" + "/user/regist/";

  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      name: name,
    },
  });

  return response;
};

const removeRegistWindow = () => {
  screen.removeChild(blur);
  screen.removeChild(registWin);
};

export const setRegistWindow = () => {
  blur = document.createElement("div");
  blur.id = "blur";
  screen.appendChild(blur);

  registWin = document.createElement("div");
  registWin.id = "regist-win";
  screen.appendChild(registWin);

  let btnBack = document.createElement("div");
  btnBack.id = "regist-back";
  btnBack.innerHTML = "+";
  btnBack.onclick = () => {
    removeRegistWindow();
  };
  registWin.appendChild(btnBack);

  registUser();
};

const logUser = () => {
  title = document.createElement("div");
  title.id = "title";
  title.innerHTML = "Logovanje";
  registWin.appendChild(title);

  form = document.createElement("div");
  form.id = "regist-form";
  form.innerHTML = `
      Username <br> <input type="text" name="Name"><br>
      `;
  registWin.appendChild(form);

  let msgBar = document.createElement("div");
  msgBar.id = "msg-bar";
  form.appendChild(msgBar);

  let btnRegist = document.createElement("button");
  btnRegist.id = "btn-regist";
  btnRegist.innerHTML = "Uloguj Se";
  btnRegist.onclick = () => {
    logRequest().then((res) => {
      msgBar.innerHTML = "";
      console.log(res);
      if (res.status == 200) {
        removeLogWindow();
        setIsLoged(true);
      } else {
        msgBar.innerHTML = "Igrac nije registrovan";
        setPlayer1Name("Player1");
      }
    });
  };
  form.appendChild(btnRegist);
};

const logRequest = async () => {
  let name = getInputValue("Name", 1, 11);

  if (errorMsg !== "") {
    setErrorMsg("");
    throw new Error(errorMsg);
  }

  let url = "http://localhost:4004" + "/user/log";

  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      name: name,
    },
  });

  setPlayer1Name(name);

  return response;
};

const removeLogWindow = () => {
  screen.removeChild(blur);
  screen.removeChild(registWin);
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