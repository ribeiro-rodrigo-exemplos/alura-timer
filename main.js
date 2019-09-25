const { app, BrowserWindow, ipcMain } = require('electron');

app.on('ready', () => {
    console.log('Aplicação iniciada');
    let mainWindow = new BrowserWindow({
        width: 600,
        height: 400
    });

    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

app.on('window-all-closed', () => {
    app.quit();
})

let sobreWindow = null 

ipcMain.on('abrir-janela-sobre', () => {
    if(!sobreWindow){
        sobreWindow = new BrowserWindow({
            width: 300,
            height: 200
        })

        sobreWindow.on('closed',() => {
            sobreWindow = null 
        })
    }

    sobreWindow.loadURL(`file://${__dirname}/app/sobre.html`)
})