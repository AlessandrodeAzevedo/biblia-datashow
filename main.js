const { app, BrowserWindow }  = require('electron');
//const { autoUpdater } = require('electron-updater');
const url = require('url');
const path = require('path');

app.setAppUserModelId('com.biblia-datashow.app');

let mainWindow;

function createWindow () {
    mainWindow = new BrowserWindow({ 
        width: 800, 
        height: 600,
        fullscreen:true
    });

    let file = url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file',
        slashes: true
    });

    mainWindow.removeMenu();
    
    mainWindow.loadURL(file);
    //mainWindow.loadURL('http://localhost:4200');

    mainWindow.on('close', function(e) {
        if (!app.isQuiting) {
            e.preventDefault();
            mainWindow.hide();
            app.isQuiting = true;
            app.quit();
        }
    });
}
app.on('ready', function () {
    //autoUpdater.checkForUpdatesAndNotify();
    createWindow();
});