const { remote } = require('electron');
const path = require('path');
const Mousetrap = require('mousetrap');

const mainWindow = remote.BrowserWindow.getFocusedWindow();

let fechar = document.getElementById('fechar');
fechar.addEventListener('click', function (e) {
    e.preventDefault();
    mainWindow.close();
    mainWindow.hide();
    app.isQuiting = true;
    app.quit();
});

let minimizar = document.getElementById('minimizar');
minimizar.addEventListener('click', function(e) {
    e.preventDefault();
    mainWindow.minimize();
});


Mousetrap.bind('up up down down left right s', function () {
    let result = confirm('Você realmente quer apagar todos os dados?');
      if(result){
        localStorage.clear();       
      }
});


document.addEventListener('keydown', function(ev) {
    if(ev.code == 'F11' || ev.key == 'F11' || ev.keyCode == 122){
        return false;
   //     fullscreen.innerHTML = !mainWindow.isFullScreen() ? `<i class="fa fa-window-minimize"></i>` : `<i class="fa fa-window-maximize"></i>`;
    }
    if(ev.code == 'F5' || ev.key == 'CommandOrControl+R'){
       // reload();
        return false;
    }
});