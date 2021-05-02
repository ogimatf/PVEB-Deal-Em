let screen = null;

export const initTableScreen = () => {

    screen = document.createElement('div');
    screen.id = 'tableScreen';

    let divNaslov = document.createElement('div');
    divNaslov.id = 'tableNaslov';

    let divTelo = document.createElement('div');
    divTelo.id = 'tableTelo';

    let tabelaNedelja = div_gore = document.createElement('div');
    tabelaNedelja.id = 'tabelaNedelja';

    let tabelaMesec = div_gore = document.createElement('div');
    tabelaMesec.id = 'tabelaMesec';

    let tabelaIstorija = div_gore = document.createElement('div');
    tabelaIstorija.id = 'tabelaIstorija';

    let naslovNedelja = div_gore = document.createElement('div');
    naslovNedelja.id = 'naslovNedelja';

    let naslovMesec = div_gore = document.createElement('div');
    naslovMesec.id = 'naslovMesec';

    let naslovIstorija = div_gore = document.createElement('div');
    naslovIstorija.id = 'naslovIstorija';

    screen.appendChild(divNaslov);
    screen.appendChild(divTelo);

    div_dole.appendChild(tabelaNedelja);
    div_dole.appendChild(tabelaMesec);
    div_dole.appendChild(tabelaIstorija);

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
