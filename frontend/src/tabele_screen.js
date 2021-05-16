import * as home_screen from './home_screen.js';

let screen = null;

export const initTableScreen = () => {

    screen = document.createElement('div');
    screen.id = 'tableScreen';

    let divNaslov = document.createElement('div');
    divNaslov.id = 'tableNaslov';

    let divTelo = document.createElement('div');
    divTelo.id = 'tableTelo';

    let tabelaNedelja = document.createElement('div');
    tabelaNedelja.id = 'tabelaNedelja';

    let tabelaMesec = document.createElement('div');
    tabelaMesec.id = 'tabelaMesec';

    let tabelaIstorija = document.createElement('div');
    tabelaIstorija.id = 'tabelaIstorija';

    let naslovNedelja = document.createElement('div');
    naslovNedelja.id = 'naslovNedelja';

    let naslovMesec =  document.createElement('div');
    naslovMesec.id = 'naslovMesec';

    let naslovIstorija = document.createElement('div');
    naslovIstorija.id = 'naslovIstorija';

    let buttonBack = document.createElement('div');
    buttonBack.id = 'btnTabBack';
    buttonBack.onclick = () => {
        document.body.removeChild(screen);
        home_screen.postHomeScreen();
    }

    screen.appendChild(buttonBack);

    screen.appendChild(divNaslov);
    screen.appendChild(divTelo);

    divTelo.appendChild(tabelaNedelja);
    divTelo.appendChild(tabelaMesec);
    divTelo.appendChild(tabelaIstorija);

    tabelaNedelja.appendChild(naslovNedelja);
    tabelaMesec.appendChild(naslovMesec);
    tabelaIstorija.appendChild(naslovIstorija);
}


export const postTableScreen = () => {
    document.body.appendChild(screen);
}

export const deleteTableScreen = () => {
    document.body.removeChild(log);
}
