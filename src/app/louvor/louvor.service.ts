import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class LouvorService {

  louvor:JSON;
  musicas:Array<any>;
  configuracoes:Array<any>;
  tema:string;
  fonte:number;
  sizes:Array<any>;
  autoincrement:string;
  ativo:string;
  lineHeight:number;
  
  constructor() { 
    localStorage.louvor = localStorage.louvor || JSON.stringify(require('../../assets/JSON/louvor.json'));
    
    this.louvor =  JSON.parse(localStorage.louvor);
    this.fonte = this.louvor['louvor']['ativo']['fonte'];
    this.musicas = this.louvor['louvor']['musicas'];
    this.autoincrement = this.louvor['louvor']['autoincrement'];
    this.ativo = this.louvor['louvor']['ativo']['musica'];
    this.lineHeight = this.louvor['louvor']['ativo']['lineheight'];
  }
  atualizaStorage(){
    localStorage.louvor = JSON.stringify(this.louvor);
  }
  getAtivo(){
    return this.ativo;
  }
  getMusicas(){
    return this.musicas;
  }
  getMusica(id){
    return this.musicas[id];
  }
  getFont(){
    return this.fonte;    
  }
  getLineHeight(){
    return this.lineHeight;
  }

  setAtivo(titulo:string,musica:string){
    this.louvor['louvor']['ativo']['musica'] = {"titulo":titulo,"musica":musica};
    this.ativo = this.louvor['louvor']['ativo']['musica'];
    this.atualizaStorage();
  }
  setLineHeight(tamanho){
    this.louvor['louvor']['ativo']['lineheight'] = tamanho;
    this.lineHeight = this.louvor['louvor']['ativo']['lineheight'];
    this.atualizaStorage();
  }
  setFont(font){
    this.louvor['louvor']['ativo']['fonte'] = font;
    this.fonte = this.louvor['louvor']['ativo']['fonte'];
    this.atualizaStorage();
  }
  setMusicas(id:number=null,titulo:string,musica:string){
    if(!id){
      this.autoincrement += 1;
      id = +this.autoincrement;
      this.louvor['louvor']['autoincrement'] = this.autoincrement;
    }
    this.louvor['louvor']['musicas'][id] = {"titulo":titulo,"musica":musica};
    this.musicas = this.louvor['louvor']['musicas'];
    this.atualizaStorage();
  }
}
