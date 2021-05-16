import * as log_screen from './log_screen.js';
import * as tabele_screen from './tabele_screen.js';
import * as play_screen from './scene.js';

let screen = null;

export const initHomeScreen = () => {

    screen = document.createElement('div');
    screen.id = 'homeScreen';

    let buttonIgraj = document.createElement('div');
    buttonIgraj.id = 'btnIgraj';
    buttonIgraj.onclick = () => {
        document.body.removeChild(screen);
        play_screen.postPlayingScreen();
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
    document.body.removeChild(home);
}
