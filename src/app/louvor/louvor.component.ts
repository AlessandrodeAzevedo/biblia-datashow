import { LouvorService } from './louvor.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-louvor',
  templateUrl: './louvor.component.html',
  styleUrls: ['./louvor.component.scss']
})
export class LouvorComponent implements OnInit {
  
//  let dialog = require('electron').remote;
mostraMenuLateral:boolean = false;
nome:string = "nome";
texto:string;
fontSize:number = this.louvorService.getFont();
lineHeight:number = this.louvorService.getLineHeight();
pagina:number = 0;
musica:string;

showMenuLateral(){
  if(this.mostraMenuLateral){
    this.mostraMenuLateral = false;     
  }else{
    this.mostraMenuLateral = true;
  }
}
charge(value){
  if(value == 'page'){
    this.pagina = 0;
    this.mostraMenuLateral = false;
  }
  if(value != 'no' && value != 'page'){
    this.musica = value;
    this.mostraMenuLateral = false;    
  }
  if((this.musica).indexOf("<br><br><br>") != -1){
    let maxPagina = this.musica.split("<br><br><br>").length-1;
    if(this.pagina > maxPagina){
      this.pagina = 0;
    }
  }else{
    this.pagina = 0;
  }
  let trecho = this.musica.split("<br><br><br>");
  this.texto = trecho[this.pagina];
  //this.mostraMenuLateral = false;
}

constructor(private louvorService:LouvorService ) { }

  ngOnInit() {
    if(this.louvorService.getAtivo()){
      this.musica = this.louvorService.getAtivo()["musica"];
    }
    this.charge('no');
    /* var file = new File(["Hello, world!"], "hello world.txt", {type: "text/plain;charset=utf-8"});
    saveAs(file); */
    //this.playPingPong();
  }

  public playPingPong() {
    /* if(this.electronService.isElectronApp) {
        let pong: string = this.electronService.ipcRenderer.sendSync('ping');
        console.log(pong);
    } */
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if(event.key == 'ArrowRight'){
      let maxPagina = this.musica.split("<br><br><br>").length-1;
      if(this.pagina < maxPagina){
        this.pagina += 1;
        this.charge('no');
      }      
    }
    if(event.key == 'ArrowLeft'){
      if(this.pagina != 0){
        this.pagina -= 1;
        this.charge('no');
      }      
    }
    if(event.key == 'ArrowUp' && event.ctrlKey && !event.shiftKey){
      if(this.fontSize < 500){
        this.fontSize += 0.05;     
        this.louvorService.setFont(this.fontSize);
      }      
    }
    if(event.key == 'ArrowDown' && event.ctrlKey && !event.shiftKey){
      if(this.fontSize > 0){
        this.fontSize -= 0.05;        
        this.louvorService.setFont(this.fontSize);
      }      
    }
    if(event.key == 'ArrowUp' && event.ctrlKey && event.shiftKey){
      if(this.lineHeight < 500){
        this.lineHeight += 0.05;
        this.louvorService.setLineHeight(this.lineHeight);
      }      
    }
    if(event.key == 'ArrowDown' && event.ctrlKey && event.shiftKey){
      if(this.lineHeight > 0){
        this.lineHeight -= 0.05;
        this.louvorService.setLineHeight(this.lineHeight);
      }      
    }
    if(event.key == 'Escape'){
      this.mostraMenuLateral = false;
    }
  }
}