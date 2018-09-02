const { app, BrowserWindow, Tray, Menu, globalShortcut, dialog }  = require('electron');
const { autoUpdater } = require('electron-updater');
const url = require('url');
const path = require('path');

app.setAppUserModelId('com.biblia-datashow.app');

let mainWindow;

function createWindow () {
    mainWindow = new BrowserWindow({ width: 800, height: 600});

    let file = url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file',
        slashes: true
    });

    mainWindow.loadURL(file);

    /* mainWindow.on('maximize', () => console.log('maximizado'));
    mainWindow.on('unmaximize', () => console.log('restaurando do maximizado'));
    mainWindow.on('minimize', () => console.log('minimizado'));
    mainWindow.on('restore', () => console.log('restaurado'));
    mainWindow.on('close', () => console.log('fechando'));
    mainWindow.on('resize', () => console.log('tamanho alterado')); */

    let contextMenu = Menu.buildFromTemplate([
        {
            label: 'Mostrar aplicativo', click: function () {
                mainWindow.show();
            }
        },
        {
            label: 'Sair', click: function () {
                app.isQuiting = true;
                app.quit();
            }
        }
    ]);

    /* let tray = new Tray(path.join(__dirname, 'tray.png'));
    tray.setContextMenu(contextMenu);
 */
    mainWindow.on('minimize', function(e) {
        e.preventDefault();
        mainWindow.hide();
    });

    mainWindow.on('close', function(e) {
        if (!app.isQuiting) {
            e.preventDefault();
            mainWindow.hide();
        }
    });

    /* tray.on('click', function() {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    });

    mainWindow.on('show', function () {
        tray.setHighlightMode('always');
    }); */

    /* globalShortcut.register('CommandOrControl+X', function () {
        console.log('Quem disse que você pode recortar isso?')
    })

    globalShortcut.register('Alt+A', function () {
        console.log('Alt+A foi precionado')
    }) */
}

function sendStatusToWindow(text) {
    const dialogOpts = {
        type: 'info',
        buttons: ['Ok'],
        title: 'Atualização do aplicativo',
        message: 'Detalhes:',
        detail: text
    }

    dialog.showMessageBox(dialogOpts)
}

autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...');
})

autoUpdater.on('update-available', (info) => {
    sendStatusToWindow('Update available.');
})

autoUpdater.on('update-not-available', (info) => {
    sendStatusToWindow('Update not available.');
})

autoUpdater.on('error', (err) => {
    sendStatusToWindow('Error in auto-updater. ' + err);
})

autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    sendStatusToWindow(log_message);
})

autoUpdater.on('update-downloaded', (info) => {
    sendStatusToWindow('Update downloaded');
});

app.on('ready', function () {
    autoUpdater.checkForUpdatesAndNotify();
    createWindow();
});