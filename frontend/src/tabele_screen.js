let screen = null;

export const initTableScreen = () => {

    screen = document.createElement('div');
    screen.id = 'tableScreen';

    let div_gore = document.createElement('div');
    div_gore.id = 'tableNaslov';

    let div_dole = document.createElement('div');
    div_dole.id = 'tableTelo';

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

    screen.appendChild(div_gore);
    screen.appendChild(div_dole);

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
