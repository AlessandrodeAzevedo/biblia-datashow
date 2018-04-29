import { LouvorService } from './../louvor.service';
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'louvor-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @ViewChild('menuLateral') public menuLateral;
  @Input() menuLateralShow:boolean;
  @Output() atualizaTexto = new EventEmitter();

  texto:string;
  titulo:string;
  musicas:Array<any> = this.arr(this.louvorService.getMusicas());
  navigate:string = 'menu';
  id:number = null;

  constructor(private louvorService : LouvorService) { }

  controle(value){
    if(value == this.navigate){
      return true;
    }else{
      return false;
    }
  }

  editar(id,titulo,texto){
    this.id = id;
    this.titulo = titulo;
    this.texto = texto.replace(/<br>/g, '\n');
    this.navigate = 'musica';
  }
  salvar(){
    if(!this.titulo || !this.texto){
      return false;
    }
    this.louvorService.setMusicas(this.id,this.titulo,this.texto.replace(/(\r\n|\n\r|\r|\n)/g, '<br>'));
    this.navigate = 'menu';
    this.musicas = this.arr(this.louvorService.getMusicas());
    this.id = null;
    this.titulo = null;
    this.texto = null;
  }  
  voltar(){
    this.id = null;
    this.titulo = null;
    this.texto = null;
    this.navigate = 'menu';
  }  
  novaMusica(){
    this.navigate = 'musica';
  }

  carregaMusica(titulo,musica){
    this.louvorService.setAtivo(titulo,musica);
    this.atualizaTexto.emit(musica);
    this.atualizaTexto.emit('page');
  }

  mudaTexto(){
    //this.louvorService.setMusicas(this.texto);
    this.atualizaTexto.emit(this.texto.replace(/(\r\n|\n\r|\r|\n)/g, '<br>'));
  }
  arr(obj){
    return Object.keys(obj).map(function (key) { 
      obj[key]['id'] = key;
      return obj[key]; });
  }
  ngOnInit() {
    
  }

  fechaMenu(){
    if(this.navigate != 'menu'){
      this.navigate = 'menu';
    }else{
      this.menuLateral.hide();
    }
    this.id = null;
    this.titulo = null;
    this.texto = null;
    this.atualizaTexto.emit('page');
  }
  ngOnChanges() {
    if(this.menuLateralShow){
      this.menuLateral.show();
    }
  }
}
