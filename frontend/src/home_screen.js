let screen = null;
let nameWindow = null;

export const initHomeScreen = () => {

    screen = document.createElement('div');
    screen.id = 'homeScreen';

    let buttonIgraj = document.createElement('div');
    buttonIgraj.id = 'btnIgraj';
    buttonIgraj.onclick = () => {
        //TODO
    }

    let buttonUlog = document.createElement('div');
    buttonUlog.id = 'btnUlog';
    buttonUlog.onclick = () => {
        //TODO
    }

    let buttonOpcije = document.createElement('div');
    buttonOpcije.id = 'btnOpcije';
    buttonOpcije.onclick = () => {
        //TODO
    }

    let buttonTabele = document.createElement('div');
    buttonTabele.id = 'btnTabele';
    buttonTabele.onclick = () => {
        //TODO
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
