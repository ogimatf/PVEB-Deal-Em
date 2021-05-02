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

    screen.appendChild(buttonLogovanje);
    screen.appendChild(buttonRegist);
}


export const postLogScreen = () => {
    document.body.appendChild(screen);
}

export const deleteLogScreen = () => {
    document.body.removeChild(log);
}
