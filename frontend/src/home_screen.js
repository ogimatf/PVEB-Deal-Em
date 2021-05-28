import * as log_screen from './log_screen.js';
import * as tabele_screen from './tabele_screen.js';
import * as play_screen from './scene.js';
import { socket } from './socket_conn.js';

let screen = null;

export const initHomeScreen = () => {

    screen = document.createElement('div');
    screen.id = 'homeScreen';

    let buttonIgraj = document.createElement('div');
    buttonIgraj.id = 'btnIgraj';
    buttonIgraj.onclick = () => {
        waitOpponentWindow();

        socket.emit('enterToLobby', 'want game');
    }

    let buttonUlog = document.createElement('div');
    buttonUlog.id = 'btnUlog';
    buttonUlog.onclick = () => {
        document.body.removeChild(screen);
        log_screen.postLogScreen();
    }

    let buttonOpcije = document.createElement('div');
    buttonOpcije.id = 'btnOpcije';
    buttonOpcije.onclick = () => {
        //TODO
    }

    let buttonTabele = document.createElement('div');
    buttonTabele.id = 'btnTabele';
    buttonTabele.onclick = () => {
        document.body.removeChild(screen);
        tabele_screen.postTableScreen();
    }

    screen.appendChild(buttonIgraj);
    screen.appendChild(buttonUlog);
    screen.appendChild(buttonTabele);
    screen.appendChild(buttonOpcije);

}

export const setNameWindow = () => {

}

export const postHomeScreen = () => {
    document.body.appendChild(screen);
}

export const deleteHomeScreen = () => {
    document.body.removeChild(screen);
}

const waitOpponentWindow = () => {
    let windowMsg = 'Looking for opponent..';
    let socketMsg = 'randGameRequest';

    const blur = document.createElement('div');
    blur.id = 'blur';
    screen.appendChild(blur);

    const window = document.createElement('div');
    window.id = 'wait-win';
    window.innerText = windowMsg;
    screen.appendChild(window);

    const btnBack = document.createElement('button');
    btnBack.id = 'btn-back';
    btnBack.innerHTML = 'Cancel';
    btnBack.onclick = () => {
        removeWindow()
        socket.emit('cancel', socketMsg)
    }
    window.appendChild(btnBack);
}

export const removeWindow = () => {
    const blur = document.getElementById('blur');
    const win = document.getElementById('wait-win');

    if (blur != null && win != null) {
        screen.removeChild(win);
        screen.removeChild(blur);
    }
}
