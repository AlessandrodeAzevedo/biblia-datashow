const { remote } = require('electron');

/* var request = require('request');
var fs = require('fs'); */

const mainWindow = remote.BrowserWindow.getFocusedWindow();

/* let fechar = document.getElementById('fechar');
fechar.addEventListener('click', function (e) {
    e.preventDefault();
    mainWindow.close();
}); */

let fullscreen = document.getElementById('fullscreen');
fullscreen.addEventListener('click', function (e) {
    e.preventDefault();
    fullscreen.innerHTML = !mainWindow.isFullScreen() ? `<i class="fa fa-window-minimize"></i>` : `<i class="fa fa-window-maximize"></i>`;
    mainWindow.setFullScreen(!mainWindow.isFullScreen());
});

document.addEventListener('keydown', function(ev) {
    if(ev.code == 'F11' || ev.key == 'F11' || ev.keyCode == 122){
        fullscreen.innerHTML = !mainWindow.isFullScreen() ? `<i class="fa fa-window-minimize"></i>` : `<i class="fa fa-window-maximize"></i>`;
    }
    if(ev.code == 'F5' || ev.key == 'CommandOrControl+R'){
       // reload();
        return false;
    }
});

//request('http://nodejs.org/images/logo.png').pipe(fs.createWriteStream('node.png'))



var reload = ()=>{
    let file = url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file',
        slashes: true
    });

    mainWindow.loadURL(file);    
}


