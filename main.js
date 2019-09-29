const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const data = require('./data')
const templateGenerator = require('./template')

let tray = null;
let mainWindow = null;

app.on('ready', () => {
    console.log('Aplicação iniciada');
    mainWindow = new BrowserWindow({
        width: 600,
        height: 400
    });

    tray = new Tray(__dirname + '/app/img/icon-tray.png')
    let template = templateGenerator.geraTrayTemplate(mainWindow);
    let trayMenu = Menu.buildFromTemplate(template)

    tray.setContextMenu(trayMenu);

    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

app.on('window-all-closed', () => {
    app.quit();
})

let sobreWindow = null

ipcMain.on('abrir-janela-sobre', () => {
    if (!sobreWindow) {
        sobreWindow = new BrowserWindow({
            width: 300,
            height: 220,
            alwaysOnTop: true, // no linux nao esta funcionando, so funciona com o metodo setAlwaysOnTop
            frame: false
        })

        sobreWindow.on('closed', () => {
            sobreWindow = null
        })

        sobreWindow.setAlwaysOnTop(true);
    }

    sobreWindow.loadURL(`file://${__dirname}/app/sobre.html`)
})

ipcMain.on('fechar-janela-sobre', () => sobreWindow.close())

ipcMain.on('curso-parado', (event, curso, tempoEstudado) => {
    console.log(`O curso ${curso} foi estudado por ${tempoEstudado}`)
    data.salvaDados(curso, tempoEstudado);
});

ipcMain.on('curso-adicionado', (event, novoCurso) => {
    let novoTemplate = templateGenerator.adicionaCursoNoTray(novoCurso, mainWindow);
    let trayMenu = Menu.buildFromTemplate(novoTemplate);
    tray.setContextMenu(trayMenu);
})