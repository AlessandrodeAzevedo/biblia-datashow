import { MensagemService } from './mensagem.service';
import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'mensagem',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.scss']
})
export class MensagemComponent implements OnInit {

  constructor(private mensagemService: MensagemService) {  }
  
  titulo:string = this.mensagemService.getTitulo();
  tituloFont:number = this.mensagemService.getTituloFont();
  texto:string = this.mensagemService.getTexto();
  textoFont:number = this.mensagemService.getTextoFont();
  margem:number = this.mensagemService.getMargem();
  historics:Array<any> = this.mensagemService.getHistorics();
  saves:Array<any> = this.mensagemService.getSaves();
  mostraMenu:boolean = false;
  
  ngOnInit() { }

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
      }
      if(event.key == 'ArrowDown'){
        this.mensagemService.setTextoFont((+this.textoFont-0.05));
        this.textoFont = this.mensagemService.getTextoFont();
      }
    }
    if(event.ctrlKey){
      if(event.key == 'ArrowUp'){
        console.log(this.margem);
        this.mensagemService.setMargem((+this.margem+0.02));
        this.margem = this.mensagemService.getMargem();      
      }
      if(event.key == 'ArrowDown'){
        console.log(this.margem);
        this.mensagemService.setMargem((+this.margem-0.02));
        this.margem = this.mensagemService.getMargem();
      }
    }
    if(event.key == 'ArrowRight'){}
    if(event.key == 'ArrowLeft'){}
  }
}