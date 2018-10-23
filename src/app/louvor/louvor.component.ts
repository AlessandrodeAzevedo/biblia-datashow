import { LouvorService } from './louvor.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';
import { AnimationBuilder } from 'css-animator';

let animator = new AnimationBuilder();
@Component({
  selector: 'app-louvor',
  templateUrl: './louvor.component.html',
  styleUrls: ['./louvor.component.scss']
})
export class LouvorComponent implements OnInit {
  
mostraMenuLateral:boolean = false;
mostraAtalho:boolean = false;
mostraMenuLateralEnter:boolean = false;
logo:string = this.louvorService.getLogo();
nome:string = "nome";
texto:string;
fontSize:number = this.louvorService.getFont();
lineHeight:number = this.louvorService.getLineHeight();
pagina:number = 0;
musica:string;

showMenuLateral(enter = false){
  if(enter){
    this.mostraMenuLateralEnter = true;
  }else{
    this.mostraMenuLateralEnter = false;
  }
  if(this.mostraMenuLateral){
    this.mostraMenuLateral = false;     
  }else{
    this.mostraMenuLateral = true;
  }
}

caretPos:number = 0;
inputPosition(value){
  this.caretPos = value;
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
    if(this.caretPos){
      let musPos = this.musica.replace(/(<br>)/g, '#');
      let pos = musPos.substr(0, this.caretPos);
      this.pagina = pos.split("###").length-1;
    }
  }else{
    this.pagina = 0;
  }
  let trecho = this.musica.split("<br><br><br>");
  this.texto = trecho[this.pagina];
}

constructor(private elementRef: ElementRef,private louvorService:LouvorService ) { }

ngOnInit() {
  animator.setDuration(500).setType('bounceInLeft').show(this.elementRef.nativeElement);
  if(this.louvorService.getAtivo()){
    this.musica = this.louvorService.getAtivo()["musica"];
  }
  this.charge('no');    
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
    if(event.key == 'Enter'){
      this.showMenuLateral(true);
      return false;
    }
    if(event.key == 'Escape'){
      this.mostraMenuLateral = false;
    }
  }
}
