let screen = null;
let nameWindow = null;

export const initHomeScreen = () => {

    screen = document.createElement('div');
    screen.id = 'homeScreen';

    let buttonStart = document.createElement('div');
    buttonStart.id = 'btnStart';
    buttonStart.onclick = () => {
        //TODO
    }

    let buttonExit = document.createElement('div');
    buttonExit.id = 'btnExit';
    buttonExit.onclick = () => {
        //TODO
    }

    screen.appendChild(buttonStart);
    screen.appendChild(buttonExit);

}

export const setNameWindow = () => {



}

export const postHomeScreen = () => {

    document.body.appendChild(screen);

}

export const deleteHomeScreen = () => {

    document.body.removeChild(home);

}
