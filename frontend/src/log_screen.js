import * as home_screen from './home_screen.js';

let screen = null;

export const initLogScreen = () => {

    screen = document.createElement('div');
    screen.id = 'logScreen';

    let buttonLogovanje = document.createElement('div');
    buttonLogovanje.id = 'btnLogovanje';
    buttonLogovanje.onclick = () => {
        //TODO
    }

    let buttonRegist = document.createElement('div');
    buttonRegist.id = 'btnRegist';
    buttonRegist.onclick = () => {
        //TODO
    }

    let buttonBack = document.createElement('div');
    buttonBack.id = 'btnLogBack';
    buttonBack.onclick = () => {
        document.body.removeChild(screen);
        home_screen.postHomeScreen();
    }

    screen.appendChild(buttonBack);
    screen.appendChild(buttonLogovanje);
    screen.appendChild(buttonRegist);
}


export const postLogScreen = () => {
    document.body.appendChild(screen);
}

export const deleteLogScreen = () => {
    document.body.removeChild(log);
}
