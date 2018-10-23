import { MensagemService } from './mensagem.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';
import { AnimationBuilder } from 'css-animator';

let animator = new AnimationBuilder();
@Component({
  selector: 'mensagem',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.scss']
})
export class MensagemComponent implements OnInit {

  constructor(private elementRef: ElementRef,private mensagemService: MensagemService) {}
  
  logo:string = this.mensagemService.getLogo();
  titulo:string = this.mensagemService.getTitulo();
  tituloFont:number = this.mensagemService.getTituloFont();
  texto:string = this.mensagemService.getTexto();
  textoFont:number = this.mensagemService.getTextoFont();
  margem:number = this.mensagemService.getMargem();
  historics:Array<any> = this.mensagemService.getHistorics();
  saves:Array<any> = this.mensagemService.getSaves();
  mostraMenu:boolean = false;
  mostraAtalho:boolean = false;
  
  ngOnInit() {
    animator.setDuration(500).setType('bounceInLeft').show(this.elementRef.nativeElement);
  }

  charge(){
    this.mostraMenu = false;
    this.texto = this.mensagemService.getTexto();
    this.titulo = this.mensagemService.getTitulo();
  }

  showMenu(){
    this.mostraMenu = true;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(!event.ctrlKey){
      if(event.key == 'ArrowUp'){
        this.mensagemService.setTextoFont((+this.textoFont+0.05));
        this.textoFont = this.mensagemService.getTextoFont();      
        console.log(isNaN(this.textoFont));
        if(isNaN(this.textoFont)){
          this.mensagemService.setTextoFont(1);
          this.textoFont = this.mensagemService.getTextoFont();
        }
      }
      if(event.key == 'ArrowDown'){
        this.mensagemService.setTextoFont((+this.textoFont-0.05));
        this.textoFont = this.mensagemService.getTextoFont();
        console.log(isNaN(this.textoFont));
        if(isNaN(this.textoFont)){
          this.mensagemService.setTextoFont(1);
          this.textoFont = this.mensagemService.getTextoFont();
        }
        console.log(this.textoFont);
      }
    }
    if(event.ctrlKey){
      if(event.key == 'ArrowUp'){
        this.mensagemService.setMargem((+this.margem+0.02));
        this.margem = this.mensagemService.getMargem();        
      }
      if(event.key == 'ArrowDown'){
        this.mensagemService.setMargem((+this.margem-0.02));
        this.margem = this.mensagemService.getMargem();
        console.log(this.margem);
      }
    }
    if(event.key == 'ArrowRight'){}
    if(event.key == 'ArrowLeft'){}
    if(event.key == 'Escape'){
      this.mostraMenu = false;
    }
    if(event.key == 'Enter'){
      this.mostraAtalho =  true;
    }
  }
}
